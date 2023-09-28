"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TextInput from "./TextInput";
import Button from "./Button";
import Image from "next/image";
import { parseUrlQuery } from "@/utils/common";

const defaultImage = "https://i.imgflip.com/21uy0f.jpg";
interface IMeme {
  top?: string;
  bottom?: string;
  imageUrl?: string;
}

const MemeGenerator = () => {
  const [state, setState] = useState<IMeme>({
    top: "",
    bottom: "",
    imageUrl: "",
  });

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const fetchRandomImage = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.data.memes.length);
      const randomImageUrl = data.data.memes[randomIndex].url;
      setState((prev) => ({ ...prev, imageUrl: randomImageUrl }));

      createQueryString({ 'top': '', 'bottom': '', 'meme': randomImageUrl })
      
      return randomImageUrl;
    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;

    createQueryString({[name]: value});
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));  
    console.log('hello');
    
  };
    

  const createQueryString = useCallback(
    (query : Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      console.log('query' ,query);
      
      const entries = Object.entries(query ?? {});
      for (const [key, value] of entries) {
        params.set(key, value);
  
        if (!value) {
          params.delete(key);
        }
      }


      const queryString = params.toString();
      push(`/${queryString ? "?" + queryString : ""}`);
    },
    [push, searchParams]
  );

  useEffect(() => {
    const { query } = parseUrlQuery();

    setState((prev) => ({
      ...prev,
      imageUrl: (query.meme ?? defaultImage) as string,
      bottom: (query.bottom ?? "") as string,
      top: (query.top ?? "") as string,
    }));
  }, []);

  return (
    <>
      <div className="md:max-w-[768px] m-auto">
        <div className="mt-[36px] mb-[15px] flex flex-col gap-[17px] md:flex-row justify-center">
          <TextInput
            placeholder="Type here..."
            name="top"
            value={state.top}
            onChange={handleInputChange}
          />
          <TextInput
            placeholder="and here..."
            name="bottom"
            value={state.bottom}
            onChange={handleInputChange}
          />
        </div>
        <Button
          title="Get a new meme image 🖼️"
          onClick={async() => {
            await fetchRandomImage();
            setState({ top: "", bottom: "" });
            
          }}
        />
        <div className="max-w-[477px] max-h-auto mt-[36px] mb-[55px] mx-auto relative">
          {state.imageUrl && (
            <Image
              src={state.imageUrl}
              alt="Random memo image"
              width={477}
              height={268}
              layout="responsive"
            />
          )}
          <p className="shared-text top-[10px]">{state.top}</p>
          <p className="shared-text bottom-[10px]">{state.bottom}</p>
        </div>
      </div>
    </>
  );
};

export default MemeGenerator;

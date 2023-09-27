"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TextInput from "./TextInput";
import Button from "./Button";
import Image from "next/image";
import { parseUrlQuery } from "@/utils/common";

const defaultImage = "https://i.imgflip.com/21uy0f.jpg";

const MemeGenerator = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [inputState, setInputState] = useState({ first: "", second: "" });
  const searchParams = useSearchParams();
  const { push } = useRouter();
 
   
    
  const fetchRandomImage = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.data.memes.length);
        const randomImageUrl = data.data.memes[randomIndex].url;
              setImageUrl(randomImageUrl);
        createQueryString("meme", randomImageUrl);
        
        return randomImageUrl


    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  };


    
  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setInputState((prev) => {
      return { ...prev, [name]: value };
    });

    createQueryString(`${name}`, `${value}`);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      if (!value) {
        params.delete(name);
      }

      const queryString = params.toString();
      push(`/${queryString ? "?" + queryString : ""}`);
    },
    [push, searchParams]
  );
    
    console.log('current image:', imageUrl);
    

  useEffect(() => {
    const { query } = parseUrlQuery();
    setInputState({ first: (query?.first ?? "") as string, second: (query?.second ?? "") as string });
    setImageUrl((query?.meme ?? defaultImage) as string);
  }, []);
    
  return (
    <>
      <div className="md:max-w-[768px] m-auto">
        <div className="mt-[36px] mb-[15px] flex flex-col gap-[17px] md:flex-row justify-center">
          <TextInput
            placeholder="Type here..."
            name="first"
            value={inputState.first}
            onChange={handleInputChange}
          />
          <TextInput
            placeholder="and here..."
            name="second"
            value={inputState.second}
            onChange={handleInputChange}
          />
        </div>
        <Button
          title="Get a new meme image 🖼️"
                  onClick={fetchRandomImage}
        />
        <div className="max-w-[477px] max-h-auto mt-[36px] mb-[55px] mx-auto">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Random memo image"
              width={477}
              height={268}
              layout="responsive"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MemeGenerator;

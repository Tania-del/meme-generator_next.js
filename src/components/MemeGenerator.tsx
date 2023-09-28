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
  const [loader, setLoader] = useState<boolean>(false)
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const fetchRandomImage = async () => {
    try {
      setLoader(true);
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      setLoader(false);
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
  };
    

  const createQueryString = useCallback(
    (query : Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
   
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
          onClick={() => {
            fetchRandomImage();
            setState({ top: "", bottom: "" });
            
          }}
        />       
        <div className="max-w-[477px] max-h-auto mt-[36px] mb-[55px] mx-auto relative">
           {loader && (

        <div role="status" className="text-center">
    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
        )}
          {state.imageUrl && (
            <Image
              src={state.imageUrl}
              alt="Random memo image"
              width={477}
              height={268}
              layout="responsive"
            />
          )}
          <p className="shared-text top-[10px] sm:text-[20px] md:text-[32px]">{state.top}</p>
          <p className="shared-text bottom-[10px] sm:text-[20px] md:text-[32px]">{state.bottom}</p>
        </div>
      </div>
    </>
  );
};

export default MemeGenerator;

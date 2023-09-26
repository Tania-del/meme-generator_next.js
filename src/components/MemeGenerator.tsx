'use client'
import React, { useEffect, useRef, useState } from 'react'
import TextInput from './TextInput'
import Button from './Button'
import Image from 'next/image'

const defaultImage = 'https://i.imgflip.com/21uy0f.jpg'

const MemeGenerator = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [imageUrl, setImageUrl] = useState<string>(defaultImage);
    const [inputState, setInputState] = useState({ first: '', second: ''});

    const fetchRandomImage = async () => {
        try {
            const response = await fetch('https://api.imgflip.com/get_memes')
            const data = await response.json() 
            const randomIndex = Math.floor(Math.random() * data.data.memes.length)
            const randomImageUrl = data.data.memes[randomIndex].url
            
            
            setImageUrl(randomImageUrl); 
        } catch (error) {
            console.error('Error fetching random image:', error);
        }
    }

    const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        console.dir(target)
        const { value, name } = target;
        setInputState((prev) => {
            console.log(prev)
            const newBoy = { ...prev, [name]: value };
            console.log('after update: ', newBoy)
            return newBoy
            

        })
        // console.log(value, name)
        
    }
    
    // console.log(inputState);
    

  return (
      <>
          <div className='md:max-w-[768px] m-auto'>
          <div className='mt-[36px] mb-[15px] flex flex-col gap-[17px] md:flex-row justify-center'>
                  <TextInput ref={inputRef} placeholder="Type here..." name='first'  value={inputState.first}  onChange={handleInputChange} />
              <TextInput placeholder="and here..." name='second' value={inputState.second}  onChange={handleInputChange} />

          </div>
              <Button title='Get a new meme image 🖼️' onClick={fetchRandomImage} />
              <div className='max-w-[477px] max-h-auto mt-[36px] mb-[55px] mx-auto'>
              {imageUrl && (
                   <Image src={imageUrl} alt='Random memo image' width={477} height={268}  layout="responsive"  />
              )}
              </div>
          </div>
      </>
  )
}

export default MemeGenerator

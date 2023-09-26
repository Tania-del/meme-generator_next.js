import React from 'react'
import { TrollFace } from '@/icons';



const Navbar = () => {
  return (
    <div className='py-[19px] pl-[20px] pr-[37px] inline-flex md:gap-1.5 gap-0.5 custom-gradient w-full'>
          <TrollFace />
          <nav className='inline-flex justify-between w-full items-center'>
              <h1 className='font-karla text-base md:text-xl tracking-tight-text font-bold '>Meme Generator</h1>
              <span className='font-inter font-normal text-xs md:text-base leading-normal'>Make some fun</span>
          </nav>
    </div>
  )
}

export default Navbar;

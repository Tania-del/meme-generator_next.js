import { TButtonAttributes } from '@/type/ui';
import React, { FC } from 'react'

interface Button extends TButtonAttributes {
  title: string;
}

const MemeButton: FC<Button> = ({ title, onClick }) => {
  
  return (
          <button onClick={onClick} className='w-full custom-gradient rounded-[5px] py-[10px] font-karla font-bold tracking-[-1.6px] leading-normal'>{title}</button>
  )
}

export default MemeButton

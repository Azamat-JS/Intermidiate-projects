import React from 'react'
import UI_IMG from '../../images/auth-img.png'
import BG_IMG from '../../images/bcg-img.jpeg'


export default function Authlayout({children}) {
  return  <div className='flex'>
     <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
      <h2 className='text-lg font-medium text-black'>Task Manager</h2>
        {children}
     </div>
     <div style={{backgroundImage: `url(${BG_IMG})`}} className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8">
      <img src={UI_IMG} className='w-230 lg:w-[98%]' alt='UI_IMAGE'/>
     </div>
  </div>
}

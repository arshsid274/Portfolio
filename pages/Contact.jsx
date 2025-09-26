import React from 'react'
import { BackgroundBeamsWithCollision } from '../src/Components/BackgroundBeamsWithCollisionDemo.jsx';

const Contact = () => {
  return (
     <BackgroundBeamsWithCollision 
       beamGradient="linear-gradient(184deg, #4b8da8 0%, #38d9a9 52%, #155dfc 100%)"
     >
      <div>

        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#4b8da8] via-[#38d9a9] to-[#155dfc]">
        Contact Me.
      </h2>

      <div className='grid grid-cols-2'>
        <div>1</div>
        <div>2</div>
        
      </div>

      </div>
      
    </BackgroundBeamsWithCollision>
  )
}

export default Contact

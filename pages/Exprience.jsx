import React from 'react'
import ScrollTimeline from '../src/Components/ScrollTimeline'
import PixelBlast from '../src/Components/PixelBlast'

const Experience = () => {
  return (
    <div className="relative w-screen min-h-screen bg-background">
      {/* PixelBlast as background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast 
          variant="diamond"
          color="#40e6b9"
          pixelSize={2}
          patternScale={2}
          patternDensity={0.9}
          pixelSizeJitter={1.05}
          speed={1.35}
          edgeFade={0.25}
          enableRipples={true}
          liquid={true}
          transparent={false}
          className="w-full h-full"
        />
      </div>
      
      {/* ScrollTimeline as foreground content */}
      <div className="relative z-10 w-full">
       <ScrollTimeline revealAnimation="slide" parallaxIntensity={0} />

      </div>
    </div>
  )
}


export default Experience

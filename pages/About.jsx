import React, { useState, useEffect } from 'react'

const About = () => {
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    const checkScreenSize = () => {
      // Use natural viewport detection for Vercel consistency
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      setViewportWidth(vw);
    };

    checkScreenSize();
    
    const debouncedResize = () => {
      setTimeout(checkScreenSize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
    };
  }, []);

  // Calculate scale based on viewport width with 1920px as reference
  const scale = Math.min(viewportWidth / 1920, 1);

  return (
    <div className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className="max-w-7xl mx-auto"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            About <span className="text-[#40e6b9]">Me</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Learn more about my journey and passion for web development
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
import { useState, useEffect } from 'react';

const ScreenSizeHelper = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getBreakpoint = (width) => {
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs';
  };

  const breakpoint = getBreakpoint(screenSize.width);

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded-lg font-mono z-50 backdrop-blur-sm">
      <div>{screenSize.width} × {screenSize.height}</div>
      <div className="text-center font-bold text-yellow-400">{breakpoint}</div>
    </div>
  );
};

export default ScreenSizeHelper;

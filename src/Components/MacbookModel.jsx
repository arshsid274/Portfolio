import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Macbook from './Macbook'
import Lights from './Light'
import Loader from './Loader'
import LightRays from './LightRays.jsx'

export const MacbookModel = ({ screenImage = "/assets/images/hero.jpeg", scale = [1, 1, 1], onReady }) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Force Canvas re-render after mount
    const timer = setTimeout(() => {
      setIsReady(true);
      setCanvasKey(prev => prev + 1);
      
      // Report readiness after a short delay to ensure model is fully loaded
      setTimeout(() => {
        if (onReady) onReady();
      }, 500);
    }, 100);

    // Handle resize to refresh Canvas
    const handleResize = () => {
      setCanvasKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onReady]);
  return (
    <>
    
    <div className="w-full h-full relative">
      {!isReady && (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="text-white/50 text-sm">Loading 3D Model...</div>
        </div>
      )}
      
      <Canvas
        key={canvasKey}
        className="w-full h-full absolute inset-0"
        style={{ 
          zIndex: 10,
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance", 
          alpha: true,
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={0.3} />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <Lights />
        
        <OrbitControls
          makeDefault
          enableZoom={false}
          rotateSpeed={0.4}
          enablePan={false}
        />
        
        <Suspense fallback={<Loader />}>
          <Macbook 
            screenImage={screenImage}
            scale={scale}
            position={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
      
    </div>
   
    
    </>
   
  )
}

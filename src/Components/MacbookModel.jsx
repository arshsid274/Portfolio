import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import Macbook from './Macbook'
import Lights from './Light'
import Loader from './Loader'
import LightRays from './LightRays.jsx'

export const MacbookModel = ({ screenImage = "/assets/images/hero.jpeg", scale = [1, 1, 1], onReady }) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      setCanvasKey(prev => prev + 1);
      
      setTimeout(() => {
        if (onReady) onReady();
      }, 500);
    }, 100);

    const handleResize = () => {
      setCanvasKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onReady]);

  // Memory cleanup
  useEffect(() => {
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      // Force cleanup
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          if (window.gc) window.gc();
        });
      }
    };
  }, []);

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
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        resize={{ scroll: false, debounce: { scroll: 100, resize: 50 } }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
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

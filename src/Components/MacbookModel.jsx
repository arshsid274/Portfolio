import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import Macbook from './Macbook'
import Lights from './Light'
import Loader from './Loader'
import LightRays from './LightRays.jsx'

// Mobile detection
const isMobileDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) && window.innerWidth < 1024;
};
const isLowMemoryDevice = typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory < 4;

export const MacbookModel = ({ screenImage = "/assets/images/hero.jpeg", scale = [1, 1, 1], onReady }) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Skip heavy 3D on mobile devices
    if (isMobileDevice() || isLowMemoryDevice) {
      setIsReady(true);
      if (onReady) onReady();
      return;
    }

    const timer = setTimeout(() => {
      setIsReady(true);
      setCanvasKey(prev => prev + 1);
      
      setTimeout(() => {
        if (onReady) onReady();
      }, 500);
    }, 100);

    const handleResize = () => {
      if (!isMobileDevice()) {
        setCanvasKey(prev => prev + 1);
      }
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

  // Return lightweight version for mobile
  if (isMobileDevice() || isLowMemoryDevice) {
    return (
      <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-white/50 text-center">
          <div className="text-lg mb-2">3D Model</div>
          <div className="text-sm opacity-70">Optimized for mobile</div>
        </div>
      </div>
    );
  }
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
          antialias: !isMobileDevice(), 
          powerPreference: isMobileDevice() ? "low-power" : "high-performance", 
          alpha: true,
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true
        }}
        dpr={isMobileDevice() ? [1, 1.5] : [1, 2]}
        resize={{ scroll: false, debounce: { scroll: 100, resize: 50 } }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice() ? 1.5 : 2));
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

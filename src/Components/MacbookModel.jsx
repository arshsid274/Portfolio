import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Macbook from './Macbook'
import Lights from './Light'
import Loader from './Loader'

export const MacbookModel = ({ screenImage = "/assets/images/hero.jpeg", scale = [1, 1, 1], onReady }) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

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

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
    };
  }, [onReady]);

  return (
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
          antialias: !isMobile, // Disable antialiasing on mobile
          powerPreference: isMobile ? "low-power" : "high-performance",
          alpha: true,
          preserveDrawingBuffer: false // Disable on mobile to save memory
        }}
        dpr={isMobile ? [1, 1] : [1, 2]} // Lower pixel ratio on mobile
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={0.3} />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <Lights />
        
        <OrbitControls
          makeDefault
          enableZoom={false}
          rotateSpeed={isMobile ? 0 : 0.4} // Disable rotation on mobile
          enablePan={false}
          enabled={!isMobile} // Completely disable controls on mobile
          enableRotate={!isMobile}
          enableDamping={!isMobile}
          autoRotate={false}
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
  )
}

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Macbook from './Macbook'
import Lights from './Light'
import Loader from './Loader'
import LightRays from './LightRays.jsx'

export const MacbookModel = ({ screenImage = "/assets/images/hero.jpeg", scale = [1, 1, 1], onReady, isMobile = false }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Force Canvas re-render after mount
    const timer = setTimeout(() => {
      setIsReady(true);

      // Report readiness after a short delay to ensure model is fully loaded
      setTimeout(() => {
        if (onReady) onReady();
      }, 500);
    }, 100);

    return () => {
      clearTimeout(timer);
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
          className="w-full h-full absolute inset-0"
          style={{
            zIndex: 10,
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          gl={{
            antialias: !isMobile, // Disable antialiasing on mobile for performance
            powerPreference: isMobile ? "default" : "high-performance",
            alpha: true,
            depth: true,
            stencil: false, // Disable stencil buffer if not needed
          }}
          dpr={isMobile ? 1 : [1, 2]} // Strictly cap DPR to 1 on mobile
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

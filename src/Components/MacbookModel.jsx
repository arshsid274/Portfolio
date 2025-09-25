import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Macbook from './Macbook'
import Lights from './Light'
import Loader from './Loader'
import LightRays from './LightRays.jsx'

export const MacbookModel = ({ screenImage = "/assets/images/hero.jpeg", scale = [1, 1, 1] }) => {
  return (
    <div className="w-full h-full relative">
      {/* <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      /> */}
      <Canvas
        className="w-full h-full absolute inset-0"
        style={{ zIndex: 10 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        dpr={[1, 2]}
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
  )
}

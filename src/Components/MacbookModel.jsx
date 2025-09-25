import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Macbook from './Macbook'
import Lights from './Light' // Changed from './Lights' to './Light'
import Loader from './Loader'

export const MacbookModel = ({ screenImage = "/assets/images/hero.jpeg", scale = [1, 1, 1] }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, powerPreference: "high-performance" }}
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

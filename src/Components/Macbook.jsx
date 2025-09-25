import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'

function Macbook({ screenImage, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/mac.glb')
  const { actions } = useAnimations(animations, group)
  const [isOpen, setIsOpen] = useState(false)
  
  const customTexture = useLoader(TextureLoader, screenImage || '/assets/images/hero.jpeg')
  
// Rotation animation when closed
useFrame((state) => {
  if (!isOpen && group.current) {
    group.current.rotation.y = -state.clock.elapsedTime * 0.5 // Rotate right to left
    group.current.rotation.x = 0.4 // Base upward tilt
  } else if (isOpen && group.current) {
    // Face forward when open
    group.current.rotation.x = -0.3 // Face forward
    group.current.rotation.y = 0
    group.current.rotation.z = 0
  }
})




  useEffect(() => {
    const possibleScreenMaterials = [
      'Material.001',
      'Touch_Bar_Shot_2021-04-02_at_18.13.28',
      'Glass',
      'Black_Glass',
      'Material.002'
    ]
    
    possibleScreenMaterials.forEach(materialName => {
      if (materials[materialName] && customTexture) {
        materials[materialName].map = customTexture
        materials[materialName].needsUpdate = true
      }
    })
    
    // Handle animations
    Object.keys(actions).forEach((key) => {
      const action = actions[key]
      if (action) {
        action.play()
        action.setLoop(2, Infinity)
        action.clampWhenFinished = true
        
        // Listen for animation events to detect open/close
        action.getMixer().addEventListener('finished', () => {
          setIsOpen(!isOpen)
        })
      }
    })
  }, [actions, customTexture, materials, screenImage, isOpen])

  // Click handler to toggle open/close
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <group ref={group} {...props} dispose={null} onClick={handleClick}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Bevels_2" position={[0, 0.008, -0.104]} scale={0.275}>
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.Black_Glass}
                />
                <mesh
                  name="Object_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_5.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.Glass}
                />
                <mesh
                  name="Object_7"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_7.geometry}
                  material={materials['Material.002']}
                />
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials.Space_Grey}
                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials['Space_Grey.001']}
                />
                <group
                  name="Empty_1"
                  position={[0, 0.001, 0]}
                  rotation={[-Math.PI, 0, 0]}
                  scale={[-0.039, 0.039, 0.039]}>
                  <group
                    name="Camera_Light_0"
                    position={[0, 0.077, -0.044]}
                    rotation={[-1.192, 0, 0]}
                    scale={[-25.381, 25.381, 25.381]}>
                    <mesh
                      name="Object_12"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_12.geometry}
                      material={materials.Camera_Light}
                    />
                  </group>
                </group>
              </group>
              <group name="Caps_Lock_Light_3" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials.Caps_Lock_Light}
                />
              </group>
              <group
                name="Macbook_Pro_4"
                position={[0, 0.008, -0.104]}
                rotation={[1.949, 0, 0]}
                scale={0.275}>
                <mesh
                  name="Object_16"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_16.geometry}
                  material={materials['Material.001']}
                />
              </group>
              <group name="Main_Body_5" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_18"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_18.geometry}
                  material={materials.Space_Grey}
                />
                <mesh
                  name="Object_19"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_19.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_20"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_20.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_21"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_21.geometry}
                  material={materials['Keys.001']}
                />
              </group>
              <group name="Touch_Bar_6" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_23"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_23.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_24"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_24.geometry}
                  material={materials.Black_Glass}
                />
                <mesh
                  name="Object_25"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_25.geometry}
                  material={materials.Keys}
                />
              </group>
              <group name="Touch_Bar_Shot_7" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_27"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_27.geometry}
                  material={materials['Touch_Bar_Shot_2021-04-02_at_18.13.28']}
                />
              </group>
              <group name="Keyboard_8" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_29"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_29.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_30"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_30.geometry}
                  material={materials.Keys}
                />
              </group>
              <group name="Cube_9" position={[0, -0.014, 0]}>
                <mesh
                  name="Object_32"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_32.geometry}
                  material={materials.Black_Plastic}
                />
              </group>
              <group
                name="Circle001_12"
                position={[0.203, 0.008, -0.104]}
                rotation={[0.011, -0.75, 1.274]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default Macbook

useGLTF.preload('/models/mac.glb')

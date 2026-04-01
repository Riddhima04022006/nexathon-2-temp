"use client";

import { useRef, Suspense } from 'react'; 
import { Canvas, useFrame } from '@react-three/fiber';
// 1. Import OrbitControls so you can zoom with your mouse
import { useGLTF, Center, OrbitControls } from '@react-three/drei'; 

function StarModel() {
  const { scene } = useGLTF('/models/death-star.glb'); 
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002; 
    }
  });

  return (
    <Center> 
      <primitive 
        object={scene} 
        ref={modelRef} 
        scale={0.07} 
      />
    </Center>
  );
}

export default function DeathStar() {
  return (
    <Canvas 
      // 3. Pull the camera back to a distance of 10
      camera={{ position: [0, 0, 10], fov: 45 }} 
      gl={{ alpha: true, antialias: false }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      
      {/* 4. Add the controls! */}
      {/* <OrbitControls enableZoom={true} enablePan={false} /> */}

      <Suspense fallback={null}>
        <StarModel />
      </Suspense>
    </Canvas>
  );
}
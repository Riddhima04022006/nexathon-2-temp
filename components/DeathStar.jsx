"use client";

import { useRef, Suspense, useEffect } from 'react'; 
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';

function StarModel() {
  const { scene } = useGLTF('/models/death-star.glb'); 
  const modelRef = useRef();

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.metalness = 0.8;
        child.material.roughness = 0.25;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

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
        rotation={[0, Math.PI, 0]}
        scale={0.0009} 
      />
    </Center>
  );
}

export default function DeathStar() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 14], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Environment
        preset="night"
        background={false}
        environmentIntensity={0.02}
      />

      <ambientLight intensity={1.25} />

      <directionalLight
        position={[25, 45, -5]}
        intensity={1.5}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <StarModel />
      </Suspense>
    </Canvas>
  );
}
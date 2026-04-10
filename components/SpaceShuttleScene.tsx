"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Html, useProgress, Stars } from '@react-three/drei';
import SpaceShuttleModel from './SpaceShuttleModel';
import NexathonOverlay from './NexathonOverlay';
import { syne } from '../app/layout';


function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white w-screen h-screen bg-black/80 backdrop-blur-sm z-50">
        <h2 className={`${syne.className} text-2xl md:text-4xl font-bold mb-6 tracking-[0.2em] uppercase`}>
          ENTERING NEXATHON
        </h2>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-xs font-mono tracking-widest text-gray-400">
          LOADING ASSETS {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

export default function SpaceShuttleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={['#000000']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#4444ff" />
      <pointLight position={[10, -10, 10]} intensity={2} color="#ff4444" />
      
      <Suspense fallback={<Loader />}>
        {/* ScrollControls dictates how many 'pages' of scroll we have. */}
        <ScrollControls pages={5} damping={0.25}>
          <SpaceShuttleModel />
          <NexathonOverlay />
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}

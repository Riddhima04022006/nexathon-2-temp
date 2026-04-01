"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function SpaceShuttleModel() {
  const { scene } = useGLTF('/models/space_shuttle.glb');
  
  // Outer group for scroll transitions (Position, Base Rotation, Scale)
  const scrollGroupRef = useRef<THREE.Group>(null);
  // Inner group for continuous animations (Hover, Shake)
  const wobbleGroupRef = useRef<THREE.Group>(null);

  // Store the frozen quaternion at the moment we leave state 0
  const frozenQ0 = useRef<THREE.Quaternion>(new THREE.Quaternion());
  const hasFrozenQ0 = useRef(false);
  
  const scroll = useScroll();
  const { viewport } = useThree();
  
  const isMobile = viewport.width < 6;

  useFrame((state, delta) => {
    if (!scrollGroupRef.current || !wobbleGroupRef.current) return;
    
    const offset = scroll.offset; 
    const time = state.clock.elapsedTime;

    // --------------------------------------------------------
    // 1. SCROLL ANIMATIONS (Outer Group)
    // --------------------------------------------------------

    // State 0: Initial (Page 1) — Tilted nicely, perfectly upright
    const pos0 = new THREE.Vector3(0, isMobile ? 3 : 0, 0);
    const rot0 = new THREE.Euler(0.2, -Math.PI / 6, 0.1); // Angled slightly, but not tumbling
    const scale0 = isMobile ? 0.4 : 1.7;

    // State 1: Background (Page 2)
    const pos1 = isMobile ? new THREE.Vector3(0, 5, -6) : new THREE.Vector3(3, 2, -5);
    const rot1 = new THREE.Euler(0.2, Math.PI * -1.5, Math.PI * 0.2);
    const scale1 = isMobile ? 0.2 : 1.5;

    // State 2: Close-up (Page 3) — Positioned right (x=3), facing left (negative Y rotation)
    // State 2: Close-up (Page 3) — Positioned right (x=3), climbing towards top-left
    const pos2 = isMobile ? new THREE.Vector3(0, 4.5, -3) : new THREE.Vector3(3, 0, 3);
    // X: Nose up, Y: Diagonal left, Z: Slight bank/roll
    const rot2 = new THREE.Euler(Math.PI / 6, -Math.PI / 3, Math.PI / 12); 
    const scale2 = isMobile ? 0.8 : 1.5;

    // Convert Euler angles to Quaternions for smooth transitions
    const q0_target = new THREE.Quaternion().setFromEuler(rot0);
    const q1 = new THREE.Quaternion().setFromEuler(rot1);
    const q2 = new THREE.Quaternion().setFromEuler(rot2);

    if (offset < 0.01) {
      // Page 1: Smoothly hold the upright, tilted orientation
      scrollGroupRef.current.position.lerp(pos0, 0.1);
      scrollGroupRef.current.quaternion.slerp(q0_target, 0.1);
      scrollGroupRef.current.scale.setScalar(scale0);

      // Reset the frozen flag so we re-capture on the next transition out
      hasFrozenQ0.current = false;

    } else if (offset < 0.5) {
      // Transition Page 1 -> Page 2
      if (!hasFrozenQ0.current) {
        frozenQ0.current.copy(scrollGroupRef.current.quaternion);
        hasFrozenQ0.current = true;
      }

      const progress = offset / 0.5;
      const easeProgress = Math.sin(progress * Math.PI - Math.PI / 2) * 0.5 + 0.5;

      scrollGroupRef.current.position.lerpVectors(pos0, pos1, easeProgress);
      scrollGroupRef.current.quaternion.slerpQuaternions(frozenQ0.current, q1, easeProgress);

      const s = THREE.MathUtils.lerp(scale0, scale1, easeProgress);
      scrollGroupRef.current.scale.setScalar(s);

    } else {
      // Transition Page 2 -> Page 3
      const progress = (offset - 0.5) / 0.5;
      const easeProgress = Math.sin(progress * Math.PI - Math.PI / 2) * 0.5 + 0.5;

      scrollGroupRef.current.position.lerpVectors(pos1, pos2, easeProgress);
      scrollGroupRef.current.quaternion.slerpQuaternions(q1, q2, easeProgress);

      const s = THREE.MathUtils.lerp(scale1, scale2, easeProgress);
      scrollGroupRef.current.scale.setScalar(s);
    }

    // --------------------------------------------------------
    // 2. HOVER & SHAKE ANIMATIONS (Inner Group)
    // --------------------------------------------------------
    
    // Constant subtle hover
    const hoverY = Math.sin(time * 2) * 0.1;
    const hoverRotZ = Math.sin(time * 1.5) * 0.03;

    let shakeX = 0;
    let shakeY = 0;
    
    // High-speed shake effect — only during page 2 → 3 transition
    if (offset > 0.5) {
      const speedProgress = (offset - 0.5) * 2;
      const intensity = 0.05 * speedProgress;
      shakeX = 0;
      shakeY = 0;
    }

    wobbleGroupRef.current.position.set(shakeX, hoverY + shakeY, 0);
    wobbleGroupRef.current.rotation.set(0, 0, hoverRotZ);
  });

  return (
    <group ref={scrollGroupRef}>
      <group ref={wobbleGroupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/space_shuttle.glb');
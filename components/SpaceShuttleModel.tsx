"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function SpaceShuttleModel() {
  const { scene } = useGLTF('/models/space_shuttle.glb');
  
  const scrollGroupRef = useRef<THREE.Group>(null);
  const wobbleGroupRef = useRef<THREE.Group>(null);

  const frozenQ0 = useRef<THREE.Quaternion>(new THREE.Quaternion());
  const hasFrozenQ0 = useRef(false);
  
  const scroll = useScroll();
  const { viewport } = useThree();
  
  const isMobile = viewport.width < 6;
  const isTablet = viewport.width >= 6 && viewport.width < 10;

  useFrame((state) => {
    if (!scrollGroupRef.current || !wobbleGroupRef.current) return;
    
    const offset = scroll.offset; 
    const time = state.clock.elapsedTime;
    const pos0 = isMobile ? new THREE.Vector3(0, 0.5, -4) : isTablet ? new THREE.Vector3(2, 1, -1) : new THREE.Vector3(0, 0, 0);
    const rot0 = isMobile ? new THREE.Euler(0.3, -Math.PI / 5, 0.15) : new THREE.Euler(0.2, -Math.PI / 6, 0.1);
    const scale0 = isMobile ? 0.8 : isTablet ? 1.2 : 1.7;
    const pos1 = isMobile 
      ? new THREE.Vector3(-0.5, 0.5, -5) 
      : isTablet 
        ? new THREE.Vector3(-2.5, 1, -3) 
        : new THREE.Vector3(-4.5, 1, -2); 
    const rot1 = new THREE.Euler(0.2, Math.PI * 0.5, Math.PI * 0.1); 
    const scale1 = isMobile ? 0.65 : isTablet ? 0.9 : 1.5;

    const pos2 = isMobile ? new THREE.Vector3(0.5, 0, -5) : isTablet ? new THREE.Vector3(3, 1, -2) : new THREE.Vector3(4, 0.5, -2);
    const rot2 = isMobile ? new THREE.Euler(Math.PI / 6, -Math.PI / 4, 0) : new THREE.Euler(Math.PI / 8, -Math.PI / 3, 0);
    const scale2 = isMobile ? 0.6 : isTablet ? 1.0 : 1.3;

    const pos3 = isMobile ? new THREE.Vector3(-0.5, -0.5, -4) : isTablet ? new THREE.Vector3(-3, 0.5, 0) : new THREE.Vector3(-4, -0.5, 1);
    const rot3 = new THREE.Euler(rot2.x, rot2.y + Math.PI, rot2.z);
    const scale3 = scale2;

    const q0_target = new THREE.Quaternion().setFromEuler(rot0);
    const q1 = new THREE.Quaternion().setFromEuler(rot1);
    const q2 = new THREE.Quaternion().setFromEuler(rot2);
    const q3 = new THREE.Quaternion().setFromEuler(rot3);
    if (offset < 0.01) {
      scrollGroupRef.current.position.lerp(pos0, 0.1);
      scrollGroupRef.current.quaternion.slerp(q0_target, 0.1);
      scrollGroupRef.current.scale.setScalar(scale0);
      hasFrozenQ0.current = false;
    } 
    else if (offset < 0.33) {
      if (!hasFrozenQ0.current) {
        frozenQ0.current.copy(scrollGroupRef.current.quaternion);
        hasFrozenQ0.current = true;
      }
      const progress = offset / 0.33;
      const ease = Math.sin(progress * Math.PI - Math.PI / 2) * 0.5 + 0.5;
      scrollGroupRef.current.position.lerpVectors(pos0, pos1, ease);
      scrollGroupRef.current.quaternion.slerpQuaternions(frozenQ0.current, q1, ease);
      scrollGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(scale0, scale1, ease));
    } 
    else if (offset < 0.66) {
      const progress = (offset - 0.33) / 0.33;
      const ease = Math.sin(progress * Math.PI - Math.PI / 2) * 0.5 + 0.5;
      scrollGroupRef.current.position.lerpVectors(pos1, pos2, ease);
      scrollGroupRef.current.quaternion.slerpQuaternions(q1, q2, ease);
      scrollGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(scale1, scale2, ease));
    } 
    else {
      const progress = (offset - 0.66) / 0.34;
      const ease = Math.sin(progress * Math.PI - Math.PI / 2) * 0.5 + 0.5;
      scrollGroupRef.current.position.lerpVectors(pos2, pos3, ease);
      scrollGroupRef.current.quaternion.slerpQuaternions(q2, q3, ease);
      scrollGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(scale2, scale3, ease));
    }
    const hoverY = Math.sin(time * 2) * 0.1;
    const hoverRotZ = Math.sin(time * 1.5) * 0.03;

    wobbleGroupRef.current.position.set(0, hoverY, 0);
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
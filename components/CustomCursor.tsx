"use client";

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // 1. Track the exact X and Y of the real mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Add spring physics to make the tracking feel buttery smooth
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Subtract 4 so the dead-center of the 8px dot sits exactly on the cursor point
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[999999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}
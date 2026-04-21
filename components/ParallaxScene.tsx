"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { infiniteBeyond } from '@/lib/fonts';
import { Audiowide } from 'next/font/google';

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Import our dedicated Scrollytelling component
import TerminalScene from './TerminalScene';

// Safely load the heavy WebGL/3D components
const Galaxy = dynamic(() => import('./Galaxy'), { ssr: false });
const DeathStar = dynamic(() => import('./DeathStar'), { ssr: false });

// Cinematic easing — very smooth ease-out for fluid motion
const CINEMATIC_EASE = [0.25, 0.46, 0.45, 0.94] as const;
const CINEMATIC_DURATION = 3.2;

// Assets to preload — the heavy 3D models
const PRELOAD_ASSETS = [
  '/models/death-star.glb',
  '/models/space_shuttle.glb',
];

export default function ParallaxScene() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(false);
  const [isTerminalActive, setIsTerminalActive] = useState(false);

  // ── Loading state ──
  const [loadProgress, setLoadProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);

  // Preload all heavy assets with real progress tracking
  useEffect(() => {
    let cancelled = false;
    const totalAssets = PRELOAD_ASSETS.length;
    const assetProgress: number[] = new Array(totalAssets).fill(0);

    const updateTotalProgress = () => {
      if (cancelled) return;
      const total = assetProgress.reduce((sum, p) => sum + p, 0) / totalAssets;
      setLoadProgress(Math.min(total, 100));
    };

    const promises = PRELOAD_ASSETS.map((url, index) => {
      return new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            assetProgress[index] = (event.loaded / event.total) * 100;
          } else {
            // Estimate progress for non-computable
            assetProgress[index] = Math.min(assetProgress[index] + 5, 90);
          }
          updateTotalProgress();
        };

        xhr.onload = () => {
          assetProgress[index] = 100;
          updateTotalProgress();
          resolve();
        };

        xhr.onerror = () => {
          // Even on error, don't block — mark as done
          assetProgress[index] = 100;
          updateTotalProgress();
          resolve();
        };

        xhr.send();
      });
    });

    // Also wait a minimum of 1.5s so the loading screen feels intentional
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 1500));

    Promise.all([...promises, minDelay]).then(() => {
      if (!cancelled) {
        setLoadProgress(100);
        // Small delay to let the bar animate to 100%
        setTimeout(() => {
          setAssetsReady(true);
          // Stagger the button reveal
          setTimeout(() => setShowEnterButton(true), 400);
        }, 500);
      }
    });

    return () => { cancelled = true; };
  }, []);

  // --- PARALLAX MATH ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-1, 1], [10, -10]);
  const bgY = useTransform(smoothY, [-1, 1], [10, -10]);
  const v2X = useTransform(smoothX, [-1, 1], [-10, 10]);
  const v2Y = useTransform(smoothY, [-1, 1], [-10, 10]);
  const midX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const midY = useTransform(smoothY, [-1, 1], [-15, 15]);
  const textX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const textY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // --- INTERACTION HANDLERS ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isEntering) return; 
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isEntering) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Mobile Gyroscope Support
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (isEntering) return;
      let { gamma, beta } = e;
      if (gamma === null || beta === null) return;
      gamma = Math.max(-45, Math.min(45, gamma));
      beta = Math.max(0, Math.min(90, beta)) - 45; 
      mouseX.set(gamma / 45);
      mouseY.set(beta / 45);
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isEntering, mouseX, mouseY]);

  // --- ANIMATION TRIGGERS ---
  const handleEnterTerminal = useCallback(() => {
    setIsEntering(true);
    // Navigate slightly before animation fully ends so the flash covers the page swap
    setTimeout(() => {
      router.push('/nexathon');
    }, (CINEMATIC_DURATION - 0.3) * 1000);
  }, [router]);

  const handleExitTerminal = () => {
    setIsTerminalActive(false); 
    setIsEntering(false);       
  };

  return (
    <div 
      className={`relative w-full ${isTerminalActive ? 'h-auto' : 'h-screen overflow-hidden'} bg-black`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* --- LOADING OVERLAY --- */}
      <AnimatePresence>
        {!assetsReady && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />

            {/* Loading status text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/30 mb-8"
            >
              Initializing systems
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8}}
              className={`${infiniteBeyond.className} text-white text-5xl md:text-8xl font-normal tracking-normal lowercase mb-12`}
            >
              Nexathon
            </motion.h1>

            {/* Loading bar container */}
            <div className="relative w-[280px] md:w-[400px]">
              {/* Background track */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                {/* Animated fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.9))',
                    boxShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              {/* Progress text */}
              <div className="flex justify-between mt-3">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">
                  Loading assets
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/40">
                  {Math.round(loadProgress)}%
                </span>
              </div>
            </div>

            {/* Pulsing dots */}
            <div className="flex gap-1.5 mt-10">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/30"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE SCROLLYTELLING OVERLAY --- */}
      {isTerminalActive && (
        <div className="relative z-50 w-full">
          <TerminalScene onExit={handleExitTerminal} />
        </div>
      )}

      {/* --- THE MAIN 3D SCENE (always mounted so it can load in background) --- */}
      {!isTerminalActive && (
        <>
          {/* LAYER 1: V2 TEXT — drifts out gently */}
          <motion.div
            className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none"
            style={{ x: v2X, y: v2Y }}
            animate={isEntering ? { 
              scale: 2.5, 
              opacity: 0, 
              rotateZ: -15, 
              filter: 'blur(8px)' 
            } : {}}
            transition={{ 
              duration: CINEMATIC_DURATION * 0.8, 
              ease: CINEMATIC_EASE,
              opacity: { 
                duration: CINEMATIC_DURATION * 0.6,
                ease: CINEMATIC_EASE 
              },
            }}
          >
            <span className={`${audiowide.className} text-white tracking-tighter font-extrabold text-[300px] sm:text-[400px] md:text-[600px] leading-none opacity-20`}>
              <p className='tracking-[-0.5rem]'>V2</p>
            </span>
          </motion.div>

          {/* LAYER 2: THE DEATH STAR — zooms smoothly past camera */}
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            style={{ x: midX, y: midY }}
            animate={isEntering ? { 
              scale: 6, 
              opacity: 0, 
              filter: 'blur(4px)' 
            } : {}}
            transition={{ 
              duration: CINEMATIC_DURATION * 0.9,
              delay: 0.1,
              ease: CINEMATIC_EASE,
              opacity: { 
                duration: CINEMATIC_DURATION * 0.6, 
                delay: CINEMATIC_DURATION * 0.3,
                ease: CINEMATIC_EASE
              },
            }}
          >
            <div className="w-71.5 h-71.5 md:w-95.5 md:h-95.5">
              <DeathStar />
            </div>
          </motion.div>

          {/* LAYER 3: FOREGROUND TEXT & BUTTON — scales up and fades */}
          <motion.div 
            className="relative z-20 flex flex-col items-center justify-center h-full pointer-events-none"
            style={{ x: textX, y: textY }}
            animate={isEntering ? { 
              scale: 3.5,          
              rotateZ: 10,       
              opacity: 0,         
              filter: 'blur(10px)' 
            } : { scale: 1, rotateZ: 0, opacity: 1 }}
            transition={{ 
              duration: CINEMATIC_DURATION * 0.85,
              delay: 0.05,
              ease: CINEMATIC_EASE,
              opacity: { 
                duration: CINEMATIC_DURATION * 0.5, 
                delay: CINEMATIC_DURATION * 0.3,
                ease: CINEMATIC_EASE
              },
            }}
          >
            <h1 className={`${infiniteBeyond.className} text-white text-5xl sm:text-5xl md:text-7xl font-normal lowercase tracking-normal text-center selection:bg-red-600 selection:text-white pointer-events-auto`}>
              Nexathon
            </h1>
            <p className="mt-4 text-white-500 font-mono text-sm tracking-[0.3em] pointer-events-auto selection:bg-red-600">
              --THERE IS NO NEUTRAL--
            </p>

            {/* ENTER button — only appears after loading completes */}
            <AnimatePresence>
              {showEnterButton && (
                <motion.button 
                  key="enter-btn"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={handleEnterTerminal}
                  className="cursor-target mt-8 px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all cursor-none pointer-events-auto relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="relative font-mono text-sm tracking-[0.3em]">ENTER STAR</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Loading indicator in place of button while loading */}
            {!showEnterButton && assetsReady === false && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="mt-8 flex items-center gap-2 pointer-events-none"
              >
                <div className="w-3 h-[1px] bg-white/30" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
                  Preparing
                </span>
                <div className="w-3 h-[1px] bg-white/30" />
              </motion.div>
            )}
          </motion.div>

          {/* LAYER 4: SMOOTH BLACK FADE — covers the page transition */}
          <AnimatePresence>
            {isEntering && (
              <motion.div
                key="warp-fade"
                className="absolute inset-0 z-50 pointer-events-none bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 1.0, 
                  delay: CINEMATIC_DURATION * 0.6,
                  ease: [0.4, 0.0, 0.2, 1.0]
                }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
"use client";

import { useRef, useState, useEffect } from 'react';
import { syne } from '../app/layout';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TerminalScene({ onExit }: { onExit: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  
  
  const [video1Ready, setVideo1Ready] = useState(false);
  const [video2Ready, setVideo2Ready] = useState(false);

  useEffect(() => {
    
    if (!video1Ready || !video2Ready || !video1Ref.current || !video2Ref.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const v1Dur = video1Ref.current!.duration;
      const v2Dur = video2Ref.current!.duration;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",     
          end: "bottom bottom", 
          scrub: 0.5, 
        }
      });

      tl.to(video1Ref.current, { currentTime: v1Dur * 0.4, duration: 2, ease: "none" });

      tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 })
        .to({}, { duration: 1 }) 
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 0.5 });

      tl.to(video1Ref.current, { currentTime: v1Dur * 0.8, duration: 2, ease: "none" });

      tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 })
        .to({}, { duration: 1 }) // Reading pause
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 0.5 });

      tl.to(video1Ref.current, { currentTime: v1Dur, duration: 1, ease: "none" });

      tl.fromTo(video2Ref.current, { opacity: 0 }, { opacity: 0.6, duration: 1, ease: "none" });
      tl.to(video1Ref.current, { opacity: 0, duration: 0 }, "<"); 

      tl.to(video2Ref.current, { currentTime: v2Dur, duration: 4, ease: "none" });

      tl.fromTo(text3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 })
        .to({}, { duration: 1 }); 
    }, containerRef);

    return () => ctx.revert();
  }, [video1Ready, video2Ready]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[800vh] bg-black">
      
      
      <div className="sticky top-0 left-0 w-full h-dvh overflow-hidden flex flex-col items-center justify-center bg-black">
        
        <video
          ref={video1Ref}
          src="/video/video1.mp4" 
          preload="auto"
          muted
          playsInline

          webkit-playsinline="true"
          onLoadedMetadata={() => setVideo1Ready(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        />


        <video
          ref={video2Ref}
          src="/video/video2.mp4" 
          preload="auto"
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          onLoadedMetadata={() => setVideo2Ready(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
        />


        <div className={`relative z-10 w-full max-w-4xl mx-auto px-6 text-center ${syne.className}`}>
          
          <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-widest uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              What is Nexathon?
            </h2>
            <p className="text-lg md:text-xl text-cyan-400 font-mono tracking-widest leading-relaxed">
              Nexathon is the ultimate convergence of technology and innovation.
              <br/> A 36-hour hackathon where ideas transform into reality.
            </p>
          </div>

          <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-widest uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Previous Achievements
            </h2>
            <p className="text-lg md:text-xl text-green-400 font-mono tracking-widest leading-relaxed">
              500+ Hackers. 100+ Projects. 
              <br/> Millions of lines of code pushing the boundaries of what's possible.
            </p>
          </div>

          <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase mb-12">
              THE NEXT CHAPTER BEGINS
            </h2>
            
            <button 
              onClick={onExit}
              className="px-8 py-4 border-2 border-white/50 text-white hover:bg-white hover:text-black transition-all cursor-none pointer-events-auto font-mono text-xl tracking-widest hover:scale-105"
            >
              RETURN TO ORBIT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
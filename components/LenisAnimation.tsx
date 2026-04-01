"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const cardsData = [
  { id: "01", title: "RUN THE THREAD" },
  { id: "02", title: "LIGHTWEIGHT" },
  { id: "03", title: "SMOOTH SCROLL" },
  { id: "04", title: "BRING THE HEAT" },
  { id: "05", title: "REACT READY" },
  { id: "06", title: "NATIVE FEEL" },
  { id: "07", title: "EASY SETUP" },
  { id: "08", title: "ACCESSIBLE" },
  { id: "09", title: "PERFORMANCE" },
];

export default function LenisAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    
    // The main horizontal tween
    const horizontalScrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // The individual vertical card reveal tweens
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      // Set initial state
      gsap.set(card, { y: '100vh' });

      // Animate to y: 0 when they come into view
      gsap.to(card, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalScrollTween,
          start: "left right",
          end: "left 40%",
          scrub: 1,
        },
      });
    });

  }, { scope: containerRef }); // Use scope for better cleanup

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#f3f3f3] overflow-x-hidden flex items-center"
    >
      {/* Background Typography */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <h1 className="text-[12vw] md:text-[8vw] font-black text-black/20 leading-none text-right uppercase mr-8 whitespace-nowrap">
          Lenis Brings <br />The Heat
        </h1>
      </div>

      {/* The Track */}
      <div 
        ref={trackRef} 
        className="flex gap-16 px-[10vw] z-10 w-max h-auto items-center"
      >
        {cardsData.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] bg-white border border-black/10 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col justify-between p-8 shrink-0"
          >
            <div className="text-4xl md:text-5xl font-bold text-pink-500">
              {card.id}
            </div>
            <div className="text-3xl md:text-4xl font-black uppercase text-black leading-none max-w-[80%]">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

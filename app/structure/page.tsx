"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const outerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const hugeMissionRef = useRef<HTMLDivElement>(null);
  const hugePhaseRef = useRef<HTMLDivElement>(null);
  const hugeStructureRef = useRef<HTMLDivElement>(null);

  const targetMissionRef = useRef<HTMLSpanElement>(null);
  const targetStructureRef = useRef<HTMLSpanElement>(null);
  const stickyRuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const getMorphMetrics = (source: HTMLElement, target: HTMLElement) => {
        const s = source.getBoundingClientRect();
        const t = target.getBoundingClientRect();
        return {
          x: t.left + t.width / 2 - (s.left + s.width / 2),
          y: t.top + t.height / 2 - (s.top + s.height / 2),
          scale: t.width / s.width,
        };
      };

      if (!isMobile) {
        const morphTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=800",
            scrub: 1,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        morphTl.to(hugePhaseRef.current, {
          opacity: 0, y: 80, scale: 0.8,
          duration: 0.3, ease: "power2.inOut",
        }, 0);

        morphTl.to(hugeMissionRef.current, {
          x: () => getMorphMetrics(hugeMissionRef.current!, targetMissionRef.current!).x,
          y: () => getMorphMetrics(hugeMissionRef.current!, targetMissionRef.current!).y,
          scale: () => getMorphMetrics(hugeMissionRef.current!, targetMissionRef.current!).scale,
          duration: 1, ease: "power3.inOut",
        }, 0);

        morphTl.to(hugeStructureRef.current, {
          x: () => getMorphMetrics(hugeStructureRef.current!, targetStructureRef.current!).x,
          y: () => getMorphMetrics(hugeStructureRef.current!, targetStructureRef.current!).y,
          scale: () => getMorphMetrics(hugeStructureRef.current!, targetStructureRef.current!).scale,
          duration: 1, ease: "power3.inOut",
        }, 0);

        morphTl.to(stickyRuleRef.current, {
          scaleX: 1, opacity: 0.5,
          duration: 0.3, ease: "power2.out",
        }, 0.7);

        morphTl.to(".sticky-target-text", {
          opacity: 1,
          duration: 0.2,
          ease: "power1.inOut",
        }, 0.82);

        morphTl.to([hugeMissionRef.current, hugeStructureRef.current], {
          opacity: 0,
          duration: 0.2,
          ease: "power1.inOut",
        }, 0.85);

      } else {
        gsap.set(".sticky-target-text", { opacity: 1 });
        gsap.set(stickyRuleRef.current, { scaleX: 1, opacity: 0.5 });
        gsap.set([hugeMissionRef.current, hugePhaseRef.current, hugeStructureRef.current], { opacity: 0 });
      }

    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: auto; }

        body {
          background: #000;
          color: #f0ece2;
          font-family: var(--font-dm-mono), monospace;
          overflow-x: hidden;
        }

        .page-wrapper {
          position: relative;
          overflow-x: clip;
        }

        /* ─── STICKY HEADER ─── */
        .sticky-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 40;
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .sticky-header { height: 80px; }
        }

        .sticky-target-text {
          font-family: var(--font-bebas), sans-serif;
          font-weight: 400;
          font-size: clamp(1.4rem, 4vw, 3rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0;
          display: flex;
          gap: 1.5ch;
          position: relative;
          z-index: 2; 
        }

        .sticky-rule {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.8) 70%, transparent);
          transform: scaleX(0);
          transform-origin: center;
          opacity: 0;
        }

        /* ─── HERO ─── */
        .hero {
          position: relative;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: visible;
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .hero { height: 0; overflow: hidden; }
        }

        .hero-stack {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1400px;
          padding: 0 10vw;
          overflow: visible;
          pointer-events: auto;
        }

        .huge-text {
          font-family: var(--font-bebas), sans-serif;
          font-weight: 400;
          font-size: clamp(5rem, 15vw, 18rem);
          line-height: 0.85;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
          transform-origin: center center;
          will-change: transform, opacity;
          overflow: visible;
          position: relative;
          z-index: 1;
        }

        .align-left { align-self: flex-start; }
        .align-center { align-self: center; }
        .align-right { align-self: flex-end; }

        .huge-text.accent {
          color: #ffffff;
          font-size: clamp(4rem, 12vw, 15rem);
          margin: 0.1em 0;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
        }

        /* ─── COMING SOON SECTION ─── */
        .coming-soon-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #000;
          z-index: 1;
          padding: 4rem 2rem;
        }

        .coming-soon-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(2.5rem, 8vw, 7rem);
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          text-align: center;
          line-height: 1.1;
          position: relative;
        }

        .coming-soon-heading::after {
          content: '';
          display: block;
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          margin: 1.5rem auto 0;
        }

        .coming-soon-sub {
          font-family: var(--font-dm-mono), monospace;
          font-size: clamp(0.6rem, 1.5vw, 0.8rem);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 1.5rem;
          text-align: center;
        }

        /* Pulsing dot */
        .coming-soon-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          margin-top: 2.5rem;
          animation: comingSoonPulse 2s ease-in-out infinite;
        }

        @keyframes comingSoonPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); box-shadow: 0 0 0 rgba(255,255,255,0); }
          50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 20px rgba(255,255,255,0.3); }
        }

        /* ─── AMBIENT ─── */
        .ambient {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }
        @media (max-width: 767px) {
          .ambient { width: 280px; height: 280px; }
        }
      `}</style>

      <div className="page-wrapper" ref={outerRef}>
        <div className="ambient" />

        <div className="sticky-header bg-black md:bg-none">
          <div className="sticky-target-text">
            <span ref={targetMissionRef}>Mission</span>
            <span ref={targetStructureRef}>Structure</span>
          </div>
          <div className="sticky-rule" ref={stickyRuleRef} />
        </div>

        <div className="hero" ref={heroRef}>
          <div className="hero-stack">
            <div className="huge-text align-left" ref={hugeMissionRef}>Mission</div>
            <div className="huge-text align-center" ref={hugePhaseRef}>Phase</div>
            <div className="huge-text align-right" ref={hugeStructureRef}>Structure</div>
          </div>
        </div>

        <div className="coming-soon-section">
          <h2 className="coming-soon-heading">More Details<br />Coming Soon</h2>
          <p className="coming-soon-sub">Stay tuned for updates</p>
          <div className="coming-soon-dot" />
        </div>
      </div>
    </>
  );
}
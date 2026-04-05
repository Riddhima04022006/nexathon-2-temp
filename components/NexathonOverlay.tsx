"use client";
import dynamic from "next/dynamic";

// Properly dynamic loading components to avoid SSR and R3F namespace issues
const Scroll = dynamic(
  () => import("@react-three/drei").then(mod => mod.Scroll),
  { ssr: false }
);
const Html = dynamic(
  () => import("@react-three/drei").then(mod => mod.Html),
  { ssr: false }
);

import { motion } from 'framer-motion';
import { useState, useRef, useEffect, Suspense } from 'react';
import Image from "next/image";

import Bhuwan   from "../app/(main)/nexathon/assets/Icon_Bhuwan.png";
import Devit    from "../app/(main)/nexathon/assets/Icon_Devit.png";
import Dheeraj  from "../app/(main)/nexathon/assets/Icon_Dheeraj.png";
import Habeeb   from "../app/(main)/nexathon/assets/Icon_Habeeb.png";
import Harshit  from "../app/(main)/nexathon/assets/Icon_Harshit.png";
import Medhavee from "../app/(main)/nexathon/assets/Icon_Medhavee.png";
import Moksh    from "../app/(main)/nexathon/assets/Icon_Moksh.png";
import Palak    from "../app/(main)/nexathon/assets/Icon_Palak.png";
import Prakhar  from "../app/(main)/nexathon/assets/Icon_Prakhar.png";
import Riddhima from "../app/(main)/nexathon/assets/Icon_Riddhima.png";
import Sipra    from "../app/(main)/nexathon/assets/Icon_Sipra.png";
import Vigus    from "../app/(main)/nexathon/assets/Icon_Vigus.png";
import Vikram   from "../app/(main)/nexathon/assets/Icon_Vikram.png";

const team = [
  { name: "Harshit",   img: Harshit,   role: "Co-lead" },
  { name: "Medhavee", img: Medhavee, role: "Co-lead" },
  { name: "Riddhima", img: Riddhima, role: "Web Developer & Panelist" },
  { name: "Sipra",    img: Sipra,    role: "Brand Designer" },
  { name: "Bhuwan",   img: Bhuwan,   role: "Panelist" },
  { name: "Prakhar",  img: Prakhar,  role: "Panelist" },
  { name: "Moksh",    img: Moksh,    role: "Panelist" },
  { name: "Habeeb",   img: Habeeb,   role: "Panelist" },
  { name: "Vikram",   img: Vikram,   role: "Tech Assistant" },
  { name: "Vigus",    img: Vigus,    role: "Content Writer" },
  { name: "Devit",    img: Devit,    role: "Content Writer" },
  { name: "Palak",    img: Palak,    role: "Social Media Manager" },
  { name: "Dheeraj",  img: Dheeraj,  role: "Video Editor" },
];

function PinnedTeamSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  const idxRef     = useRef(0);
  const pinnedRef  = useRef(false);
  const doneRef    = useRef(false);
  const coolRef    = useRef(false);
  const dragMaxRef = useRef(0);

  const isDraggingRef  = useRef(false);
  const dragStartXRef  = useRef(0);
  const trackStartXRef = useRef(0);

  const [activeIdx, setActiveIdx] = useState(0);
  const GAP_PX = 12;

  const measureDrag = () => {
    if (trackRef.current && carouselRef.current) {
      dragMaxRef.current = trackRef.current.scrollWidth - carouselRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    measureDrag();
    const t = setTimeout(measureDrag, 900);
    window.addEventListener('resize', measureDrag);
    return () => { clearTimeout(t); window.removeEventListener('resize', measureDrag); };
  }, []);

  const slideTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardEl = track.firstElementChild as HTMLElement | null;
    const cardW  = cardEl ? cardEl.offsetWidth : 200;
    const offset = Math.min(idx * (cardW + GAP_PX), dragMaxRef.current);
    track.style.transition = 'transform 0.42s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform  = `translateX(-${offset}px)`;
  };

  useEffect(() => { slideTo(activeIdx); }, [activeIdx]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const isPinnedByPosition = (): boolean => {
      const rect = el.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
    };

    const onWheel = (e: WheelEvent) => {
      const inZone = isPinnedByPosition();
      if (!inZone) {
        if (pinnedRef.current) pinnedRef.current = false;
        return;
      }
      if (e.deltaY > 0) {
        if (doneRef.current) return;
        e.preventDefault();
        if (!pinnedRef.current) pinnedRef.current = true;
        if (coolRef.current) return;
        coolRef.current = true;
        setTimeout(() => { coolRef.current = false; }, 400);
        const next = idxRef.current + 1;
        if (next >= team.length) {
          doneRef.current   = true;
          pinnedRef.current = false;
        } else {
          idxRef.current = next;
          setActiveIdx(next);
        }
      } else if (e.deltaY < 0) {
        if (doneRef.current) {
          doneRef.current   = false;
          pinnedRef.current = true;
        }
        if (!pinnedRef.current) return;
        e.preventDefault();
        if (coolRef.current) return;
        coolRef.current = true;
        setTimeout(() => { coolRef.current = false; }, 400);
        const prev = idxRef.current - 1;
        if (prev < 0) {
          pinnedRef.current = false;
        } else {
          idxRef.current = prev;
          setActiveIdx(prev);
        }
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  const getCurrentTranslateX = (): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const matrix = new DOMMatrix(window.getComputedStyle(track).transform);
    return matrix.m41;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current  = true;
    dragStartXRef.current  = e.clientX;
    trackStartXRef.current = getCurrentTranslateX();
    trackRef.current.style.transition = 'none';
    trackRef.current.style.cursor = 'grabbing';
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const dx   = e.clientX - dragStartXRef.current;
    const newX = Math.min(0, Math.max(-dragMaxRef.current, trackStartXRef.current + dx));
    trackRef.current.style.transform = `translateX(${newX}px)`;
  };

  const onPointerUp = () => {
    if (!isDraggingRef.current || !trackRef.current) return;
    isDraggingRef.current = false;
    trackRef.current.style.cursor = 'grab';
    const track  = trackRef.current;
    const cardEl = track.firstElementChild as HTMLElement | null;
    const cardW  = cardEl ? cardEl.offsetWidth : 200;
    const currentX = getCurrentTranslateX();
    const clamped  = Math.max(0, Math.min(team.length - 1, Math.round(-currentX / (cardW + GAP_PX))));
    idxRef.current = clamped;
    setActiveIdx(clamped);
  };

  return (
    <div ref={sectionRef} className="responsive-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ margin: '-80px' }}
        className="responsive-card"
      >
        <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THE CREW</p>
        <h2 className="massive-heading">Meet Our<br />Team</h2>
        <div ref={carouselRef} style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem', position: 'relative' }}>
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ display: 'flex', gap: `${GAP_PX}px`, width: 'max-content', cursor: 'grab', userSelect: 'none', willChange: 'transform' }}
          >
            {team.map((member, i) => (
              <div
                key={i}
                style={{
                  width: 'clamp(160px, 36vw, 240px)',
                  height: 'clamp(200px, 30vw, 280px)',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.75rem',
                  border: `1px solid ${i === activeIdx ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  flexShrink: 0,
                  transition: 'border-color 0.35s ease',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ width: '100%', height: '75%', position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    draggable={false}
                    sizes="(max-width: 768px) 36vw, 240px"
                    style={{
                      objectFit: 'cover',
                      filter:     i === activeIdx ? 'grayscale(0%)' : 'grayscale(100%)',
                      transform:  i === activeIdx ? 'scale(1.06)'  : 'scale(1)',
                      transition: 'filter 0.4s ease, transform 0.4s ease',
                    }}
                  />
                </div>
                <span style={{ fontFamily: '"DM Mono", monospace', color: '#fff', fontSize: '11px', marginTop: '0.4rem', textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {member.name}
                </span>
                <span style={{ fontFamily: '"DM Mono", monospace', color: '#ff3b3b', fontSize: '9px', textAlign: 'center', marginBottom: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.25)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '1rem' }}>
          ← DRAG TO EXPLORE →
        </p>
      </motion.div>
    </div>
  );
}

export default function NexathonOverlay() {
  const toastRef      = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRegisterClick = () => {
    const toast = toastRef.current;
    if (!toast) return;
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toast.classList.add('show');
    toastTimerRef.current = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  if (typeof window === "undefined") return null;

  return (
    <Suspense fallback={null}>
      <Scroll html style={{ width: '100vw' }}>
        <style>{`
          .responsive-page {
            width: 100vw;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 1.5rem 9vw;
            box-sizing: border-box;
          }

          .responsive-card {
            position: relative;
            max-width: 680px;
            width: 100%;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: clamp(1.5rem, 5vw, 3rem);
            border-radius: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            text-align: left;
            box-sizing: border-box;
          }

          .massive-heading {
            font-family: var(--font-infinite-beyond), sans-serif;
            font-size: clamp(2.5rem, 5vw, 6.5rem);
            color: #fff;
            line-height: 1;
            margin-bottom: 1.25rem;
            overflow-wrap: break-word;
          }

          @media (max-width: 768px) {
            .responsive-page { justify-content: center; padding: 1rem; }
            .responsive-card {
              text-align: center;
              max-width: calc(100vw - 2rem);
              background: transparent;
              border: none;
              border-radius: 0;
            }
            .massive-heading { font-size: clamp(1.8rem, 10vw, 3rem); }
          }

          .register-container {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-top: 1rem;
            position: relative;
          }

          @media (max-width: 768px) {
            .register-container {
              flex-direction: column;
              gap: 1rem;
            }
          }

          .register-btn {
            position: relative;
            overflow: hidden;
            font-family: "DM Mono", monospace;
            padding: 1rem 3rem;
            background: #fff;
            color: #000;
            font-size: clamp(10px, 2vw, 13px);
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            border: 1px solid #fff;
            border-radius: 100px;
            cursor: pointer;
            box-shadow: 0 0 30px rgba(255,255,255,0.25);
            transition: color 0.35s ease, background 0.35s ease;
            flex-shrink: 0;
          }

          .register-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: #000;
            transform: translateX(-101%);
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 0;
          }

          .register-btn:hover::before { transform: translateX(0); }
          .register-btn:hover { color: #fff; background: transparent; }
          .register-btn span { position: relative; z-index: 1; }

          .toast {
            opacity: 0;
            transform: translateX(-10px);
            background: #79733f;
            border: 1px solid var(--border-strong);
            color: var(--text);
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 14px 36px;
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.28s ease, transform 0.28s ease;
            white-space: nowrap;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .toast.show {
            opacity: 1;
            transform: translateX(0);
          }

          @media (max-width: 768px) {
            .toast {
              transform: translateY(10px);
              font-size: 0.8rem;
              padding: 6px 16px;
            }
            .toast.show {
              transform: translateY(0);
            }
          }

          .sponsor-track {
            display: flex;
            gap: 0.75rem;
            width: max-content;
            animation: loop-sponsors 40s linear infinite;
          }
          .sponsor-track:hover { animation-play-state: paused; }

          @keyframes loop-sponsors {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 0.375rem)); }
          }
        `}</style>

        <div className="responsive-page">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="responsive-card"
          >
            <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>MISSION BRIEF</p>
            <h1 className="massive-heading">What is<br />Nexathon</h1>
            <h2 style={{ fontFamily: '"DM Mono", monospace', color: 'white', marginBottom: '0.5rem' }}>THE ULTIMATE CONVERGENCE</h2>
            <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(209,213,219,1)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', lineHeight: 1.5 }}>
              Nexathon is an interstellar journey where innovators push the boundaries of the digital universe. More than a hackathon, it is a high-intensity engineering launchpad designed to ignite ideas, build stellar projects, and accelerate the future. Whether you are a lone rebel or part of a fleet, this is where your code becomes legendary.
            </p>
            
            <div className="register-container">
              <button className="register-btn" onClick={handleRegisterClick}>
                <span>Register Now</span>
              </button>
              <div ref={toastRef} className="toast">
                Registration is not open yet
              </div>
            </div>
          </motion.div>
        </div>

        <PinnedTeamSection />

        <div className="responsive-page">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ margin: '-80px' }}
            className="responsive-card"
          >
            <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THANK YOU</p>
            <h2 className="massive-heading" style={{ fontSize: 'clamp(2.2rem, 4vw, 6rem)' }}>SPONSORS</h2>
            <div style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem' }}>
              <motion.div className="sponsor-track">
                {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
                  <div
                    key={index}
                    style={{
                      width: 'clamp(160px, 36vw, 240px)',
                      height: 'clamp(100px, 22vw, 145px)',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>SPONSOR 0{i}</span>
                    <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.2)', fontSize: '9px', marginTop: '0.4rem', textTransform: 'uppercase' }}>OFFICIAL PARTNER</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <br />
            <button className="register-btn" style={{ marginTop: 0 }} onClick={handleRegisterClick}>
              <span>Join the Fleet</span>
            </button>
          </motion.div>
        </div>
      </Scroll>
    </Suspense>
  );
}
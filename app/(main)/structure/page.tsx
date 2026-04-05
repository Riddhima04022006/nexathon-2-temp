'use client';

import { useEffect, useRef } from 'react';
import type { Group } from 'three';

export default function NexathonPage() {
  const toastRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cleanupFns: (() => void)[] = [];

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');

      gsap.registerPlugin(ScrollTrigger);

      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('visible');
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
      cleanupFns.push(() => obs.disconnect());

      const canvasContainer = document.getElementById('canvas-container');
      if (!canvasContainer) return;

      const scene = new THREE.Scene();
      const isMobile = window.innerWidth < 768;

      const camera = new THREE.PerspectiveCamera(
        75,
        canvasContainer.clientWidth / canvasContainer.clientHeight,
        0.1,
        1000
      );
      camera.position.z = isMobile ? 12 : 8;
      camera.position.y = 1;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      canvasContainer.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const spot = new THREE.PointLight(0xffffff, 25);
      spot.position.set(5, 5, 5);
      scene.add(spot);

      let falcon: Group | null = null;
      let animFrameId: number;

      const initScrollAnimations = () => {
        gsap.set('.seeking', { x: isMobile ? -200 : -500, opacity: 0 });
        gsap.set('.talent',  { x: isMobile ? 200 : 500,  opacity: 0 });
        gsap.set('.real-tag', {
          opacity: 0,
          scale: 0.85,
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '50%',
          transformOrigin: '50% 50%',
          force3D: true,
        });
        gsap.set('.content-reveal', { visibility: 'visible', opacity: 0, y: 40 });
        gsap.set('.reveal-item', { y: 20, opacity: 0 });

        const purposeTL = gsap.timeline({
          scrollTrigger: {
            id: 'purpose-st',
            trigger: '#purpose',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            pin: '.sticky-box',
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        purposeTL
          .to('.seeking', { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
          .to('.talent',  { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
          .to('.seeking', { y: isMobile ? -40 : -70, scale: 0.5, duration: 0.5, ease: 'power2.inOut' }, 0.35)
          .to('.talent',  { y: isMobile ? 40 : 70, scale: 0.5, webkitTextStroke: '1px rgba(255,255,255,1)', duration: 0.5, ease: 'power2.inOut' }, 0.35)
          .to('.real-tag', { opacity: 1, scale: 1.1, duration: 0.5, ease: 'power2.out' }, 0.35)
          .to('.heading-group', { y: '-10vh', scale: 0.8, duration: 0.45, ease: 'power3.inOut' }, 0.75)
          .to('.content-reveal', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.95)
          .to('.reveal-item', { opacity: 1, y: 0, stagger: 0.15, duration: 0.4, ease: 'sine.out' }, 1.1);

        // FIX 4: Reduced scroll from +=300% to +=180% so rounds section feels tighter
        const roundsTL = gsap.timeline({
          scrollTrigger: {
            trigger: '.rounds-outer',
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.set('#card-1', { className: 'round-card-pinned active' });
        gsap.set('#content-1', { height: 'auto', opacity: 1 });

        roundsTL
          .to({}, { duration: 0.6 })
          .to('#content-1', { height: 0, opacity: 0, duration: 0.6 })
          .to('#card-1', { className: 'round-card-pinned', duration: 0.1 }, '<')
          .to('#card-2', { className: 'round-card-pinned active', duration: 0.1 }, '<')
          .to('#content-2', { height: 'auto', opacity: 1, duration: 0.6 }, '<')
          .to({}, { duration: 0.6 })
          .to('#content-2', { height: 0, opacity: 0, duration: 0.6 })
          .to('#card-2', { className: 'round-card-pinned', duration: 0.1 }, '<')
          .to('#card-3', { className: 'round-card-pinned active', duration: 0.1 }, '<')
          .to('#content-3', { height: 'auto', opacity: 1, duration: 0.6 }, '<');

        const timelineTL = gsap.timeline({
          scrollTrigger: {
            trigger: '#timeline',
            start: isMobile ? 'top 80%' : 'top 60%',
            end: isMobile ? 'bottom 80%' : 'top 10%',
            scrub: 1,
          },
        });

        const nodeOn = {
          backgroundColor: '#fff',
          borderColor: '#fff',
          boxShadow: '0 0 20px rgba(255,255,255,0.4)',
          scale: 1.1,
        };
        const labelOn = { color: '#fff', fontWeight: '500' };

        timelineTL
          .to('#node-reg .tl-node', nodeOn, 0)
          .to('#node-reg .tl-label', labelOn, 0)
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '25%', duration: 1 })
          .to('#node-r1 .tl-node', nodeOn)
          .to('#node-r1 .tl-label', labelOn, '<')
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '50%', duration: 1 })
          .to('#node-r2 .tl-node', nodeOn)
          .to('#node-r2 .tl-label', labelOn, '<')
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '75%', duration: 1 })
          .to('#node-r3 .tl-node', nodeOn)
          .to('#node-r3 .tl-label', labelOn, '<')
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '100%', duration: 1 })
          .to('#node-eval .tl-node', nodeOn)
          .to('#node-eval .tl-label', labelOn, '<');
      };

      setTimeout(() => {
        initScrollAnimations();
        ScrollTrigger.refresh();
      }, 100);

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        if (falcon) falcon.rotation.y += 0.0015;
        const rect = canvasContainer.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          renderer.render(scene, camera);
        }
      };
      animate();

      const loader = new GLTFLoader();
      loader.load(
        '/models/millennium_falcon.glb',
        (gltf) => {
          falcon = gltf.scene;

          const box = new THREE.Box3().setFromObject(falcon);
          const center = box.getCenter(new THREE.Vector3());
          falcon.position.sub(center);
          falcon.scale.set(1.6, 1.6, 1.6);

          if (window.innerWidth > 1024) {
            falcon.position.x = 3;
            camera.position.z = 8;
            camera.position.y = 1;
          } else {
            falcon.position.x = 0;
            camera.position.z = 10;
          }

          scene.add(falcon);
          canvasContainer.style.opacity = '1';

          const isMob = window.innerWidth < 768;
          const sharedST = {
            trigger: '#purpose',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
          };

          gsap.to(camera.position, {
            z: isMob ? 4 : 0.2,
            y: 0,
            ease: 'none',
            duration: 0.6,
            scrollTrigger: sharedST,
          });

          gsap.to(falcon.rotation, {
            y: Math.PI * 2,
            ease: 'power2.in',
            duration: 0.6,
            scrollTrigger: sharedST,
          });

          ScrollTrigger.refresh();
        }
      );

      const handleResize = () => {
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      cleanupFns.push(() => {
        cancelAnimationFrame(animFrameId);
        renderer.dispose();
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      });
    };

    init();

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const handleRegisterClick = () => {
    const toast = toastRef.current;
    if (!toast) return;
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toast.classList.add('show');
    toastTimerRef.current = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg: #0a0a0a;
          --surface: #111111;
          --text: #f0f0f0;
          --muted: #888;
          --dim: #444;
          --border: rgba(255,255,255,0.08);
          --border-strong: rgba(255,255,255,0.15);
          --white: #ffffff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html {
          overflow-x: hidden;
          touch-action: pan-y;
          -ms-touch-action: pan-y;
        }

        html, body {
          height: auto !important;
          min-height: 100%;
          scroll-behavior: smooth;
          max-width: 100%;
          overscroll-behavior-x: none;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }

        .hero, #canvas-container, .hero-grid-bg,
        .hero-content-wrapper, .nexathon-nav, .purpose-wrapper,
        .sticky-box, .heading-group, .rounds-outer,
        .rounds-sticky-wrapper {
          overflow-y: visible !important;
          overflow-x: visible !important;
        }

        /* ─── FIX 3: Navbar moved to LEFT side ─── */
        .nexathon-nav {
          position: fixed;
          top: 0;
          left: 0;   /* was: right: 0 */
          bottom: 0;
          width: 80px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 80px;
          list-style: none;
        }

        .nav-links a {
          font-size: 0.72rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          /* FIX 3: flip writing direction so text reads top-to-bottom on left side */
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          transition: color 0.3s;
          display: block;
          white-space: nowrap;
        }

        @media (max-width: 1024px) {
          .nexathon-nav {
            top: auto; left: 0; bottom: 0;
            width: 100%; height: 60px;
            flex-direction: row;
            background: rgba(10, 10, 10, 0.8);
            backdrop-filter: blur(10px);
            border-top: 1px solid var(--border);
            padding: 0 20px;
          }
          .nav-links {
            flex-direction: row;
            gap: 0;
            width: 100%;
            justify-content: space-around;
          }
          .nav-links a {
            writing-mode: horizontal-tb;
            transform: none;
            letter-spacing: 0.1em;
            font-size: 0.65rem;
          }
        }

        .nav-links a:hover { color: var(--white); }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          /* FIX 3: Added left padding to clear the left navbar (80px wide) */
          padding: 60px 100px 100px 100px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .hero { padding: 40px 24px 100px 24px; justify-content: center; }
        }

        #canvas-container {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 70% 70% at 40% 60%, black 40%, transparent);
          z-index: 0;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          pointer-events: auto;
        }

        .hero-overline {
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 24px;
          max-width: 90%;
          line-height: 1.4;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 10vw, 11rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.02em;
          margin-bottom: 56px;
        }

        .hero-you-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
          text-decoration: none !important;
        }

        .hero-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 60px; }

        @media (max-width: 900px) {
          .hero-bottom { flex-direction: column; align-items: flex-start; gap: 40px; }
        }

        .hero-sub { max-width: 440px; font-size: 1rem; font-weight: 300; line-height: 1.85; color: rgb(255, 255, 255); }
        .hero-sub strong { color: var(--text); font-weight: 500; }

        .hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 36px; }

        @media (max-width: 900px) {
          .hero-right { align-items: flex-start; width: 100%; }
          .hero-stats { width: 100%; justify-content: flex-start; }
        }

        .hero-stats { display: flex; gap: 52px; }
        .hero-stat-label { font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--white); margin-bottom: 6px; }
        .hero-stat-val { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: var(--white); }

        .register-btn {
          display: inline-block;
          border: 1px solid var(--border-strong);
          padding: 14px 40px;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          position: relative;
          overflow: hidden;
          transition: color 0.3s, border-color 0.3s;
        }

        .register-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--white);
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .register-btn:hover::before { transform: translateX(0); }
        .register-btn:hover { color: var(--bg); border-color: var(--white); }
        .register-btn span { position: relative; z-index: 1; }

        .toast {
          position: fixed;
          bottom: 44px;
          left: 50%;
          transform: translateX(-50%) translateY(16px);
          background: var(--surface);
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

        @media (max-width: 768px) { .toast { bottom: 80px; width: 90%; text-align: center; } }

        .toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* ─── FIX 1: Purpose section — proper centering for heading-group ─── */
        .purpose-wrapper {
          position: relative;
          background: var(--bg);
          height: 200vh;
          clip-path: inset(0);
        }

        .sticky-box {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .heading-group {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: clamp(3rem, 10vw, 9rem);
          z-index: 10;
        }

        .word {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 10vw, 9rem);
          text-transform: uppercase;
          line-height: 1;
          /* Kept as original — GSAP animates x/y from off-screen to 0,0.
             heading-group flex centers the natural in-flow position (x=0,y=0).
             Adding top/left/transform here would conflict with GSAP's x/y. */
          position: absolute;
          letter-spacing: -0.05em;
          white-space: nowrap;
        }

        .seeking { color: var(--white); z-index: 5; }
        .talent  { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.4); z-index: 4; }

        .real-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.8rem);
          color: var(--white);
          opacity: 0;
          z-index: 6;
          font-weight: 300;
          position: absolute;
          left: 50%;
          top: 50%;
          text-align: center;
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: 0.3em;
        }

        .content-reveal {
          position: relative;
          width: 100%;
          max-width: 1100px;
          padding: 40px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          opacity: 0;
          visibility: hidden;
          z-index: 5;
          transform: translateY(40px);
        }

        @media (max-width: 850px) {
          .content-reveal {
            grid-template-columns: 1fr;
            padding: 20px 24px;
            gap: 40px;
            text-align: center;
          }
          .feature-list { padding-left: 0 !important; border-left: none !important; }
        }

        .desc-text { font-size: 1.1rem; color: var(--muted); line-height: 1.85; font-weight: 300; }
        .feature-list { list-style: none; border-left: 1px solid var(--border-strong); padding-left: 40px; }
        .feature-list h4 { font-size: 1rem; color: var(--white); font-weight: 500; margin-bottom: 8px; }
        .feature-list p  { color: var(--dim); font-size: 0.88rem; line-height: 1.6; }
        .feature-list li + li { margin-top: 30px; }

        .rounds-outer { position: relative; background: var(--surface); }
        .rounds-sticky-wrapper { display: grid; grid-template-columns: 0.8fr 1.2fr; height: 100vh; width: 100%; overflow: clip; }

        @media (max-width: 900px) {
          .rounds-sticky-wrapper { grid-template-columns: 1fr; }
          .rounds-left { display: none; }
        }

        .rounds-left { display: flex; flex-direction: column; justify-content: center; padding-left: 80px; border-right: 1px solid var(--border); }
        .rounds-left h2 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 5vw, 5rem); line-height: 1; font-weight: 900; padding-top: 50px; }
        .rounds-right { display: flex; flex-direction: column; justify-content: center; padding: 0 80px; }

        @media (max-width: 768px) {
          .rounds-right { padding: 0 24px; }
        }

        .round-card-pinned { border-bottom: 1px solid var(--border); padding: 20px 0; width: 100%; transition: all 0.4s ease-out; }
        .round-card-pinned:last-child { border-bottom: none; }
        .round-title { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.1; color: var(--muted); transition: color 0.4s ease, font-size 0.4s ease; margin-bottom: 8px; }
        .round-card-pinned.active .round-title { color: var(--white); font-size: clamp(1.8rem, 4vw, 3.2rem); }

        .round-content-wrapper { height: 0; overflow: hidden; opacity: 0; }
        .round-subtitle { font-size: 1rem; font-weight: 300; font-style: italic; color: var(--muted); margin: 10px 0 20px; }
        .round-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .round-list li { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: var(--muted); line-height: 1.5; }
        .round-bullet { display: block; width: 5px; height: 5px; min-width: 5px; min-height: 5px; border-radius: 50%; background: var(--dim); flex-shrink: 0; }

        .timeline-section { width: 100%; padding: 120px 0; border-top: 1px solid var(--border); }
        .timeline-header { padding: 0 80px; margin-bottom: 60px; }

        @media (max-width: 768px) {
          .timeline-header { padding: 0 24px; }
          .tl-container { padding: 0 24px !important; }
          .tl-track {
            flex-direction: column;
            gap: 40px;
            align-items: flex-start !important;
          }
          /* Vertical track line: centered on the 40px node (left: 20px = node center) */
          .tl-track::before {
            left: 20px;
            top: 0;
            bottom: 0;
            width: 1px;
            height: 100%;
          }
          /* Vertical progress line: same center (20px), grows downward via height */
          .tl-progress-line {
            left: 20px !important;
            top: 20px !important;
            width: 2px !important;
            height: 0% !important;
          }
          .tl-item { flex-direction: row !important; gap: 20px; align-items: center; }
          .tl-node { margin-bottom: 0 !important; }
        }

        .tl-container { width: 100%; padding: 0 80px; position: relative; }
        .tl-track { display: flex; width: 100%; position: relative; justify-content: space-between; }
        .tl-track::before { content: ''; position: absolute; top: 20px; left: 0; right: 0; height: 1px; background: var(--border-strong); z-index: 0; }

        /* Desktop progress line — starts at center of first node (20px = half of 40px node) */
        .tl-progress-line {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 0%;
          height: 2px;
          background: var(--white);
          box-shadow: 0 0 15px rgba(255,255,255,0.6);
          z-index: 1;
        }

        .tl-item { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; }
        .tl-node { width: 40px; height: 40px; border: 1px solid var(--border-strong); background: var(--bg); border-radius: 50%; margin-bottom: 24px; transition: all 0.4s ease; }
        .tl-label { font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); transition: 0.3s; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 100px 0 80px; }

        @media (max-width: 768px) {
          .container { padding: 0 24px; }
        }

        .section-heading-large { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 6vw, 5.5rem); font-weight: 700; line-height: 1.1; color: var(--text); }
        .lb-card { position: relative; border: 1px solid var(--border); background: var(--surface); padding: 100px 80px; overflow: hidden; margin-bottom: 150px; }

        @media (max-width: 850px) {
          .lb-card { padding: 60px 24px; }
          .lb-content { flex-direction: column; text-align: center; gap: 40px; }
          .lb-watermark { font-size: 3rem !important; }
        }

        .lb-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 900; color: rgba(255,255,255,0.03); white-space: nowrap; pointer-events: none; z-index: 0; letter-spacing: 0.1em; }
        .lb-content { position: relative; z-index: 1; display: flex; justify-content: space-between; align-items: center; }
        .lb-title { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; line-height: 1.1; }
        .lb-btn { display: inline-block; border: 1px solid var(--border-strong); padding: 20px 50px; color: var(--dim); text-decoration: none; font-size: 0.8rem; letter-spacing: 0.1em; cursor: not-allowed; }

        .fade-up { opacity: 0; transform: translateY(30px); transition: 0.8s ease-out; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="toast" id="toast" ref={toastRef}>
        Registration is not open yet
      </div>

      <div className="nexathon-nav">
        <ul className="nav-links">
          <li><a href="#purpose">About</a></li>
          <li><a href="#rounds">Rounds</a></li>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
        </ul>
      </div>

      <main>
        <section className="hero">
          <div id="canvas-container"></div>
          <div className="hero-content-wrapper">
            <div className="hero-overline">A coding competition unlike any other</div>
            <h1 className="hero-title">
              Prove<br />
              <span className="hero-you-outline">You</span><br />
              Code.
            </h1>
            <div className="hero-bottom">
              <p className="hero-sub">
                Nexathon separates the <strong>real engineers</strong> from the crowd. Three rounds, one leaderboard that doesn&apos;t lie.{' '}
                <strong>Rewarding skill, not presentation.</strong>
              </p>
              <div className="hero-right">
                <div className="hero-stats">
                  <div>
                    <div className="hero-stat-label">Duration</div>
                    <div className="hero-stat-val">
                      95 <span style={{ fontSize: '1rem', fontWeight: 300 }}>hrs</span>
                    </div>
                  </div>
                  <div>
                    <div className="hero-stat-label">Rounds</div>
                    <div className="hero-stat-val">3</div>
                    </div>
                </div>
                <button className="register-btn" onClick={handleRegisterClick}>
                  <span>Register Here</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="purpose-wrapper" id="purpose">
          <div className="sticky-box">
            <div className="heading-group">
              <span className="word seeking">Seeking</span>
              <span className="real-tag">REAL</span>
              <span className="word talent">Talent</span>
            </div>
            <div className="content-reveal">
              <div className="col-left">
                <p className="desc-text">
                  We cut through the noise to find engineers who actually build. No hype, just
                  high-performance logic and real-world impact.
                </p>
              </div>
              <div className="col-right">
                <ul className="feature-list">
                  <li className="reveal-item">
                    <h4>Pure Logic</h4>
                    <p>
                      Rankings based on code quality and execution speed — not presentation or
                      polished demos.
                    </p>
                  </li>
                  <li className="reveal-item">
                    <h4>Multi-dimensional</h4>
                    <p>
                      Speed, depth of thinking, and collaborative execution all count toward the
                      final leaderboard.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="rounds-outer" id="rounds">
          <div className="rounds-sticky-wrapper">
            <div className="rounds-left">
              <h2>OUR<br />ROUNDS</h2>
            </div>
            <div className="rounds-right">
              <div className="round-card-pinned" id="card-1">
                <h3 className="round-title">Competitive Programming</h3>
                <div className="round-content-wrapper" id="content-1">
                  <p className="round-subtitle">Where speed meets precision.</p>
                  <ul className="round-list">
                    <li><span className="round-bullet"></span>Crack problems, optimise solutions, climb fast</li>
                    <li><span className="round-bullet"></span>Real-time rankings updated as you submit</li>
                    <li><span className="round-bullet"></span>Automated judge. No bias, no grey areas</li>
                  </ul>
                </div>
              </div>
              <div className="round-card-pinned" id="card-2">
                <h3 className="round-title">Panelist Round</h3>
                <div className="round-content-wrapper" id="content-2">
                  <p className="round-subtitle">Thinking is everything.</p>
                  <ul className="round-list">
                    <li><span className="round-bullet"></span>Problem-solving approach under scrutiny</li>
                    <li><span className="round-bullet"></span>Deep technical understanding assessed</li>
                    <li><span className="round-bullet"></span>Think out loud. Defend your decisions</li>
                  </ul>
                </div>
              </div>
              <div className="round-card-pinned" id="card-3">
                <h3 className="round-title">OSS Sprint</h3>
                <div className="round-content-wrapper" id="content-3">
                  <p className="round-subtitle">From ideas to real impact.</p>
                  <ul className="round-list">
                    <li><span className="round-bullet"></span>Work on real open-source repositories</li>
                    <li><span className="round-bullet"></span>Contributions measured by quality and volume</li>
                    <li><span className="round-bullet"></span>Build, collaborate, ship. For the real world</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="timeline-section" id="timeline">
          <div className="timeline-header fade-up">
            <h2 className="section-heading-large">
              The journey<br />begins here.
            </h2>
          </div>
          <div className="tl-container">
            <div className="tl-track">
              <div className="tl-progress-line"></div>
              <div className="tl-item" id="node-reg">
                <div className="tl-node"></div>
                <div className="tl-label">Registration</div>
              </div>
              <div className="tl-item" id="node-r1">
                <div className="tl-node"></div>
                <div className="tl-label">Round 1</div>
              </div>
              <div className="tl-item" id="node-r2">
                <div className="tl-node"></div>
                <div className="tl-label">Round 2</div>
              </div>
              <div className="tl-item" id="node-r3">
                <div className="tl-node"></div>
                <div className="tl-label">Round 3</div>
              </div>
              <div className="tl-item" id="node-eval">
                <div className="tl-node"></div>
                <div className="tl-label">Evaluation</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="fade-up" id="leaderboard">
            <h2
              className="section-heading-large"
              style={{ paddingTop: '0px', marginBottom: '60px' }}
            >
              Real-time<br />rankings.
            </h2>
            <div className="lb-card">
              <div className="lb-watermark">LEADERBOARD</div>
              <div className="lb-content">
                <div>
                  <h2 className="lb-title">Track every move.</h2>
                  <p
                    style={{
                      marginTop: '20px',
                      color: 'var(--muted)',
                      maxWidth: '420px',
                      lineHeight: '1.8',
                    }}
                  >
                    The leaderboard goes live once Round 1 begins. Watch rankings shift second by
                    second.
                  </p>
                </div>
                <a
                  href="#"
                  className="lb-btn"
                  onClick={(e) => e.preventDefault()}
                >
                  COMING SOON
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
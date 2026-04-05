"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Nexathon() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const handleRegisterClick = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2800);
  };

  useEffect(() => {
    // 1. Intersection Observer for fade-up elements
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0');
        });
      },
      { threshold: 0.1 }
    );
    const fadeEls = document.querySelectorAll('.fade-up');
    fadeEls.forEach((el) => obs.observe(el));

    // 2. Three.js Setup
    if (!mountRef.current) return;
    const canvasContainer = mountRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasContainer.clientWidth / canvasContainer.clientHeight,
      0.1,
      1000
    );

    const isMobile = window.innerWidth < 768;
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

    let falcon: THREE.Group;
    const loader = new GLTFLoader();

    // GSAP Context to ensure easy cleanup
    let ctx = gsap.context(() => {}, containerRef);

    const initScrollAnimations = () => {
      ctx.add(() => {
        // --- 1. Purpose Section Timeline ---
        gsap.set('.seeking', { x: isMobile ? -200 : -500, opacity: 0 });
        gsap.set('.talent', { x: isMobile ? 200 : 500, opacity: 0 });
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
            trigger: '#purpose',
            start: 'top top',
            end: '+=100%',
            scrub: 0.7,
            pin: '.sticky-box',
            anticipatePin: 1,
            pinSpacing: true,
          },
        });

        purposeTL
          .to('.seeking', { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
          .to('.talent', { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
          .to('.seeking', { y: isMobile ? -40 : -70, scale: 0.5, duration: 0.5, ease: 'power2.inOut' }, 0.35)
          .to('.talent', { y: isMobile ? 40 : 70, scale: 0.5, webkitTextStroke: '1px rgba(255,255,255,1)', duration: 0.5, ease: 'power2.inOut' }, 0.35)
          .to('.real-tag', { opacity: 1, scale: 1.1, duration: 0.5, ease: 'power2.out' }, 0.35)
          .to('.heading-group', { y: '-10vh', scale: 0.8, duration: 0.45, ease: 'power3.inOut' }, 0.75)
          .to('.content-reveal', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.95)
          .to('.reveal-item', { opacity: 1, y: 0, stagger: 0.15, duration: 0.4, ease: 'sine.out' }, 1.1);

        if (falcon) {
          purposeTL
            .to(camera.position, { z: isMobile ? 4 : 0.2, y: 0, ease: 'none', duration: 0.6 }, 0.2)
            .to(falcon.rotation, { y: Math.PI * 2, ease: 'power2.in', duration: 0.6 }, 0.2);
        }

        // --- 2. Rounds Section Timeline ---
        const roundsTL = gsap.timeline({
          scrollTrigger: { trigger: '.rounds-outer', start: 'top top', end: '+=300%', pin: true, scrub: 0.6 },
        });

        // Initialize first card
        gsap.set('#content-1', { height: 'auto', opacity: 1 });
        document.getElementById('card-1')?.classList.add('active-round');

        roundsTL
          .to({}, { duration: 0.8 })
          .to('#content-1', { height: 0, opacity: 0, duration: 0.8 })
          .add(() => { document.getElementById('card-1')?.classList.remove('active-round'); document.getElementById('card-2')?.classList.add('active-round'); }, '<')
          .to('#content-2', { height: 'auto', opacity: 1, duration: 0.8 }, '<')
          .to({}, { duration: 0.8 })
          .to('#content-2', { height: 0, opacity: 0, duration: 0.8 })
          .add(() => { document.getElementById('card-2')?.classList.remove('active-round'); document.getElementById('card-3')?.classList.add('active-round'); }, '<')
          .to('#content-3', { height: 'auto', opacity: 1, duration: 0.8 }, '<');

        // --- 3. Timeline Progress ---
        const timelineTL = gsap.timeline({
          scrollTrigger: {
            trigger: '#timeline',
            start: isMobile ? 'top 80%' : 'top 60%',
            end: isMobile ? 'bottom 80%' : 'top 10%',
            scrub: 1,
          },
        });

        const nodeOn = { backgroundColor: '#fff', borderColor: '#fff', boxShadow: '0 0 20px rgba(255,255,255,0.4)', scale: 1.1 };
        const labelOn = { color: '#fff', fontWeight: '500' };

        timelineTL
          .to('#node-reg .tl-node', nodeOn, 0).to('#node-reg .tl-label', labelOn, 0)
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '25%', duration: 1 })
          .to('#node-r1 .tl-node', nodeOn).to('#node-r1 .tl-label', labelOn, '<')
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '50%', duration: 1 })
          .to('#node-r2 .tl-node', nodeOn).to('#node-r2 .tl-label', labelOn, '<')
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '75%', duration: 1 })
          .to('#node-r3 .tl-node', nodeOn).to('#node-r3 .tl-label', labelOn, '<')
          .to('.tl-progress-line', { [isMobile ? 'height' : 'width']: '100%', duration: 1 })
          .to('#node-eval .tl-node', nodeOn).to('#node-eval .tl-label', labelOn, '<');
      });
    };

    // Load Model (Ensure millennium_falcon.glb is in your public folder)
    loader.load(
      '/millennium_falcon.glb',
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
        if (mountRef.current) mountRef.current.style.opacity = '1';
        initScrollAnimations();
      },
      undefined,
      () => { initScrollAnimations(); } // Fallback to start animations if model fails
    );

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (falcon) falcon.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      fadeEls.forEach((el) => obs.unobserve(el));
      renderer.dispose();
      ctx.revert(); // Clean up GSAP
      if (canvasContainer && renderer.domElement.parentNode === canvasContainer) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-[#f0f0f0] font-dm overflow-x-hidden relative min-h-screen">
      <style>{`
        .font-heading { font-family: var(--font-infinite-beyond), sans-serif; }
        .font-body { font-family: var(--font-dm-mono), 'DM Mono', monospace; }
        
        /* Custom dynamic styles for specific effects */
        .register-btn::before {
          content: ''; position: absolute; inset: 0; background: #ffffff;
          transform: translateX(-101%); transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); z-index: 0;
        }
        .register-btn:hover::before { transform: translateX(0); }
        
        .active-round .round-title { color: #ffffff !important; font-size: clamp(1.8rem, 4vw, 3.2rem) !important; }
      `}</style>

      {/* Toast */}
      <div
        className={`fixed bottom-[80px] md:bottom-[44px] left-1/2 -translate-x-1/2 bg-[#111111]/80 backdrop-blur-md border border-[rgba(255,255,255,0.15)] text-[#f0f0f0] text-[0.8rem] tracking-[0.1em] uppercase py-[14px] px-[36px] z-[9999] whitespace-nowrap transition-all duration-280 w-[90%] md:w-auto text-center pointer-events-none ${
          toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[16px]'
        }`}
      >
        Registration is not open yet
      </div>

      {/* Navigation - moved to left side to avoid overlap with global menu */}
      <nav className="fixed bottom-0 left-0 w-full h-[60px] flex-row bg-[#0a0a0a]/80 backdrop-blur-md border-t border-[rgba(255,255,255,0.08)] px-5 lg:top-0 lg:left-0 lg:bottom-0 lg:right-auto lg:w-[80px] lg:h-full lg:flex-col lg:bg-transparent lg:border-none lg:px-0 z-[1000] flex items-center justify-around lg:justify-center">
        <ul className="flex flex-row w-full justify-around lg:flex-col lg:gap-[80px] lg:w-auto list-none">
          {['About', 'Rounds', 'Timeline', 'Leaderboard'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-[0.65rem] tracking-[0.1em] lg:text-[0.72rem] lg:tracking-[0.4em] uppercase text-[#888] no-underline transition-colors duration-300 block whitespace-nowrap hover:text-white [writing-mode:horizontal-tb] lg:[writing-mode:vertical-rl]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center md:justify-end px-6 py-10 md:pt-[60px] md:pr-[100px] md:pb-[100px] md:pl-[80px] relative overflow-hidden font-body">
          <div ref={mountRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none opacity-0 transition-opacity duration-1000 ease-in" />
          <div className="absolute inset-0 z-0 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_40%_60%,black_40%,transparent)]" />
          
          <div className="relative z-[2] pointer-events-auto">
            <div className="font-body text-[0.72rem] tracking-[0.28em] uppercase text-[#888] mb-[24px] max-w-[90%] leading-[1.4]">
              A coding competition unlike any other
            </div>
            <h1 className=" overflow-none font-heading text-[clamp(2.5rem,9vw,9rem)] font-normal leading-[0.88] tracking-[-0.02em] mb-[56px] lowercase">
              Prove<br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.2)]">You</span><br />
              Code.
            </h1>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-[60px]">
              <p className="max-w-[440px] text-[1rem] font-light leading-[1.85] text-white">
                Nexathon separates the <strong className="text-[#f0f0f0] font-medium">real engineers</strong> from the crowd. Three rounds, one leaderboard that doesn't lie. <strong className="text-[#f0f0f0] font-medium">Rewarding skill, not presentation.</strong>
              </p>
              
              <div className="flex flex-col items-start lg:items-end gap-[36px] w-full lg:w-auto">
                <div className="flex justify-start lg:justify-end gap-[52px] w-full">
                  <div>
                    <div className="font-body text-[0.65rem] tracking-[0.14em] uppercase text-[#444] mb-[6px]">Duration</div>
                    <div className="font-heading text-[2rem] font-normal text-white">95 <span className="text-[1rem] font-light">hrs</span></div>
                  </div>
                  <div>
                    <div className="font-body text-[0.65rem] tracking-[0.14em] uppercase text-[#444] mb-[6px]">Rounds</div>
                    <div className="font-heading text-[2rem] font-normal text-white">3</div>
                  </div>
                </div>
                <button 
                  onClick={handleRegisterClick}
                  className="register-btn inline-block border border-[rgba(255,255,255,0.15)] py-[14px] px-[40px] text-white font-body text-[0.75rem] tracking-[0.18em] uppercase cursor-pointer bg-transparent relative overflow-hidden transition-colors duration-300 hover:text-[#0a0a0a] hover:border-white"
                >
                  <span className="relative z-[1]">Register Here</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="relative bg-[#0a0a0a] h-[200vh]" id="purpose">
          <div className="sticky-box h-screen w-full flex flex-col items-center justify-center overflow-hidden relative">
            <div className="heading-group relative flex justify-center items-center w-full z-10" style={{ minHeight: 'clamp(6rem, 20vw, 18rem)' }}>
              <span className="word seeking font-heading text-[clamp(3rem,10vw,9rem)] uppercase leading-none absolute tracking-[-0.05em] whitespace-nowrap text-white z-[5]">Seeking</span>
              <span className="real-tag font-body text-[clamp(1rem,2.5vw,1.8rem)] text-white font-light absolute text-center whitespace-nowrap pointer-events-none tracking-[0.3em] z-[6]">REAL</span>
              <span className="word talent font-heading text-[clamp(3rem,10vw,9rem)] uppercase leading-none absolute tracking-[-0.05em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] z-[4]">Talent</span>
            </div>
            
            <div className="content-reveal relative w-full max-w-[1100px] px-6 py-5 md:px-[80px] md:py-[40px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[80px] z-[5] text-center md:text-left">
              <div>
                <p className="text-[1.1rem] text-[#888] leading-[1.85] font-light">
                  We cut through the noise to find engineers who actually build. No hype, just high-performance logic and real-world impact.
                </p>
              </div>
              <div>
                <ul className="list-none md:border-l md:border-[rgba(255,255,255,0.15)] md:pl-[40px]">
                  <li className="reveal-item">
                    <h4 className="text-[1rem] text-white font-medium mb-[8px]">Pure Logic</h4>
                    <p className="text-[#444] text-[0.88rem] leading-[1.6]">Rankings based on code quality and execution speed — not presentation or polished demos.</p>
                  </li>
                  <li className="reveal-item mt-[30px]">
                    <h4 className="text-[1rem] text-white font-medium mb-[8px]">Multi-dimensional</h4>
                    <p className="text-[#444] text-[0.88rem] leading-[1.6]">Speed, depth of thinking, and collaborative execution all count toward the final leaderboard.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Rounds Section */}
        <section className="rounds-outer relative bg-[#111111]" id="rounds">
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] h-screen w-full overflow-hidden">
            <div className="hidden md:flex flex-col justify-center pl-[80px] border-r border-[rgba(255,255,255,0.08)]">
              <h2 className="font-heading text-[clamp(3rem,5vw,5rem)] leading-none font-normal pt-[50px] lowercase">our<br/>rounds</h2>
            </div>
            
            <div className="flex flex-col justify-center px-6 md:px-[80px]">
              {[
                {
                  id: 1, title: 'Competitive Programming', sub: 'Where speed meets precision.', 
                  items: ['Crack problems, optimise solutions, climb fast', 'Real-time rankings updated as you submit', 'Automated judge. No bias, no grey areas']
                },
                {
                  id: 2, title: 'Panelist Round', sub: 'Thinking is everything.', 
                  items: ['Problem-solving approach under scrutiny', 'Deep technical understanding assessed', 'Think out loud. Defend your decisions']
                },
                {
                  id: 3, title: 'OSS Sprint', sub: 'From ideas to real impact.', 
                  items: ['Work on real open-source repositories', 'Contributions measured by quality and volume', 'Build, collaborate, ship. For the real world']
                }
              ].map((round) => (
                <div key={round.id} id={`card-${round.id}`} className="round-card-pinned border-b last:border-b-0 border-[rgba(255,255,255,0.08)] py-[20px] w-full transition-all duration-400 ease-out">
                  <h3 className="round-title font-heading text-[clamp(1.9rem,3vw,2.5rem)] font-normal leading-[1.1] text-[#888] transition-all duration-400 ease-out mb-[8px] lowercase">{round.title}</h3>
                  <div id={`content-${round.id}`} className="h-0 overflow-hidden opacity-0">
                    <p className="font-body text-[1rem] font-light italic text-[#888] my-[10px] mb-[20px]">{round.sub}</p>
                    <ul className="flex flex-col gap-[12px] list-none">
                      {round.items.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-[12px] text-[0.95rem] text-[#888] leading-[1.5]">
                          <span className="text-[#444]">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="w-full py-[120px] border-t border-[rgba(255,255,255,0.08)]" id="timeline">
          <div className="fade-up opacity-0 translate-y-[30px] transition-all duration-800 ease-out px-6 md:px-[80px] mb-[60px]">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.1] text-[#f0f0f0] lowercase">the journey<br/>begins here.</h2>
          </div>
          
          <div className="w-full px-6 md:px-[80px] relative">
            <div className="flex flex-col md:flex-row w-full relative justify-between gap-10 md:gap-0 items-start md:items-stretch">
              {/* Background track line - spans between first and last node centers */}
              <div className="absolute left-[11px] md:left-[10%] top-[11px] bottom-[11px] md:top-[11px] md:bottom-auto w-[1px] md:w-[80%] h-auto md:h-[1px] bg-[rgba(255,255,255,0.15)] z-0" />
              {/* Animated progress line */}
              <div className="tl-progress-line absolute left-[11px] md:left-[10%] top-[11px] md:top-[11px] w-[2px] h-0 md:w-0 md:h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] z-[1]" />
              
              {[
                { id: 'reg', label: 'Registration' },
                { id: 'r1', label: 'Round 1' },
                { id: 'r2', label: 'Round 2' },
                { id: 'r3', label: 'Round 3' },
                { id: 'eval', label: 'Evaluation' }
              ].map((node) => (
                <div key={node.id} id={`node-${node.id}`} className="flex-1 flex flex-row md:flex-col items-center gap-5 md:gap-0 relative z-[2]">
                  <div className="tl-node w-[22px] h-[22px] border-2 border-[rgba(255,255,255,0.3)] bg-[#0a0a0a] rounded-full mb-0 md:mb-[24px] transition-all duration-400 ease-out flex-shrink-0" />
                  <div className="tl-label font-body text-[0.75rem] tracking-[0.1em] uppercase text-[#888] transition-colors duration-300">{node.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <div className="max-w-[1200px] mx-auto px-6 md:pr-[100px] md:pl-[80px]">
          <section className="fade-up opacity-0 translate-y-[30px] transition-all duration-800 ease-out" id="leaderboard">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.1] text-[#f0f0f0] pt-[100px] mb-[60px] lowercase">real-time<br/>rankings.</h2>
            
            <div className="relative border border-[rgba(255,255,255,0.08)] bg-[#111111] p-10 py-[60px] md:px-[80px] md:py-[100px] overflow-hidden mb-[150px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[3rem] md:text-[5rem] font-normal text-[rgba(255,255,255,0.03)] whitespace-nowrap pointer-events-none z-0 tracking-[0.1em] lowercase">
                leaderboard
              </div>
              
              <div className="relative z-[1] flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-10 md:gap-0">
                <div>
                  <h2 className="font-heading text-[3rem] font-normal leading-[1.1] lowercase">track every move.</h2>
                  <p className="font-body mt-[20px] text-[#888] max-w-[420px] leading-[1.8] mx-auto md:mx-0">
                    The leaderboard goes live once Round 1 begins. Watch rankings shift second by second.
                  </p>
                </div>
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-block border border-[rgba(255,255,255,0.15)] py-[20px] px-[50px] text-[#444] text-[0.8rem] tracking-[0.1em] cursor-not-allowed">
                  COMING SOON
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import '../styles/menu.css';

// Using ts-ignore just in case the copied canvas scripts are strictly typed environments
// @ts-ignore
import { Renderer } from '../canvas/render/render.js';
// @ts-ignore
import { MouseField } from '../canvas/interaction/mouseField.js';
// @ts-ignore
import { ParticleSystem } from '../canvas/core/particleSystem.js';
// @ts-ignore
import { MorphController } from '../canvas/morph/morphController.js';

export default function Menu() {
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // 1. Setup Video Loop
    const v1 = v1Ref.current;
    const v2 = v2Ref.current;
    if (!v1 || !v2) return;

    const videoSrc = '/bg.mp4';
    const fadeTime = 1.5;
    
    v1.src = videoSrc;
    v2.src = videoSrc;

    let activeVideo = v1;
    let idleVideo = v2;
    let transitioning = false;
    let rAF_Video: number;

    const checkTransition = () => {
      if (
        !transitioning &&
        activeVideo.duration &&
        activeVideo.currentTime > activeVideo.duration - fadeTime
      ) {
        transitioning = true;
        idleVideo.currentTime = 0;
        idleVideo.play().catch(() => {});

        idleVideo.style.opacity = '1';
        activeVideo.style.opacity = '0';

        const prev = activeVideo;
        activeVideo = idleVideo;
        idleVideo = prev;

        setTimeout(() => {
          idleVideo.pause();
          transitioning = false;
        }, fadeTime * 1000);
      }
      rAF_Video = requestAnimationFrame(checkTransition);
    };

    const startVideo = () => {
      activeVideo
        .play()
        .then(() => {
          rAF_Video = requestAnimationFrame(checkTransition);
        })
        .catch(() => {
          document.body.addEventListener('click', () => {
            activeVideo.play().then(() => {
              rAF_Video = requestAnimationFrame(checkTransition);
            });
          }, { once: true });
        });
    };

    if (v1.readyState >= 1) {
      startVideo();
    } else {
      v1.addEventListener('loadedmetadata', startVideo, { once: true });
    }

    // 2. Setup Particles
    // Wait until canvas mounts
    if (!canvasRef.current) return;
    
    const renderer = new Renderer(canvasRef.current.id);
    const mouse = new MouseField();

    const ps = new ParticleSystem({
      canvasW: renderer.W,
      canvasH: renderer.H,
      initialSymbol: 'home',
      activePalette: 'white',
    });

    const mc = new MorphController(ps);

    renderer.onResize((W: number, H: number) => {
      ps.onResize(W, H, mc.currentSymbol);
    });

    // We expose a global or use a ref so nav items can trigger morphing
    // We attach it to window so local nav items can reference it easily,
    // though in React it's better to pass a callback. We will use a ref-like approach.
    (window as any)._menuMorph = (symbol: string) => mc.morphTo(symbol);

    let breathT = 0;
    let frame = 0;
    let rAF_Particles: number;

    const animateParticles = () => {
      rAF_Particles = requestAnimationFrame(animateParticles);
      frame++;
      breathT += 0.007;
      renderer.clear();
      mouse.tick(frame);
      mc.tick();
      ps.update(
        renderer.ctx,
        breathT,
        mouse.x,
        mouse.y,
        mc.isFullySettled,
        mc.isReforming
      );
    };
    animateParticles();

    return () => {
      if (rAF_Video) cancelAnimationFrame(rAF_Video);
      if (rAF_Particles) cancelAnimationFrame(rAF_Particles);
      delete (window as any)._menuMorph;
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (v1Ref.current) v1Ref.current.muted = nextMuted;
    if (v2Ref.current) v2Ref.current.muted = nextMuted;
  };

  const handleNavClick = (href: string) => {
    // Implement Next/React router push here
    window.location.href = href;
  };

  const handleNavHover = (symbol: string) => {
    if ((window as any)._menuMorph) {
      (window as any)._menuMorph(symbol);
    }
  };

  return (
    <div id="app" className="menu-container">
      <div id="video-container">
        <video id="v1" ref={v1Ref} className="bg-video" muted playsInline></video>
        <video id="v2" ref={v2Ref} className="bg-video" muted playsInline style={{ opacity: 0 }}></video>
      </div>

      <div id="menu-backdrop"></div>
      <div id="vignette"></div>
      <div id="scanlines"></div>

      {/* Give the canvas the correct ID expected by Vanilla class */}
      <canvas id="menu-canvas" ref={canvasRef}></canvas>

      <a href="/" id="back-btn">
        <svg viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </a>

      <div id="top-right-links">
        <a href="#" id="sound-link" onClick={toggleSound}>
          {isMuted ? 'SOUND' : 'MUTE'}
        </a>
      </div>

      <nav id="left-nav">
        <div
          className="nav-item"
          data-symbol="about"
          onClick={() => handleNavClick('/about')}
          onMouseEnter={() => handleNavHover('about')}
          onTouchStart={(e) => { e.preventDefault(); handleNavHover('about'); }}
        >
          <span className="nav-label">About</span>
          <div className="nav-underline"></div>
        </div>
        
        <div
          className="nav-item"
          data-symbol="structure"
          onClick={() => handleNavClick('/structure')}
          onMouseEnter={() => handleNavHover('structure')}
          onTouchStart={(e) => { e.preventDefault(); handleNavHover('structure'); }}
        >
          <span className="nav-label">Structure</span>
          <div className="nav-underline"></div>
        </div>
        
        <div
          className="nav-item active"
          data-symbol="home"
          onClick={() => handleNavClick('/flashback')}
          onMouseEnter={() => handleNavHover('home')}
          onTouchStart={(e) => { e.preventDefault(); handleNavHover('home'); }}
        >
          <span className="nav-label">Flashback</span>
          <div className="nav-underline"></div>
        </div>
        
        <div
          className="nav-item"
          data-symbol="contact"
          onClick={() => handleNavClick('/credits')}
          onMouseEnter={() => handleNavHover('contact')}
          onTouchStart={(e) => { e.preventDefault(); handleNavHover('contact'); }}
        >
          <span className="nav-label">Credits</span>
          <div className="nav-underline"></div>
        </div>
      </nav>
    </div>
  );
}

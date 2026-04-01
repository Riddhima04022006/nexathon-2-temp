import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/structure.css';

gsap.registerPlugin(ScrollTrigger);

export default function Structure() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLElement>(null);
  const roundsOuterRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  let toastTimer: number | null = null;

  const handleRegisterClick = () => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastVisible(true);
    toastTimer = window.setTimeout(() => setToastVisible(false), 2800);
  };

  useEffect(() => {
    // 1. Setup Intersection Observers for Fade-ups
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach((el) => obs.observe(el));

    // 2. Setup Three.js
    if (!canvasContainerRef.current) return;
    const canvasContainer = canvasContainerRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasContainer.clientWidth / canvasContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const spot = new THREE.PointLight(0xffffff, 20);
    spot.position.set(5, 5, 5);
    scene.add(spot);

    let falcon: THREE.Group | null = null;
    let rAF_Three: number;

    const initScrollAnimations = (loadedFalcon: THREE.Group | null) => {
      // Setup initial GSAP state
      gsap.set(".seeking", { x: -500, opacity: 0 });
      gsap.set(".talent", { x: 500, opacity: 0 });
      gsap.set(".real-tag", { opacity: 0, scale: 0.85, xPercent: -50, yPercent: -50, left: "50%", top: "50%" });
      gsap.set(".content-reveal", { visibility: "visible", opacity: 0, y: 40 });
      gsap.set(".reveal-item", { y: 20, opacity: 0 });

      // Purpose Scroll Timeline
      if (purposeRef.current) {
        const purposeTL = gsap.timeline({
          scrollTrigger: {
            trigger: purposeRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.7,
            pin: ".sticky-box",
            anticipatePin: 1,
            pinSpacing: true
          }
        });

        purposeTL
          .to(".seeking", { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
          .to(".talent", { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
          .to(".seeking", { y: -70, scale: 0.5, duration: 0.5, ease: "power2.inOut" }, 0.35)
          .to(".talent", { y: 70, scale: 0.5, webkitTextStroke: "1px rgba(255,255,255,1)", duration: 0.5, ease: "power2.inOut" }, 0.35)
          .to(".real-tag", { opacity: 1, scale: 1.1, duration: 0.5, ease: "power2.out" }, 0.35)
          .to(".heading-group", { y: "-10vh", scale: 0.8, duration: 0.45, ease: "power3.inOut" }, 0.75)
          .to(".content-reveal", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.95)
          .to(".reveal-item", { opacity: 1, y: 0, stagger: 0.15, duration: 0.4, ease: "sine.out" }, 1.1);

        if (loadedFalcon) {
          purposeTL
            .to(camera.position, { z: 0.2, y: 0, ease: "none", duration: 0.6 }, 0.2)
            .to(loadedFalcon.rotation, { y: Math.PI * 2, ease: "power2.in", duration: 0.6 }, 0.2);
        }
      }

      // Rounds Scroll Timeline
      if (roundsOuterRef.current) {
        const roundsTL = gsap.timeline({
          scrollTrigger: { 
            trigger: roundsOuterRef.current, 
            start: "top top", 
            end: "+=300%", 
            pin: true, 
            scrub: 0.6 
          }
        });
        
        gsap.set("#card-1", { className: "round-card-pinned active" });
        gsap.set("#content-1", { height: "auto", opacity: 1 });

        roundsTL
          .to({}, { duration: 0.8 })
          .to("#content-1", { height: 0, opacity: 0, duration: 0.8 })
          .to("#card-1", { className: "round-card-pinned", duration: 0.1 }, "<")
          .to("#card-2", { className: "round-card-pinned active", duration: 0.1 }, "<")
          .to("#content-2", { height: "auto", opacity: 1, duration: 0.8 }, "<")
          .to({}, { duration: 0.8 })
          .to("#content-2", { height: 0, opacity: 0, duration: 0.8 })
          .to("#card-2", { className: "round-card-pinned", duration: 0.1 }, "<")
          .to("#card-3", { className: "round-card-pinned active", duration: 0.1 }, "<")
          .to("#content-3", { height: "auto", opacity: 1, duration: 0.8 }, "<");
      }

      // Timeline Section Scroll
      if (timelineRef.current) {
        const timelineTL = gsap.timeline({
          scrollTrigger: { trigger: timelineRef.current, start: "top 60%", end: "top 10%", scrub: 1 }
        });
        const nodeOn = { backgroundColor: "#fff", borderColor: "#fff", boxShadow: "0 0 20px rgba(255,255,255,0.4)", scale: 1.1 };
        const labelOn = { color: "#fff", fontWeight: "500" };

        timelineTL
          .to("#node-reg .tl-node", nodeOn, 0).to("#node-reg .tl-label", labelOn, 0)
          .to(".tl-progress-line", { width: "25%", duration: 1 })
          .to("#node-r1 .tl-node", nodeOn).to("#node-r1 .tl-label", labelOn, "<")
          .to(".tl-progress-line", { width: "50%", duration: 1 })
          .to("#node-r2 .tl-node", nodeOn).to("#node-r2 .tl-label", labelOn, "<")
          .to(".tl-progress-line", { width: "75%", duration: 1 })
          .to("#node-r3 .tl-node", nodeOn).to("#node-r3 .tl-label", labelOn, "<")
          .to(".tl-progress-line", { width: "100%", duration: 1 })
          .to("#node-eval .tl-node", nodeOn).to("#node-eval .tl-label", labelOn, "<");
      }
    };

    const loader = new GLTFLoader();
    loader.load(
      '/models/millennium_falcon.glb', // Update path to actual public assets location
      (gltf) => {
        falcon = gltf.scene;
        const box = new THREE.Box3().setFromObject(falcon);
        const center = box.getCenter(new THREE.Vector3());
        falcon.position.sub(center);
        falcon.position.x = 3;
        falcon.scale.set(1.6, 1.6, 1.6);
        scene.add(falcon);
        initScrollAnimations(falcon);
      },
      undefined,
      () => {
        // Fallback or error: still init animations
        initScrollAnimations(null);
      }
    );

    const animate = () => {
      rAF_Three = requestAnimationFrame(animate);
      if (falcon) falcon.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      obs.disconnect();
      window.removeEventListener('resize', handleResize);
      if (rAF_Three) cancelAnimationFrame(rAF_Three);
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Cleanup Three.js
      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = '';
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="structure-container">
      <div className={`toast ${toastVisible ? 'show' : ''}`} id="toast">
        Registration is not open yet
      </div>

      <nav className="structure-nav">
        <ul className="nav-links">
          <li><a href="#purpose">About</a></li>
          <li><a href="#rounds">Rounds</a></li>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
        </ul>
      </nav>

      <main className="structure-main">
        <section className="hero">
          <div id="canvas-container" ref={canvasContainerRef}></div>
          <div className="hero-content-wrapper">
            <div className="hero-overline">A coding competition unlike any other</div>
            <h1 className="hero-title">
              Prove<br /><span className="outline">You</span><br />Code.
            </h1>
            <div className="hero-bottom">
              <p className="hero-sub">
                Nexathon separates the <strong>real engineers</strong> from the crowd. Three rounds, one leaderboard that doesn't lie. <strong>Rewarding skill, not presentation.</strong>
              </p>
              <div className="hero-right">
                <div className="hero-stats">
                  <div>
                    <div className="hero-stat-label">Duration</div>
                    <div className="hero-stat-val">95 <span style={{ fontSize: '1rem', fontWeight: 300 }}>hrs</span></div>
                  </div>
                  <div>
                    <div className="hero-stat-label">Rounds</div>
                    <div className="hero-stat-val">3</div>
                  </div>
                </div>
                <button className="register-btn" id="registerBtn" onClick={handleRegisterClick}>
                  <span>Register Here</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="purpose-wrapper" id="purpose" ref={purposeRef}>
          <div className="sticky-box">
            <div className="heading-group">
              <span className="word seeking">Seeking</span>
              <span className="real-tag">REAL</span>
              <span className="word talent">Talent</span>
            </div>
            <div className="content-reveal">
              <div className="col-left">
                <p className="desc-text">
                  We cut through the noise to find engineers who actually build. No hype, just high-performance logic and real-world impact.
                </p>
              </div>
              <div className="col-right">
                <ul className="feature-list">
                  <li className="reveal-item">
                    <h4>Pure Logic</h4>
                    <p>Rankings based on code quality and execution speed — not presentation or polished demos.</p>
                  </li>
                  <li className="reveal-item">
                    <h4>Multi-dimensional</h4>
                    <p>Speed, depth of thinking, and collaborative execution all count toward the final leaderboard.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="rounds-outer" id="rounds" ref={roundsOuterRef}>
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
                    <li>Crack problems, optimise solutions, climb fast</li>
                    <li>Real-time rankings updated as you submit</li>
                    <li>Automated judge. No bias, no grey areas</li>
                  </ul>
                </div>
              </div>
              <div className="round-card-pinned" id="card-2">
                <h3 className="round-title">Panelist Round</h3>
                <div className="round-content-wrapper" id="content-2">
                  <p className="round-subtitle">Thinking is everything.</p>
                  <ul className="round-list">
                    <li>Problem-solving approach under scrutiny</li>
                    <li>Deep technical understanding assessed</li>
                    <li>Think out loud. Defend your decisions</li>
                  </ul>
                </div>
              </div>
              <div className="round-card-pinned" id="card-3">
                <h3 className="round-title">OSS Sprint</h3>
                <div className="round-content-wrapper" id="content-3">
                  <p className="round-subtitle">From ideas to real impact.</p>
                  <ul className="round-list">
                    <li>Work on real open-source repositories</li>
                    <li>Contributions measured by quality and volume</li>
                    <li>Build, collaborate, ship. For the real world</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="timeline-section" id="timeline" ref={timelineRef}>
          <div className="timeline-header fade-up">
            <h2 className="section-heading-large">The journey<br />begins here.</h2>
          </div>
          <div className="tl-container">
            <div className="tl-track">
              <div className="tl-progress-line"></div>
              <div className="tl-item" id="node-reg">
                <div className="tl-node"></div><div className="tl-label">Registration</div>
              </div>
              <div className="tl-item" id="node-r1">
                <div className="tl-node"></div><div className="tl-label">Round 1</div>
              </div>
              <div className="tl-item" id="node-r2">
                <div className="tl-node"></div><div className="tl-label">Round 2</div>
              </div>
              <div className="tl-item" id="node-r3">
                <div className="tl-node"></div><div className="tl-label">Round 3</div>
              </div>
              <div className="tl-item" id="node-eval">
                <div className="tl-node"></div><div className="tl-label">Evaluation</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="fade-up" id="leaderboard">
            <h2 className="section-heading-large" style={{ paddingTop: 100, marginBottom: 60 }}>
              Real-time<br />rankings.
            </h2>
            <div className="lb-card">
              <div className="lb-watermark">LEADERBOARD</div>
              <div className="lb-content">
                <div>
                  <h2 className="lb-title">Track every move.</h2>
                  <p style={{ marginTop: 20, color: 'var(--muted)', maxWidth: 420, lineHeight: 1.8 }}>
                    The leaderboard goes live once Round 1 begins. Watch rankings shift second by second.
                  </p>
                </div>
                <button className="lb-btn" onClick={(e) => e.preventDefault()}>COMING SOON</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

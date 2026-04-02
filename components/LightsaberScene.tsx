'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = 0 | 1 | 2; // 0 = dark, 1 = neutral, 2 = light

interface Saber {
  group:   THREE.Group;
  bladeM:  THREE.MeshStandardMaterial;
  btnM:    THREE.MeshStandardMaterial;
  glowMs:  THREE.MeshStandardMaterial[];
  ptL:     THREE.PointLight;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SIDE_P: Record<Section, number> = { 0: 0, 1: 0.5, 2: 1 };

const LABELS: Record<Section, string> = {
  0: 'SCROLL DOWN IF YOU CHANGED YOUR MIND',
  1: ' ',
  2: 'SCROLL UP IF YOU CHANGED YOUR MIND',
};

const DOT_ACTIVE: Record<Section, string> = {
  0: 'active-dark',
  1: 'active-mid',
  2: 'active-light',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(ha: number, hb: number, t: number): THREE.Color {
  const a = new THREE.Color(ha);
  const b = new THREE.Color(hb);
  return new THREE.Color(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t,
  );
}

// ─── Saber factory ────────────────────────────────────────────────────────────
function makeSaber(): Saber {
  const group = new THREE.Group();
  const ic    = new THREE.Color(0xffffff);

  const hM = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.95, roughness: 0.14 });
  const rM = new THREE.MeshStandardMaterial({ color: 0x282828, metalness: 0.85, roughness: 0.28 });

  // Grip
  group.add(new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.14, 1.35, 28), hM));

  // Ridges
  for (let i = 0; i < 6; i++) {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.133, 0.133, 0.046, 20), rM);
    r.position.y = -0.46 + i * 0.195;
    group.add(r);
  }

  // Pommel
  const pm = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.1, 0.21, 22), hM);
  pm.position.y = -0.78;
  group.add(pm);

  // Guard ring
  const gd = new THREE.Mesh(new THREE.CylinderGeometry(0.195, 0.195, 0.065, 24), rM);
  gd.position.y = 0.72;
  group.add(gd);

  // Emitter shroud
  const es = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.118, 0.34, 22), hM);
  es.position.y = 0.9;
  group.add(es);

  // Activation button
  const btnM = new THREE.MeshStandardMaterial({
    color: ic.clone(), emissive: ic.clone(), emissiveIntensity: 2.5,
  });
  const btn = new THREE.Mesh(new THREE.SphereGeometry(0.042, 14, 14), btnM);
  btn.position.set(0.135, 0.12, 0);
  group.add(btn);

  // Blade tube
  const bladeM = new THREE.MeshStandardMaterial({
    color: ic.clone(), emissive: ic.clone(), emissiveIntensity: 3.5,
    transparent: true, opacity: 0.91, side: THREE.DoubleSide,
  });
  const blade = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.054, 5.4, 22, 1, true), bladeM);
  blade.position.y = 3.62;
  group.add(blade);

  // Blade tip
  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.043, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2),
    bladeM,
  );
  tip.position.y = 6.32;
  group.add(tip);

  // White core
  const coreM = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 6,
    transparent: true, opacity: 0.86, side: THREE.DoubleSide,
  });
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.022, 5.4, 14, 1, true), coreM);
  core.position.y = 3.62;
  group.add(core);

  // Glow halos
  const glowMs: THREE.MeshStandardMaterial[] = [];
  const halos: [number, number][] = [[0.11, 0.36], [0.2, 0.17], [0.31, 0.065]];
  halos.forEach(([rad, op]) => {
    const gm = new THREE.MeshStandardMaterial({
      color: ic.clone(), emissive: ic.clone(), emissiveIntensity: 1.2,
      transparent: true, opacity: op, side: THREE.DoubleSide, depthWrite: false,
    });
    const gh = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, 5.4, 18, 1, true), gm);
    gh.position.y = 3.62;
    group.add(gh);
    glowMs.push(gm);
  });

  // Point light
  const ptL = new THREE.PointLight(ic.clone(), 3.8, 10);
  ptL.position.y = 4.3;
  group.add(ptL);

  return { group, bladeM, btnM, glowMs, ptL };
}

function setSaberColor(saber: Saber, col: THREE.Color) {
  [saber.bladeM, saber.btnM, ...saber.glowMs].forEach((m) => {
    m.color.set(col);
    m.emissive.set(col);
  });
  saber.ptL.color.set(col);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LightsaberScene() {
  const router = useRouter();
  const canvasRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState<Section>(1);

  // Mutable refs for animation loop — no re-render needed
  const stateRef = useRef({
    targetP:  0.5,
    smoothP:  0.5,
    cooldown: false,
    section:  1 as Section,
    animId:   0,
  });

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(2, idx)) as Section;
    if (next === stateRef.current.section) return;
    stateRef.current.section = next;
    stateRef.current.targetP = SIDE_P[next];
    setCurrent(next);
  }, []);

  const tryScroll = useCallback((dir: number) => {
    if (stateRef.current.cooldown) return;
    stateRef.current.cooldown = true;
    setTimeout(() => { stateRef.current.cooldown = false; }, 800);
    goTo(stateRef.current.section + (dir > 0 ? 1 : -1));
  }, [goTo]);

  // ── Event listeners ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 4) tryScroll(e.deltaY);
    };
    let ty0: number | null = null;
    const onTouchStart = (e: TouchEvent) => { ty0 = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (ty0 === null) return;
      const dy = ty0 - e.changedTouches[0].clientY;
      ty0 = null;
      if (Math.abs(dy) >= 20) tryScroll(dy);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') tryScroll(1);
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   tryScroll(-1);
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true  });
    window.addEventListener('keydown',    onKey);

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('keydown',    onKey);
    };
  }, [tryScroll]);

  // ── Three.js setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current || !overlayRef.current) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    canvasRef.current.appendChild(renderer.domElement);

    // Scene + Camera
    const scene  = new THREE.Scene();
    const isMobileSetup = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(isMobileSetup ? 58 : 50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, isMobileSetup ? 13 : 10);

    // Stars
    const sBuf = new Float32Array(7000 * 3);
    for (let i = 0; i < sBuf.length; i++) sBuf[i] = (Math.random() - 0.5) * 200;
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sBuf, 3));
    const stars = new THREE.Points(
      sGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.11, sizeAttenuation: true }),
    );
    scene.add(stars);

    // Sabers
    const saberL = makeSaber();
    const saberR = makeSaber();
    scene.add(saberL.group);
    scene.add(saberR.group);

    // Lights
    scene.add(new THREE.AmbientLight(0x080812, 1));
    const dL = new THREE.DirectionalLight(0xffffff, 0.4);
    dL.position.set(4, 6, 5);
    scene.add(dL);

    const clock      = new THREE.Clock();
    const overlayEl  = overlayRef.current;

    // Render loop
    function animate() {
      stateRef.current.animId = requestAnimationFrame(animate);
      clock.getDelta();
      const t = clock.elapsedTime;

      // Smooth snap
      stateRef.current.smoothP = lerp(stateRef.current.smoothP, stateRef.current.targetP, 0.075);
      const p = stateRef.current.smoothP;

      // Saber colour: red → white → cyan
      const col = p <= 0.5
        ? lerpColor(0xff1111, 0xffffff, p * 2)
        : lerpColor(0xffffff, 0x00ddff, (p - 0.5) * 2);
      setSaberColor(saberL, col);
      setSaberColor(saberR, col);

      // Overlay tint
      if (p < 0.5) {
        const f = (0.5 - p) * 2;
        overlayEl.style.background = `rgba(65,0,0,${f * 0.42})`;
      } else {
        const f = (p - 0.5) * 2;
        overlayEl.style.background = `rgba(0,30,70,${f * 0.42})`;
      }

      // X formation — mobile: smaller scale, shallower angle
      const isMobile = window.innerWidth < 768;
      const drama    = Math.abs(p - 0.5) * 2;
      const angle    = lerp(isMobile ? 0.58 : 0.82, isMobile ? 0.70 : 0.96, drama);
      const hSpread  = lerp(isMobile ? 0.58 : 0.85, isMobile ? 0.78 : 1.1,  drama);
      const hiltY    = lerp(isMobile ? -4.8 : -1.5, isMobile ? -5.2 : -1.8, drama);
      const bob      = Math.sin(t * 0.45) * 0.035;
      const scale    = isMobile ? 0.72 : 1;

      saberL.group.scale.setScalar(scale);
      saberR.group.scale.setScalar(scale);

      saberL.group.position.set(-hSpread, hiltY + bob,  0.06);
      saberL.group.rotation.z =  angle;
      saberL.group.rotation.x =  0.05;

      saberR.group.position.set( hSpread, hiltY + bob, -0.06);
      saberR.group.rotation.z = -angle;
      saberR.group.rotation.x =  0.05;

      // Camera drift
      camera.position.x = Math.sin(t * 0.11) * 0.2;
      camera.position.y = Math.cos(t * 0.08) * 0.12;
      camera.lookAt(0, isMobile ? 0.6 : 1.4, 0);

      // Stars drift
      stars.rotation.y = t * 0.008;
      stars.rotation.x = t * 0.003;

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (canvasRef.current?.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ── Page / dot class helpers ────────────────────────────────────────────────
  function pageClass(idx: number) {
    if (idx === current) return 'ls-page ls-active';
    if (idx < current)   return 'ls-page ls-above';
    return 'ls-page ls-below';
  }

  function dotClass(idx: number) {
    return idx === current
      ? `ls-dot ${DOT_ACTIVE[idx as Section]}`
      : 'ls-dot';
  }

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Injected styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

        .ls-root {
          position: fixed; inset: 0;
          background: #000; color: #fff;
          font-family: 'DM Mono', monospace;
          overflow: hidden;
        }

        /* canvas layer */
        .ls-canvas { position: absolute; inset: 0; z-index: 0; }
        .ls-canvas canvas { display: block; }
        .ls-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .ls-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%);
        }

        /* pages */
        .ls-page {
          position: absolute; inset: 0; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 2rem;
          opacity: 0; pointer-events: none;
          transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1),
                      transform 0.65s cubic-bezier(0.4,0,0.2,1);
          transform: translateY(28px);
        }
        .ls-page.ls-above  { transform: translateY(-28px); }
        .ls-page.ls-active { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .ls-page.ls-below  { transform: translateY(28px); }

        /* ── dark ── */
        .ls-dark-eyebrow {
          font-family: 'DM Mono', monospace; font-weight: 400;
          font-size: clamp(0.5rem, 1.2vw, 0.75rem);
          letter-spacing: 0.6em; text-transform: uppercase;
          color: rgba(255,130,130,0.9); margin-bottom: 0.7rem;
        }
        .ls-dark-title {
          font-family: 'Bebas Neue', sans-serif; font-weight: 700;
          font-size: clamp(2rem, 7vw, 5.5rem);
          letter-spacing: 0.1em; text-transform: uppercase; line-height: 1;
          color: #ff2020;
          animation: ls-pulseR 6s ease-in-out infinite;
          overflow:hidden;
        }
          .ls-dark-title::selection{
          background-color: #ff4136; 
  color: #fff;  
  text-shadow: none;       
          }
        @keyframes ls-pulseR {
        }
        .ls-dark-rule {
          width: 160px; height: 1px; margin: 1.4rem auto;
          background: linear-gradient(90deg, transparent, #ff3333, transparent);
          box-shadow: 0 0 7px rgba(255,0,0,0.5);
        }
          .ls-dark-para::selection{
          background-color: #ff4136ff; 
  color: #fff;  
  text-shadow: none;   
          }
        .ls-dark-para {
          font-family: 'DM Mono', monospace; font-weight: 400;
          font-size: clamp(0.82rem, 1.6vw, 1.05rem);
          line-height: 1.9; letter-spacing: 0.06em;
          color: rgba(255,180,180,1);
          max-width: 580px; margin: 0 auto;
        }

        /* ── mid ── */
        .ls-mid-eyebrow {
          font-family: 'DM Mono', monospace; font-weight: 300;
          font-size: clamp(0.48rem, 1.1vw, 0.7rem);
          letter-spacing: 0.55em; text-transform: uppercase;
          color: rgba(255,255,255,0.8); margin-bottom: 0.6rem;
        }
        .ls-mid-title {
          font-family: "Bebas Neue", sans-serif; font-weight: 400;
          font-size: clamp(1.4rem, 4.5vw, 3.4rem);
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 0 20px rgba(255,255,255,0.4), 0 2px 10px rgba(0,0,0,0.9);
        }
        .ls-mid-sub {
          font-family: 'DM Mono', monospace; font-weight: 300;
          font-size: clamp(0.5rem, 1.1vw, 0.7rem);
          letter-spacing: 0.44em; text-transform: uppercase;
          color: rgba(255,255,255,0.8); margin-top: 1.1rem;
        }
        .ls-mid-bar {
          width: 1px; height: 56px; margin: 1.6rem auto 0;
          background: linear-gradient(to bottom, #ff3333, #ffffff 50%, #00ffff);
          border-radius: 1px; animation: ls-barB 2.8s ease-in-out infinite;
        }
        @keyframes ls-barB {
          0%,100% { opacity: 0.4; transform: scaleY(1); }
          50%     { opacity: 0.9; transform: scaleY(1.12); }
        }

        /* ── light ── */
        .ls-light-eyebrow {
          font-family: 'DM Mono', monospace; font-weight: 400;
          font-size: clamp(0.5rem, 1.2vw, 0.75rem);
          letter-spacing: 0.6em; text-transform: uppercase;
          color: rgba(120,220,255,0.9); margin-bottom: 0.7rem;
        }
        .ls-light-title {
          font-family: 'Bebas Neue', sans-serif; font-weight: 700;
          font-size: clamp(2rem, 7vw, 5.5rem);
          letter-spacing: 0.1em; text-transform: uppercase; line-height: 1;
          color: #00eeff;
          padding:3px;
          animation: ls-pulseC 6s ease-in-out infinite;
          overflow:hidden;
        }
        @keyframes ls-pulseC {
        }
        .ls-light-rule {
          width: 160px; height: 1px; margin: 1.4rem auto;
          background: linear-gradient(90deg, transparent, #00eeff, transparent);
          box-shadow: 0 0 7px rgba(0,220,255,0.5);
        }
        .ls-light-para {
          font-family: 'DM Mono', monospace; font-weight: 400;
          font-size: clamp(0.82rem, 1.6vw, 1.05rem);
          line-height: 1.9; letter-spacing: 0.06em;
          color: rgba(140,225,255,1);
          max-width: 580px; margin: 0 auto;
        }

        /* ── dots ── */
        .ls-dots {
          position: absolute; right: 1.8rem; top: 50%; transform: translateY(-50%);
          z-index: 30; display: flex; flex-direction: column; gap: 10px;
          pointer-events: none;
        }
        .ls-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.25);
          transition: background 0.4s, transform 0.4s, border-color 0.4s;
        }
        .ls-dot.active-dark  { background: #ff2020; border-color: #ff2020; transform: scale(1.5); box-shadow: 0 0 8px rgba(255,0,0,0.7); }
        .ls-dot.active-mid   { background: #ffffff; border-color: #fff;    transform: scale(1.5); box-shadow: 0 0 8px rgba(255,255,255,0.4); }
        .ls-dot.active-light { background: #00eeff; border-color: #00eeff; transform: scale(1.5); box-shadow: 0 0 8px rgba(0,220,255,0.7); }

        /* ── label ── */
        .ls-label {
          position: absolute; bottom: 1.4rem; left: 50%; transform: translateX(-50%);
          z-index: 30; pointer-events: none;
          font-family: 'DM Mono', monospace; font-weight: 300;
          font-size: clamp(0.45rem, 1vw, 0.65rem);
          letter-spacing: 0.5em; text-transform: uppercase;
          color: rgba(255,255,255,0.8); white-space: nowrap;
        }
      `}</style>

      <div className="ls-root">
        {/* Back button */}
        <button 
          onClick={() => router.push('/nexathon')}
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            zIndex: 50,
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '0.6rem 1.2rem',
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '4px',
            backdropFilter: 'blur(5px)',
            transition: 'background 0.3s, border-color 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
        >
          ← BACK TO ABOUT
        </button>

        {/* Three.js canvas mount point */}
        <div ref={canvasRef} className="ls-canvas" />
        <div ref={overlayRef} className="ls-overlay" />
        <div className="ls-vignette" />

        {/* ── PAGE 0: DARK SIDE ── */}
        <div className={pageClass(0)}>
          <p className="ls-dark-eyebrow">The Sith Code</p>
          <h1 className="ls-dark-title">The Dark Side</h1>
          <p className="ls-dark-eyebrow">Peace is a lie, there is only passion</p>
          <p className="ls-dark-para">
            You are the disruptor. You thrive in the 36-hour high-pressure vacuum of the arena, fueled by the desire to dominate the leaderboard. For the Sith, code is a weapon, and virality is power. Move fast, break things, and conquer the tracks.</p>
        </div>

        {/* ── PAGE 1: CHOOSE YOUR PATH ── */}
        <div className={pageClass(1)}>
          <p className="ls-mid-eyebrow">The choice is yours</p>
          <h2 className="ls-mid-title">Choose Your Path</h2>
          <p className="ls-mid-sub">↑ scroll up for dark &nbsp;·&nbsp; scroll down for light ↓</p>
          <div className="ls-mid-bar" />
        </div>

        {/* ── PAGE 2: LIGHT SIDE ── */}
        <div className={pageClass(2)}>
          <p className="ls-light-eyebrow">The Jedi Code</p>
          <h1 className="ls-light-title">The Light Side</h1>
          <p className="ls-light-eyebrow">There is no emotion, there is peace</p>
          <p className="ls-light-para">
            You build for stability, order, and the advancement of the Republic. Utilizing a rule-based scoring framework, the Light Side focuses on technical depth, precision, and solving the galaxy's most pressing challenges through clean, objective engineering.
</p>
        </div>

        {/* Navigation dots */}
        <div className="ls-dots">
          <div className={dotClass(0)} />
          <div className={dotClass(1)} />
          <div className={dotClass(2)} />
        </div>

        {/* Section label */}
        <div className="ls-label">{LABELS[current]}</div>
      </div>
    </>
  );
}
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,63902,e=>{"use strict";var t=e.i(43476),n=e.i(71645),i=e.i(89970),r=e.i(83495);i.default.registerPlugin(r.ScrollTrigger),e.s(["default",0,function(){let e=(0,n.useRef)(null),r=(0,n.useRef)(null),a=(0,n.useRef)(null),o=(0,n.useRef)(null),s=(0,n.useRef)(null),l=(0,n.useRef)(null),c=(0,n.useRef)(null),d=(0,n.useRef)(null);return(0,n.useEffect)(()=>{let t=window.innerWidth<768,n=i.default.context(()=>{let e=(e,t)=>{let n=e.getBoundingClientRect(),i=t.getBoundingClientRect();return{x:i.left+i.width/2-(n.left+n.width/2),y:i.top+i.height/2-(n.top+n.height/2),scale:i.width/n.width}};if(t)i.default.set(".sticky-target-text",{opacity:1}),i.default.set(d.current,{scaleX:1,opacity:.5}),i.default.set([a.current,o.current,s.current],{opacity:0});else{let t=i.default.timeline({scrollTrigger:{trigger:r.current,start:"top top",end:"+=800",scrub:1,pin:!0,pinSpacing:!1,invalidateOnRefresh:!0}});t.to(o.current,{opacity:0,y:80,scale:.8,duration:.3,ease:"power2.inOut"},0),t.to(a.current,{x:()=>e(a.current,l.current).x,y:()=>e(a.current,l.current).y,scale:()=>e(a.current,l.current).scale,duration:1,ease:"power3.inOut"},0),t.to(s.current,{x:()=>e(s.current,c.current).x,y:()=>e(s.current,c.current).y,scale:()=>e(s.current,c.current).scale,duration:1,ease:"power3.inOut"},0),t.to(d.current,{scaleX:1,opacity:.5,duration:.3,ease:"power2.out"},.7),t.to(".sticky-target-text",{opacity:1,duration:.2,ease:"power1.inOut"},.82),t.to([a.current,s.current],{opacity:0,duration:.2,ease:"power1.inOut"},.85)}},e);return()=>n.revert()},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
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
  flex-direction: row;       /* Forces horizontal layout */
  align-items: center;       /* Aligns the baselines vertically */
  justify-content: center;   /* Centers them horizontally */
  white-space: nowrap;       /* Prevents wrapping to a second line */
  line-height: 1;            /* Normalizes the bounding box for GSAP */
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
      `}),(0,t.jsxs)("div",{className:"page-wrapper",ref:e,children:[(0,t.jsx)("div",{className:"ambient"}),(0,t.jsxs)("div",{className:"sticky-header bg-black md:bg-none",children:[(0,t.jsxs)("div",{className:"sticky-target-text",children:[(0,t.jsx)("span",{ref:l,children:"Mission"}),(0,t.jsx)("span",{ref:c,children:"Structure"})]}),(0,t.jsx)("div",{className:"sticky-rule",ref:d})]}),(0,t.jsx)("div",{className:"hero",ref:r,children:(0,t.jsxs)("div",{className:"hero-stack",children:[(0,t.jsx)("div",{className:"huge-text align-left",ref:a,children:"Mission"}),(0,t.jsx)("div",{className:"huge-text align-center",ref:o,children:"Phase"}),(0,t.jsx)("div",{className:"huge-text align-right",ref:s,children:"Structure"})]})}),(0,t.jsxs)("div",{className:"coming-soon-section",children:[(0,t.jsxs)("h2",{className:"coming-soon-heading",children:["More Details",(0,t.jsx)("br",{}),"Coming Soon"]}),(0,t.jsx)("p",{className:"coming-soon-sub",children:"Stay tuned for updates"}),(0,t.jsx)("div",{className:"coming-soon-dot"})]})]})]})}])}]);
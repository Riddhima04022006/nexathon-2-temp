(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,50032,e=>{"use strict";var t=e.i(43476),n=e.i(71645),o=e.i(18566),i=e.i(8560),s=e.i(90072);let r={0:0,1:.5,2:1},a={0:"SCROLL DOWN IF YOU CHANGED YOUR MIND",1:" ",2:"SCROLL UP IF YOU CHANGED YOUR MIND"},l={0:"active-dark",1:"active-mid",2:"active-light"};function d(e,t,n){let o=new s.Color(e),i=new s.Color(t);return new s.Color(o.r+(i.r-o.r)*n,o.g+(i.g-o.g)*n,o.b+(i.b-o.b)*n)}function c(){let e=new s.Group,t=new s.Color(0xffffff),n=new s.MeshStandardMaterial({color:0xb0a898,metalness:.9,roughness:.2}),o=new s.MeshStandardMaterial({color:1973794,metalness:.8,roughness:.35});e.add(new s.Mesh(new s.CylinderGeometry(.115,.14,1.35,28),n));for(let t=0;t<6;t++){let n=new s.Mesh(new s.CylinderGeometry(.133,.133,.046,20),o);n.position.y=-.46+.195*t,e.add(n)}let i=new s.Mesh(new s.CylinderGeometry(.165,.1,.21,22),n);i.position.y=-.78,e.add(i);let r=new s.Mesh(new s.CylinderGeometry(.195,.195,.065,24),o);r.position.y=.72,e.add(r);let a=new s.Mesh(new s.CylinderGeometry(.098,.118,.34,22),n);a.position.y=.9,e.add(a);let l=new s.MeshStandardMaterial({color:t.clone(),emissive:t.clone(),emissiveIntensity:2.5}),d=new s.Mesh(new s.SphereGeometry(.042,14,14),l);d.position.set(.135,.12,0),e.add(d);let c=new s.MeshStandardMaterial({color:t.clone(),emissive:t.clone(),emissiveIntensity:3.5,transparent:!0,opacity:.91,side:s.DoubleSide}),m=new s.Mesh(new s.CylinderGeometry(.043,.054,5.4,22,1,!0),c);m.position.y=3.62,e.add(m);let f=new s.Mesh(new s.SphereGeometry(.043,18,9,0,2*Math.PI,0,Math.PI/2),c);f.position.y=6.32,e.add(f);let p=new s.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:6,transparent:!0,opacity:.86,side:s.DoubleSide}),h=new s.Mesh(new s.CylinderGeometry(.017,.022,5.4,14,1,!0),p);h.position.y=3.62,e.add(h);let u=[];[[.11,.36],[.2,.17],[.31,.065]].forEach(([n,o])=>{let i=new s.MeshStandardMaterial({color:t.clone(),emissive:t.clone(),emissiveIntensity:1.2,transparent:!0,opacity:o,side:s.DoubleSide,depthWrite:!1}),r=new s.Mesh(new s.CylinderGeometry(n,n,5.4,18,1,!0),i);r.position.y=3.62,e.add(r),u.push(i)});let g=new s.PointLight(t.clone(),3.8,10);return g.position.y=4.3,e.add(g),{group:e,bladeM:c,btnM:l,glowMs:u,ptL:g}}function m(e,t){[e.bladeM,e.btnM,...e.glowMs].forEach(e=>{e.color.set(t),e.emissive.set(t)}),e.ptL.color.set(t)}e.s(["default",0,function(){(0,o.useRouter)();let e=(0,n.useRef)(null),f=(0,n.useRef)(null),[p,h]=(0,n.useState)(1),u=(0,n.useRef)({targetP:.5,smoothP:.5,cooldown:!1,section:1,animId:0}),g=(0,n.useCallback)(e=>{let t=Math.max(0,Math.min(2,e));t!==u.current.section&&(u.current.section=t,u.current.targetP=r[t],h(t))},[]),w=(0,n.useCallback)(e=>{u.current.cooldown||(u.current.cooldown=!0,setTimeout(()=>{u.current.cooldown=!1},800),g(u.current.section+(e>0?1:-1)))},[g]);function b(e){return e===p?"ls-page ls-active":e<p?"ls-page ls-above":"ls-page ls-below"}function x(e){return e===p?`ls-dot ${l[e]}`:"ls-dot"}return(0,n.useEffect)(()=>{let e=e=>{e.preventDefault(),Math.abs(e.deltaY)>4&&w(e.deltaY)},t=null,n=e=>{t=e.touches[0].clientY},o=e=>{if(null===t)return;let n=t-e.changedTouches[0].clientY;t=null,Math.abs(n)>=20&&w(n)},i=e=>{("ArrowDown"===e.key||"PageDown"===e.key)&&w(1),("ArrowUp"===e.key||"PageUp"===e.key)&&w(-1)};return window.addEventListener("wheel",e,{passive:!1}),window.addEventListener("touchstart",n,{passive:!0}),window.addEventListener("touchend",o,{passive:!0}),window.addEventListener("keydown",i),()=>{window.removeEventListener("wheel",e),window.removeEventListener("touchstart",n),window.removeEventListener("touchend",o),window.removeEventListener("keydown",i)}},[w]),(0,n.useEffect)(()=>{if(!e.current||!f.current)return;let t=new i.WebGLRenderer({antialias:!0,alpha:!0});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(window.innerWidth,window.innerHeight),t.toneMapping=s.ACESFilmicToneMapping,t.toneMappingExposure=1.3,e.current.appendChild(t.domElement);let n=new s.Scene,o=window.innerWidth<768,r=new s.PerspectiveCamera(o?58:50,window.innerWidth/window.innerHeight,.1,1e3);r.position.set(0,0,o?13:10);let a=new Float32Array(21e3);for(let e=0;e<a.length;e++)a[e]=(Math.random()-.5)*200;let l=new s.BufferGeometry;l.setAttribute("position",new s.BufferAttribute(a,3));let p=new s.Points(l,new s.PointsMaterial({color:0xffffff,size:.11,sizeAttenuation:!0}));n.add(p);let h=c(),g=c();n.add(h.group),n.add(g.group),n.add(new s.AmbientLight(1710112,2.2));let w=new s.DirectionalLight(0xffffff,.4);w.position.set(4,6,5),n.add(w);let b=new s.DirectionalLight(8952268,.55);b.position.set(-5,2,-6),n.add(b);let x=new s.Clock,v=f.current;!function e(){var o,i,s,a;u.current.animId=requestAnimationFrame(e),x.getDelta();let l=x.elapsedTime;u.current.smoothP=(o=u.current.smoothP)+(u.current.targetP-o)*.075;let c=u.current.smoothP,f=c<=.5?d(0xff1111,0xffffff,2*c):d(0xffffff,56831,(c-.5)*2);m(h,f),m(g,f),c<.5?v.style.background=`rgba(65,0,0,${(.5-c)*.84})`:v.style.background=`rgba(0,30,70,${(c-.5)*.84})`;let w=window.innerWidth<768,b=2*Math.abs(c-.5),y=(i=w?.58:.82)+((w?.7:1.1)-i)*b,M=(s=w?.58:.85)+((w?.78:1.1)-s)*b,k=(a=w?-4.8:-1.5)+((w?-5.2:-1.8)-a)*b,j=.035*Math.sin(.45*l),N=w?.72:1;h.group.scale.setScalar(N),g.group.scale.setScalar(N),h.group.position.set(-M,k+j,.06),h.group.rotation.z=y,h.group.rotation.x=.05,g.group.position.set(M,k+j,-.06),g.group.rotation.z=-y,g.group.rotation.x=.05,r.position.x=.2*Math.sin(.11*l),r.position.y=.12*Math.cos(.08*l),r.lookAt(0,w?.6:1.4,0),p.rotation.y=.008*l,p.rotation.x=.003*l,t.render(n,r)}();let y=()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",y),()=>{cancelAnimationFrame(u.current.animId),window.removeEventListener("resize",y),t.dispose(),e.current?.contains(t.domElement)&&e.current.removeChild(t.domElement)}},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

        .ls-root {
          position: fixed; inset: 0;
          background: #000; color: #fff;
          font-family: 'DM Mono', monospace;
          overflow: hidden;
          /* Prevents pull-to-refresh on mobile */
          touch-action: none; 
          overscroll-behavior-y: contain;
        }

        .ls-canvas { position: absolute; inset: 0; z-index: 0; }
        .ls-canvas canvas { display: block; }
        .ls-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .ls-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%);
        }

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
          overflow:hidden;
        }
        .ls-dark-rule {
          width: 160px; height: 1px; margin: 1.4rem auto;
          background: linear-gradient(90deg, transparent, #ff3333, transparent);
          box-shadow: 0 0 7px rgba(255,0,0,0.5);
        }
        .ls-dark-para {
          font-family: 'DM Mono', monospace; font-weight: 400;
          font-size: clamp(0.82rem, 1.6vw, 1.05rem);
          line-height: 1.9; letter-spacing: 0.06em;
          color: rgba(255,180,180,1);
          max-width: 580px; margin: 0 auto;
        }

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
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          margin-top: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.8em;
          width: 90%;
        }
        .ls-mid-sub-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25em;
          line-height: 1.6;
        }
        .ls-mid-sub-choice {
          font-weight: 500;
          letter-spacing: 0.2em;
        }
        .ls-mid-sub-dark   .ls-mid-sub-choice { color: #ff4444; }
        .ls-mid-sub-light  .ls-mid-sub-choice { color: #00eeff; }
        .ls-mid-bar {
          display: inline-block;
          width: 1px; height: 56px;
          background: linear-gradient(to bottom, #ff3333, #ffffff 50%, #00ffff);
          border-radius: 1px;
          animation: ls-barB 2.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes ls-barB {
          0%,100% { opacity: 0.4; transform: scaleY(1); }
          50%     { opacity: 0.9; transform: scaleY(1.12); }
        }

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
          overflow:hidden;
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

        .ls-label {
          position: absolute; bottom: 1.4rem; left: 50%; transform: translateX(-50%);
          z-index: 30; pointer-events: none;
          font-family: 'DM Mono', monospace; font-weight: 300;
          font-size: clamp(0.45rem, 1vw, 0.65rem);
          letter-spacing: 0.5em; text-transform: uppercase;
          color: rgba(255,255,255,0.8); white-space: nowrap;
        }
      `}),(0,t.jsxs)("div",{className:"ls-root",children:[(0,t.jsx)("div",{ref:e,className:"ls-canvas"}),(0,t.jsx)("div",{ref:f,className:"ls-overlay"}),(0,t.jsx)("div",{className:"ls-vignette"}),(0,t.jsxs)("div",{className:b(0),children:[(0,t.jsx)("p",{className:"ls-dark-eyebrow",children:"The Sith Code"}),(0,t.jsx)("h1",{className:"ls-dark-title",children:"The Dark Side"}),(0,t.jsx)("p",{className:"ls-dark-eyebrow",children:"Peace is a lie, there is only passion"}),(0,t.jsx)("p",{className:"ls-dark-para",children:"You are the disruptor. You thrive in the 36-hour high-pressure vacuum of the arena, fueled by the desire to dominate the leaderboard. For the Sith, code is a weapon, and virality is power. Move fast, break things, and conquer the tracks."})]}),(0,t.jsxs)("div",{className:b(1),children:[(0,t.jsx)("p",{className:"ls-mid-eyebrow",children:"The choice is yours"}),(0,t.jsx)("h2",{className:"ls-mid-title",children:"Choose Your Path"}),(0,t.jsxs)("div",{className:"ls-mid-sub",children:[(0,t.jsxs)("span",{className:"ls-mid-sub-col ls-mid-sub-dark",children:["scroll up for",(0,t.jsx)("br",{}),(0,t.jsx)("span",{className:"ls-mid-sub-choice",children:"dark ↑"})]}),(0,t.jsx)("span",{className:"ls-mid-bar"}),(0,t.jsxs)("span",{className:"ls-mid-sub-col ls-mid-sub-light",children:["scroll down for",(0,t.jsx)("br",{}),(0,t.jsx)("span",{className:"ls-mid-sub-choice",children:"light ↓"})]})]})]}),(0,t.jsxs)("div",{className:b(2),children:[(0,t.jsx)("p",{className:"ls-light-eyebrow",children:"The Jedi Code"}),(0,t.jsx)("h1",{className:"ls-light-title",children:"The Light Side"}),(0,t.jsx)("p",{className:"ls-light-eyebrow",children:"There is no emotion, there is peace"}),(0,t.jsx)("p",{className:"ls-light-para",children:"You build for stability, order, and the advancement of the Republic. Utilizing a rule-based scoring framework, the Light Side focuses on technical depth, precision, and solving the galaxy's most pressing challenges through clean, objective engineering."})]}),(0,t.jsxs)("div",{className:"ls-dots",children:[(0,t.jsx)("div",{className:x(0)}),(0,t.jsx)("div",{className:x(1)}),(0,t.jsx)("div",{className:x(2)})]}),(0,t.jsx)("div",{className:"ls-label",children:a[p]})]})]})}])}]);
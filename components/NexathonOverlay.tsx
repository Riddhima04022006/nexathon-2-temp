"use client";

import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { syne } from '../app/layout';
import { CompanyArchive } from './Sponsors';
import {orbitronio, infiniteBeyond} from '../app/layout';

// ─── Main overlay ──────────────────────────────────────────────────────
export default function NexathonOverlay() {
  const router = useRouter();
  
  return (
    <Scroll html style={{ width: '100vw' }} >
      
      {/* Dynamic Styles for Responsive Layout */}
      <style>{`
        .responsive-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Desktop: Push to Left */
          padding: 1.5rem 9vw; /* Desktop: Add some left margin */
          box-sizing: border-box;
        }

        .responsive-card {
          max-width: 680px;
          width: 100%;
          background: rgba(0, 0, 0, 0.45); /* Blur removed */
          padding: clamp(1.5rem, 5vw, 3rem);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: left; /* Desktop: Text aligns left */
          box-sizing: border-box;
        }

        .massive-heading {
          font-family: var(--font-infinite-beyond), sans-serif;
          font-size: clamp(2.5rem, 1vw, 6.5rem); /* Desktop: HUGE headings */
          color: #fff;
          line-height: 1;
          letter-spacing: 0.0em;
          margin-bottom: 1.25rem;
          overflow:clip;
          word-spacing:-0.01rem;
        }
        

        @media (max-width: 768px) {
          .responsive-page {
            justify-content: center; /* Mobile: Center align */
            padding: 1.5rem;
          }
          .responsive-card {
            text-align: center; /* Mobile: Center text */
          }
        }
      `}</style>


      {/* Page 1 — What is Nexathon */}
      <div className="responsive-page">
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="responsive-card"
        >
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>MISSION BRIEF</p>
          <h1 className="massive-heading">What is<br/>Nexathon</h1>
          <h2 className="mb-2" style={{fontFamily: '"DM Mono", monospace'}}>THE ULTIMATE CONVERGENCE</h2>
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(209,213,219,1)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', lineHeight: 1.5 }}>
            Nexathon is an interstellar journey where innovators push the boundaries of the digital universe. More than a hackathon, it is a high-intensity engineering launchpad designed to ignite ideas, build stellar projects, and accelerate the future. Whether you are a lone rebel or part of a fleet, this is where your code becomes legendary.
          </p>
          <br />
          <button style={{ fontFamily: '"DM Mono", monospace', padding: '1rem 3rem', background: '#fff', color: '#000', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', borderRadius: '100px', cursor: 'none', boxShadow: '0 0 30px rgba(255,255,255,0.25)', transition: 'transform 0.15s ease, background 0.2s ease', marginTop: '1rem' }}
            onClick={() => router.push('/side')}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          >CHOOSE YOUR PATH</button>
        </motion.div>
      </div>

      {/* Page 2 — Past Achievements */}
      <div className="responsive-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }} viewport={{ margin: '-80px' }}
          className="responsive-card"
        >
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THE CREW</p>
          <h2 style={{fontSize:"clamp(2.5rem, 1vw, 6.5rem)" }} className="massive-heading ">Meet Our Team</h2>
          
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem', position: 'relative', cursor: 'none' }}>
            <motion.div drag="x" dragConstraints={{ right: 0, left: -700 }} style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} style={{ width: 'clamp(160px, 36vw, 240px)', height: 'clamp(100px, 22vw, 145px)', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', userSelect: 'none', pointerEvents: 'none', flexShrink: 0 }}>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>MEMBER 0{i}</span>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.2)', fontSize: '9px', marginTop: '0.4rem', textTransform: 'uppercase' }}>DATA ARCHIVE</span>
                </div>
              ))}
            </motion.div>
            <div style={{ position: 'absolute', inset: '0 0 0 auto', width: '3rem', background: 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '3rem', background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)', pointerEvents: 'none' }} />
          </div>
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.25)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '1rem' }}>← Drag to explore →</p>
        </motion.div>
      </div>

      {/* Page 3 — Contributions */}
      <div className="responsive-page">
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }} viewport={{ margin: '-80px' }}
          className="responsive-card"
        >
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THANK YOU</p>
          <h2 style={{fontSize:"clamp(2.5rem, 1vw, 6.5rem)" }} className="massive-heading">SPONSORS</h2>
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem', position: 'relative', cursor: 'none' }}>
            <motion.div drag="x" dragConstraints={{ right: 0, left: -700 }} style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}>
              {CompanyArchive().map((company) => (
                <div key={company.id} className="group" style={{ width: 'clamp(140px, 35vw, 200px)', height: 'clamp(90px, 20vw, 130px)', background: 'rgba(255, 255, 255,0.9)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', userSelect: 'none', pointerEvents: 'auto', flexShrink: 0 }}>
                  <img src={company.logoUrl} alt={company.name} className="w-[60%] h-auto max-h-[70%] object-contain grayscale transition-all duration-300 group-hover:grayscale-0 pointer-events-none" />
                </div>
              ))}
            </motion.div>
            <div style={{ position: 'absolute', inset: '0 0 0 auto', width: '3rem', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '3rem', pointerEvents: 'none' }} />
          </div>
          <br />
          <button style={{ fontFamily: '"DM Mono", monospace', padding: '1rem 3rem', background: '#fff', color: '#000', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', borderRadius: '100px', cursor: 'none', boxShadow: '0 0 30px rgba(255,255,255,0.25)', transition: 'transform 0.15s ease, background 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          >JOIN THE FLEET</button>
        </motion.div>
      </div>
    </Scroll>
  );
}
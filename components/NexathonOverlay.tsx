"use client";
import dynamic from "next/dynamic";
const Scroll = dynamic(
  () => import("@react-three/drei").then(mod => mod.Scroll),
  { ssr: false } 
);
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { syne, orbitronio, infiniteBeyond } from '../app/layout';
import Image from "next/image";

// Original Assets
import Bhuwan from "../app/(main)/nexathon/assets/Icon_Bhuwan.png";
import Devit from "../app/(main)/nexathon/assets/Icon_Devit.png";
import Dheeraj from "../app/(main)/nexathon/assets/Icon_Dheeraj.png";
import Habeeb from "../app/(main)/nexathon/assets/Icon_Habeeb.png";
import Harshit from "../app/(main)/nexathon/assets/Icon_Harshit.png";
import Medhavee from "../app/(main)/nexathon/assets/Icon_Medhavee.png";
import Moksh from "../app/(main)/nexathon/assets/Icon_Moksh.png";
import Palak from "../app/(main)/nexathon/assets/Icon_Palak.png";
import Prakhar from "../app/(main)/nexathon/assets/Icon_Prakhar.png";
import Riddhima from "../app/(main)/nexathon/assets/Icon_Riddhima.png";
import Sipra from "../app/(main)/nexathon/assets/Icon_Sipra.png";
import Vigus from "../app/(main)/nexathon/assets/Icon_Vigus.png";
import Vikram from "../app/(main)/nexathon/assets/Icon_Vikram.png";

const team = [
  { name: "Harshit", img: Harshit, role: "Co-lead" },
  { name: "Medhavee", img: Medhavee, role: "Co-lead" },
  { name: "Riddhima", img: Riddhima, role: "Web Developer & Panelist" },
  { name: "Sipra", img: Sipra, role: "Brand Designer" },
  { name: "Bhuwan", img: Bhuwan, role: "Panelist" },
  { name: "Prakhar", img: Prakhar, role: "Panelist" },
  { name: "Moksh", img: Moksh, role: "Panelist" },
  { name: "Habeeb", img: Habeeb, role: "Panelist" },
  { name: "Vikram", img: Vikram, role: "Tech Assistant" },
  { name: "Vigus", img: Vigus, role: "Content Writer" },
  { name: "Devit", img: Devit, role: "Content Writer" },
  { name: "Palak", img: Palak, role: "Social Media Manager" },
  { name: "Dheeraj", img: Dheeraj, role: "Video Editor" },
];

export default function NexathonOverlay() {
  const router = useRouter();
  const [dragWidth, setDragWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateWidth = () => {
      if (scrollRef.current && containerRef.current) {
        // We force a recalculation of the true scrollable area
        const totalWidth = scrollRef.current.scrollWidth;
        const visibleWidth = containerRef.current.offsetWidth;
        setDragWidth(totalWidth - visibleWidth);
      }
    };

    // Run immediately and after a delay to catch image rendering
    calculateWidth();
    const timer = setTimeout(calculateWidth, 1000);
    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
      clearTimeout(timer);
    };
  }, []);

  const [toast, setToast] = useState({ show: false, message: "" });
  
  return typeof window !== "undefined" ? (
  <Scroll html style={{ width: '100vw' }}>
      
      <style>{`
        .responsive-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 1.5rem 9vw;
          box-sizing: border-box;
        }

        .responsive-card {
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
          letter-spacing: 0.0em;
          margin-bottom: 1.25rem;
          overflow-wrap: break-word;
        }
        
        @media (max-width: 768px) {
          .responsive-page { justify-content: center; padding: 1rem; }
          .responsive-card { text-align: center; max-width: calc(100vw - 2rem); background: transparent; border: none; border-radius: 0; }
          .massive-heading { font-size: clamp(1.8rem, 10vw, 3rem); }
        }

        .sponsor-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: loop-sponsors 40s linear infinite;
        }

        .sponsor-track:hover { animation-play-state: paused; }

        @keyframes loop-sponsors {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.375rem)); }
        }

        .img-wrapper img {
          object-fit: cover;
          filter: grayscale(100%);
          transition: all 0.4s ease;
        }

        .team-card:hover .img-wrapper img {
          filter: grayscale(0%) !important;
          transform: scale(1.08);
        }
      `}</style>

      {/* Page 1 — Restored */}
      <div className="responsive-page">
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="responsive-card"
        >
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>MISSION BRIEF</p>
          <h1 className="massive-heading">What is<br/>Nexathon</h1>
          <h2 className="mb-2" style={{fontFamily: '"DM Mono", monospace', color: 'white'}}>THE ULTIMATE CONVERGENCE</h2>
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(209,213,219,1)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', lineHeight: 1.5 }}>
            Nexathon is an interstellar journey where innovators push the boundaries of the digital universe. More than a hackathon, it is a high-intensity engineering launchpad designed to ignite ideas, build stellar projects, and accelerate the future. Whether you are a lone rebel or part of a fleet, this is where your code becomes legendary.
          </p>
          <br />
          <button style={{ fontFamily: '"DM Mono", monospace', padding: '1rem 3rem', background: '#fff', color: '#000', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', borderRadius: '100px', cursor: 'pointer', boxShadow: '0 0 30px rgba(255,255,255,0.25)', marginTop: '1rem' }}
            onClick={() => alert("Registration isn't open yet")}
          >Register Now</button>
        </motion.div>
      </div>

      {/* Page 2 — Team (RESTORED & FIXED) */}
      <div className="responsive-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }} viewport={{ margin: '-80px' }}
          className="responsive-card"
        >
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THE CREW</p>
          <h2 className="massive-heading">Meet Our Team</h2>
          
          <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem', position: 'relative' }}>
                <motion.div
                  ref={scrollRef}
                  drag="x"
                  dragConstraints={{ right: 0, left: -dragWidth }}
                  style={{ display: 'flex', gap: '0.75rem', width: 'max-content', cursor: 'grab' }}
                  whileTap={{ cursor: 'grabbing' }}
                >
                {team.map((member, i) => (
                <div
                  key={i}
                  className="team-card"
                  style={{
                    width: 'clamp(160px, 36vw, 240px)',
                    height: 'clamp(200px, 30vw, 280px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ width: '100%', height: '75%', position: 'relative', overflow: 'hidden' }} className="img-wrapper">
                      <Image src={member.img} alt={member.name} fill draggable={false} />
                  </div>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: '#fff', fontSize: '11px', marginTop: '0.4rem', textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {member.name}
                  </span>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: '#ff3b3b', fontSize: '9px', textAlign: 'center', marginBottom: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {member.role}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.25)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '1rem' }}>← Drag to explore →</p>
        </motion.div>
      </div>

      {/* Page 3 — Sponsors (RESTORED) */}
      <div className="responsive-page">
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }} viewport={{ margin: '-80px' }}
          className="responsive-card"
        >
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THANK YOU</p>
          <h2 style={{ fontSize: "clamp(2.2rem, 1vw, 6.5rem)" }} className="massive-heading">SPONSORS</h2>
          
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem', position: 'relative' }}>
            <motion.div className="sponsor-track">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
                <div 
                  key={index} 
                  style={{ 
                    width: 'clamp(160px, 36vw, 240px)', 
                    height: 'clamp(100px, 22vw, 145px)', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    borderRadius: '0.75rem', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0 
                  }}
                >
                  <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>SPONSOR 0{i}</span>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.2)', fontSize: '9px', marginTop: '0.4rem', textTransform: 'uppercase' }}>OFFICIAL PARTNER</span>
                </div>
              ))}
            </motion.div>
          </div>
          <br />
          <button 
            style={{ fontFamily: '"DM Mono", monospace', padding: '1rem 3rem', background: '#fff', color: '#000', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', borderRadius: '100px', cursor: 'pointer', boxShadow: '0 0 30px rgba(255,255,255,0.25)' }}
            onClick={() => alert("Registration for Sponsors is not open yet")}
          >
            JOIN THE FLEET
          </button>
        </motion.div>
      </div>
    </Scroll>
  ) : null;
}
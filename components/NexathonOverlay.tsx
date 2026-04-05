"use client";
import dynamic from "next/dynamic";
const Scroll = dynamic(
  () => import("@react-three/drei").then(mod => mod.Scroll),
  { ssr: false } 
);
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from "next/image";

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
  const [activeToast, setActiveToast] = useState<{ id: string; message: string } | null>(null);

  const triggerToast = (id: string, msg: string) => {
    setActiveToast({ id, message: msg });
    setTimeout(() => setActiveToast(null), 3000);
  };

  return typeof window !== "undefined" ? (
    <Scroll html style={{ width: '100vw' }}>
      <style>{`
        .toast-popup {
          position: absolute;
          background: rgba(0, 0, 0, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 0.7rem;
          font-family: "DM Mono", monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 18px;
          white-space: nowrap;
          backdrop-filter: blur(12px);
          border-radius: 6px;
          z-index: 200;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          pointer-events: none;
        }

        @media (min-width: 769px) {
          .toast-popup {
            left: calc(100% + 15px);
            top: 50%;
            transform: translateY(-50%);
          }
        }

        @media (max-width: 768px) { 
          .toast-popup { 
            left: 50% !important;
            top: calc(100% + 20px) !important;
            transform: translateX(-50%) !important;
            width: max-content;
            max-width: 85vw;
            white-space: normal;
            text-align: center;
          }
          .btn-container {
            display: flex !important;
            justify-content: center !important;
            width: 100%;
          }
        }

        .responsive-page { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: flex-start; padding: 1.5rem 9vw; box-sizing: border-box; pointer-events: none; }
        .responsive-card { max-width: 680px; width: 100%; background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); padding: clamp(1.5rem, 5vw, 3rem); border-radius: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; position: relative; z-index: 10; pointer-events: auto; }
        .massive-heading { font-family: var(--font-infinite-beyond), sans-serif; font-size: clamp(2.5rem, 5vw, 6.5rem); color: #fff; line-height: 1; margin-bottom: 1.25rem; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .img-wrapper img {
          object-fit: cover;
          filter: grayscale(100%);
          transition: all 0.4s ease;
        }

        .team-card:hover .img-wrapper img {
          filter: grayscale(0%) !important;
          transform: scale(1.08);
        }

        .sponsor-track { display: flex; gap: 0.75rem; width: max-content; animation: loop-sponsors 40s linear infinite; }
        @keyframes loop-sponsors { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 0.375rem)); } }
      `}</style>

      <div className="responsive-page">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="responsive-card">
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>MISSION BRIEF</p>
          <h1 className="massive-heading">What is<br/>Nexathon</h1>
          <h2 className="mb-2" style={{fontFamily: '"DM Mono", monospace', color: 'white', fontSize: '1.2rem'}}>THE ULTIMATE CONVERGENCE</h2>
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(209,213,219,1)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Nexathon is an interstellar journey where innovators push the boundaries of the digital universe. More than a hackathon, it is a high-intensity engineering launchpad designed to ignite ideas, build stellar projects, and accelerate the future.
          </p>

          <div className="btn-container" style={{ position: 'relative', display: 'inline-block' }}>
            <button 
              style={{ fontFamily: '"DM Mono", monospace', padding: '1rem 3rem', background: '#fff', color: '#000', fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', borderRadius: '100px', cursor: 'pointer' }}
              onClick={() => triggerToast('reg', "Registration isn't open yet")}
            >Register Now</button>
            <AnimatePresence>
              {activeToast?.id === 'reg' && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   exit={{ opacity: 0, scale: 0.9 }} 
                   className="toast-popup"
                >
                  {activeToast.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="responsive-page">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="responsive-card">
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THE CREW</p>
          <h2 className="massive-heading">Meet Our Team</h2>
          <div className="no-scrollbar" onPointerDown={(e) => e.stopPropagation()} style={{ width: '100%', overflowX: 'auto', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '0.75rem', width: 'max-content', paddingBottom: '10px' }}>
                {team.map((member, i) => (
                <div key={i} className="team-card" style={{ width: '200px', height: '260px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{ width: '100%', height: '75%', position: 'relative' }} className="img-wrapper">
                      <Image src={member.img} alt={member.name} fill draggable={false} />
                  </div>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: '#fff', fontSize: '11px', marginTop: '0.4rem', textAlign: 'center' }}>{member.name}</span>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: '#ff3b3b', fontSize: '9px', textAlign: 'center' }}>{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="responsive-page">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="responsive-card">
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THANK YOU</p>
          <h2 className="massive-heading">SPONSORS</h2>
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem', marginBottom: '2rem' }}>
            <motion.div className="sponsor-track">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
                <div key={index} style={{ width: '200px', height: '120px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>SPONSOR 0{i}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="btn-container" style={{ position: 'relative', display: 'inline-block' }}>
            <button 
              style={{ fontFamily: '"DM Mono", monospace', padding: '1rem 3rem', background: '#fff', color: '#000', fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', borderRadius: '100px', cursor: 'pointer' }}
              onClick={() => triggerToast('spon', "Sponsor registration not open yet")}
            >JOIN THE FLEET</button>
            <AnimatePresence>
              {activeToast?.id === 'spon' && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   exit={{ opacity: 0, scale: 0.9 }} 
                   className="toast-popup"
                >
                  {activeToast.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </Scroll>
  ) : null;
}
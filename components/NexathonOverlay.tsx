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

// Assets Imports
import Bhuwan from "../app/(main)/nexathon/assets/Icon_Bhuwan.png";
import Devit from "../app/(main)/nexathon/assets/Icon_Devit.png";
import Dheeraj from "../app/(main)/nexathon/assets/Icon_Dheeraj.png";
import Habeeb from "../app/(main)/nexathon/assets/Icon_Habeeb.png";
import Harshit from "../app/(main)/nexathon/assets/Icon_Harshit.png";
import Prakul from "../app/(main)/nexathon/assets/Icon_Prakul.png";
import Gurnoor from "../app/(main)/nexathon/assets/Icon_Gurnoor.png";
import Raina from "../app/(main)/nexathon/assets/Icon_Raina.png";
import Medhavee from "../app/(main)/nexathon/assets/Icon_Medhavee2.png";
import Moksh from "../app/(main)/nexathon/assets/Icon_Moksh.png";
import Palak from "../app/(main)/nexathon/assets/Icon_Palak.png";
import Prakhar from "../app/(main)/nexathon/assets/Icon_Prakhar.png";
import Riddhima from "../app/(main)/nexathon/assets/Icon_Riddhima.png";
import Sipra from "../app/(main)/nexathon/assets/Icon_Sipra.png";
import Vigus from "../app/(main)/nexathon/assets/Icon_Vigus.png";
import Vikram from "../app/(main)/nexathon/assets/Icon_Vikram.png";

const team = [
  { name: "Prakul", img: Prakul, role: "Co Founder, NEVERON" },
  { name: "Gurnoor", img: Gurnoor, role: "Co Founder, NEVERON" },
  { name: "Medhavee", img: Medhavee, role: "Lead Organizer" },
  { name: "Harshit", img: Harshit, role: "Lead Organizer" },
  { name: "Raina", img: Raina, role: "Advisor, Partnerships and Outreach" },
  { name: "Riddhima", img: Riddhima, role: "Web Developer & Panelist" },
  { name: "Sipra", img: Sipra, role: "Brand Designer" },
  { name: "Bhuwan", img: Bhuwan, role: "Panelist" },
  { name: "Prakhar", img: Prakhar, role: "Panelist" },
  { name: "Moksh", img: Moksh, role: "Panelist" },
  { name: "Habeeb", img: Habeeb, role: "Outreach support" },
  { name: "Vikram", img: Vikram, role: "Tech Support" },
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

  const primaryButtonStyle = {
    fontFamily: '"DM Mono", monospace',
    padding: '1rem 3rem',
    background: '#fff',
    color: '#000',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
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
          .toast-popup { left: calc(100% + 15px); top: 50%; transform: translateY(-50%); }
        }

        @media (max-width: 768px) { 
          .toast-popup { left: 50% !important; top: calc(100% + 20px) !important; transform: translateX(-50%) !important; width: max-content; max-width: 85vw; text-align: center; }
          .btn-container { display: flex !important; justify-content: center !important; width: 100%; }
          .responsive-page { justify-content: center !important; padding: 1rem !important; }
        }

        .responsive-page { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: flex-start; padding: 1.5rem 9vw; box-sizing: border-box; pointer-events: none; }
        .justify-right { justify-content: flex-end; }
        .justify-center { justify-content: center; }
        
        .responsive-card { max-width: 680px; width: 100%; background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); padding: clamp(1.5rem, 5vw, 3rem); border-radius: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.1); text-align: left; position: relative; z-index: 10; pointer-events: auto; }
        .v1-card { max-width: 600px; }

        .massive-heading { font-family: var(--font-infinite-beyond), sans-serif; font-size: clamp(2.2rem, 5vw, 6.5rem); color: #fff; line-height: 1; margin-bottom: 1.25rem; }
        .sub-heading { font-family: var(--font-infinite-beyond), sans-serif; font-size: clamp(1.8rem, 4.5vw, 4.8rem); color: #fff; line-height: 1; margin-bottom: 1.25rem; text-transform: uppercase; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .img-wrapper img { object-fit: cover; filter: grayscale(100%); transition: all 0.4s ease; }
        .team-card:hover .img-wrapper img { filter: grayscale(0%) !important; transform: scale(1.08); }

        .sponsor-track { display: flex; gap: 0.75rem; width: max-content; animation: loop-sponsors 40s linear infinite; }
        @keyframes loop-sponsors { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 0.375rem)); } }
      `}</style>

      {/* SECTION 1: ABOUT */}
      <div className="responsive-page">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="responsive-card">
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>MISSION BRIEF</p>
          <h1 className="massive-heading">What is<br/>Nexathon</h1>
          <h2 className="mb-2" style={{fontFamily: '"DM Mono", monospace', color: 'white', fontSize: '1.2rem'}}>THE ULTIMATE CONVERGENCE</h2>
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(209,213,219,1)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Nexathon is an interstellar journey where innovators push the boundaries of the digital universe. More than a hackathon, it is a high-intensity engineering launchpad designed to ignite ideas, build stellar projects, and accelerate the future.
          </p>
          <div className="btn-container" style={{ position: 'relative', display: 'inline-block' }}>
            {/* Updated Button to redirect without toast */}
            <button 
              style={primaryButtonStyle} 
              onClick={() => window.open("https://discord.gg/D5Wkz9ZWs", "_blank")}
            >
              Join the Community
            </button>
          </div>
        </motion.div>
      </div>

      {/* SECTION 2: SPONSORS */}
      <div className="responsive-page justify-right">
        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="responsive-card">
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THANK YOU</p>
          <h2 className="massive-heading">Sponsors</h2>
          <div style={{ width: '100%', overflow: 'hidden', borderRadius: '0.75rem', marginBottom: '2rem' }}>
            <motion.div className="sponsor-track">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, index) => (
                <div key={index} style={{ width: '200px', height: '120px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>SPONSOR 0{i}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="btn-container">
            <button style={primaryButtonStyle} onClick={() => router.push('/nexathon/sponsors')}>Join The Fleet</button>
          </div>
        </motion.div>
      </div>

      {/* SECTION 3: NEXATHON V1 */}
      <div className="responsive-page">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="responsive-card v1-card">
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>ARCHIVES</p>
          <h2 className="sub-heading">Nexathon V1</h2>
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(209,213,219,1)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Relive the glory of our previous expeditions. Explore the projects, the people, and the moments that defined our past chapters in the digital frontier.
          </p>
          <div className="btn-container">
            <button style={primaryButtonStyle} onClick={() => router.push('/flashback')}>Enter the Vault</button>
          </div>
        </motion.div>
      </div>

      {/* SECTION 4: TEAM */}
      <div className="responsive-page justify-right">
        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="responsive-card">
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '1rem' }}>THE CREW</p>
          <h2 className="massive-heading">Meet Our Team</h2>
          <div className="no-scrollbar" onPointerDown={(e) => e.stopPropagation()} style={{ width: '100%', overflowX: 'auto', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '0.75rem', width: 'max-content', paddingBottom: '20px' }}>
              {team.map((member, i) => (
                <div key={i} className="team-card" style={{ width: 'clamp(120px, 15vw + 50px, 185px)', height: 'clamp(160px, 18vw + 60px, 240px)', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{ width: '100%', height: '75%', position: 'relative' }} className="img-wrapper">
                    <Image src={member.img} alt={member.name} fill draggable={false} />
                  </div>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: '#fff', fontSize: '11px', marginTop: '0.4rem', textAlign: 'center' }}>{member.name}</span>
                  <span style={{ fontFamily: '"DM Mono", monospace', color: '#ff3b3b', fontSize: '9px', textAlign: 'center' }}>{member.role}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button style={primaryButtonStyle} onClick={() => router.push('/nexathon/team')}>View All Members</button>
          </div>
        </motion.div>
      </div>

      {/* SECTION 5: CREDITS (PLAIN BLACK BACKGROUND) */}
      <div className="responsive-page justify-center" style={{ background: '#000000', pointerEvents: 'auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="responsive-card" 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            backdropFilter: 'none', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <p style={{ fontFamily: '"DM Mono", monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '11px', marginBottom: '1.5rem' }}>
            PROJECT ATTRIBUTIONS
          </p>
          <h2 className="sub-heading" style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            Credits
          </h2>
          <p style={{ 
            fontFamily: '"DM Mono", monospace', 
            color: 'rgba(255,255,255,0.6)', 
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', 
            lineHeight: 1.8, 
            marginBottom: '3rem', 
            maxWidth: '550px' 
          }}>
            This journey is powered by the creativity of the global developer community. 
            View the 3D artists and open-source assets that bring Nexathon to life.
          </p>
          <p style={{ 
            fontFamily: '"DM Mono", monospace', 
            color: 'rgba(255,255,255,0.6)', 
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', 
            lineHeight: 1.8, 
            marginBottom: '3rem', 
            maxWidth: '550px' 
          }}>
            Models: Death Star 2, Millennium Falcon, Imperial Shuttle - by respective creators on Sketchfab (CC BY 4.0)
          </p>
          
          <div className="btn-container">
            <button 
              style={{ 
                ...primaryButtonStyle, 
                background: 'transparent', 
                border: '1px solid rgba(255,255,255,0.8)', 
                color: '#fff',
                padding: '0.8rem 2.5rem'
              }} 
              onClick={() => router.push('/nexathon/credits')}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = '#fff'; 
                e.currentTarget.style.color = '#000'; 
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = 'transparent'; 
                e.currentTarget.style.color = '#fff'; 
              }}
            >
              Explore Credits
            </button>
          </div>
        </motion.div>
      </div>
    </Scroll>
  ) : null;
}
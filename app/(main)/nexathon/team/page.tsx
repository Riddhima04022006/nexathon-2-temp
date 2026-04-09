"use client";
import localFont from "next/font/local";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Linkedin, Instagram, Github } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { DM_Mono } from "next/font/google";

<style jsx global>{`
  html, body {
    overflow: hidden !important;
    height: 100% !important;
    width: 100% !important;
    position: fixed;
    touch-action: none; /* Mobile scroll block karne ke liye */
  }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`}</style>

const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"] });

import backgroundImage from "../assets/bg.jpeg";
import Harshit from "../assets/Harshit_Blue.png";
import Prakul from "../assets/Prakul_Blue.png";
import Gurnoor from "../assets/Gurnoor_Blue.png";
import Raina from "../assets/Raina_Blue.png";
import Medhavee from "../assets/Medhavee2_Blue.png";
import Riddhima from "../assets/Riddhima_Blue.png";
import Sipra from "../assets/Sipra_Blue.png";
import Bhuwan from "../assets/Bhuwan_Blue.png";
import Prakhar from "../assets/Prakhar_Blue.png";
import Moksh from "../assets/Moksh_Blue.png";
import Habeeb from "../assets/Habeeb_Blue.png";
import Vikram from "../assets/Vikram_Blue.png";
import Vigus from "../assets/Vigus_Blue.png";
import Devit from "../assets/Devit_Blue.png";
import Palak from "../assets/Palak_Blue.png";
import Dheeraj from "../assets/Dheeraj_Blue.png";

interface TeamMember {
  id: number; name: string; role: string; description: string; image: StaticImageData;
  linkedin?: string; instagram?: string; github?: string;
}

const ethnocentric = localFont({
  src: "../../../fonts/Ethnocentric-Regular.otf", 
  variable: "--font-ethnocentric",
});

const teamMembers: TeamMember[] = [
  { id: 1, name: "Prakul", role: "Co Founder, NEVERON", description: "Prakul anchors the operational and strategic backbone of NEVERON, bringing discipline to growth and expansion. He focuses on structuring decisions, optimizing resources, and maintaining clarity as the organization scales. His work reflects a balance of pragmatism and foresight, ensuring that execution remains controlled while ambition continues to expand.", image: Prakul, linkedin: "https://www.linkedin.com/in/prakul-bansal/" },
  { id: 2, name: "Gurnoor", role: "Co Founder, NEVERON", description: "Gurnoor drives the larger vision behind NEVERON, operating with a clear focus on building scalable systems and long-term value. He works at the intersection of strategy and execution, ensuring that ideas are not just ambitious but also structurally sound. His approach is deliberate, grounded, and oriented toward sustained impact across initiatives like Nexathon.", image: Gurnoor, linkedin: "https://www.linkedin.com/in/gurnoor-singh-khurana/" },
  { id: 3, name: "Harshit", role: "Lead Organiser", description: "As Co-Lead of Nexathon, he brings a balance of structure and ambition, ensuring ideas translate into meaningful execution. Known for his sharp thinking and adaptive approach, he thrives in high-pressure environments. His journey reflects growth shaped by experience and people, because, in his own words, “I am what you made me.”", image: Harshit, linkedin: "https://www.linkedin.com/in/harshit-harsh-528945381/", instagram: "https://www.instagram.com/harshit_hu_main/" },
  { id: 4, name: "Medhavee", role: "Lead Organiser", description: "As Lead Organiser of Nexathon, she sets high standards and focuses on what truly matters. She operates at the intersection of people, ideas, and execution, bringing structure to chaos, guiding teams through ambiguity, and turning momentum into outcomes that hold value. Her presence is reflected in Nexathon’s structure, clarity, and intent.", image: Medhavee, linkedin: "https://www.linkedin.com/in/medhavee-singh-408424317/"},
  { id: 5, name: "Raina", role: "Advisor and Outreach", description: "A multidisciplinary thinker, she works across strategy, communication, and outreach at Nexathon. With experience spanning research, education, and brand building, she focuses on keeping things simple and intentional, connecting the right people to the right opportunities, without unnecessary complexity.", image: Raina, linkedin: "https://www.linkedin.com/in/raina-bhatia-a41705243/" },
  { id: 6, name: "Riddhima", role: "Web Dev and Panelist", description: "Riddhima crafts immersive and user-friendly digital experiences that balance aesthetics with technical performance. At Nexathon, she is not only in charge of the brand's site, but also serves as a member of the panelist team where she designs tricky coding challenges that judge developers in their ability to solve real-world problems.", image: Riddhima, linkedin: "https://www.linkedin.com/in/riddhimacodes/", github:"https://github.com/Riddhima04022006" },
  { id: 7, name: "Sipra", role: "Brand Designer", description: "Sipra is a multidisciplinary designer dedicated to building visual identities that leave a lasting mark. At Nexathon, she is the Visual Design Lead, overseeing the brand's creative presence across multiple platforms. \"Design is not just about a certain look, but about conveying meaningful ideas that resonate with the target audience.\"", image: Sipra, linkedin: "https://www.linkedin.com/in/sipra-sonam" },
  { id: 8, name: "Bhuwan", role: "Panelist", description: "Bhuwan Chugh is a full-stack developer and AIML student who builds websites blending practical problem-solving with creative inspiration from movies and anime. As a Nexathon panelist, he contributed to designing hack challenges, shaping the event’s flow, structuring rounds, and developing key website assets for the hackathon.", image: Bhuwan, linkedin: "https://www.linkedin.com/in/bhuwan-chugh/", github: " https://github.com/Bhuwan-007" },
  { id: 9, name: "Prakhar", role: "Panelist", description: "Prakhar approaches question-setting with a strong emphasis on difficulty calibration and conceptual rigor. He is attentive to how problems scale across rounds, ensuring a consistent progression in challenge. His goal is to create questions that reward structured thinking and penalize shortcuts.", image: Prakhar },
  { id: 10, name: "Moksh", role: "Panelist", description: "With a methodical approach to problem design, Moksh focuses on building questions that test depth over surface-level knowledge. He prioritizes clarity, edge cases, and real-world relevance, ensuring each round filters for actual engineering ability rather than guesswork. His work reflects a bias toward precision and fairness in evaluation.", image: Moksh,linkedin: "https://www.linkedin.com/in/mokshhh/" },
  { id: 11, name: "Habeeb", role: "Outreach Support", description: "Habeeb handles outreach with a focus on building meaningful connections rather than transactional reach. He works on identifying the right partners and audiences, ensuring alignment with Nexathon’s intent. His approach is direct, strategic, and centered on long-term value.", image: Habeeb, linkedin: "https://www.linkedin.com/in/habeeb-md-faiz/" },
  { id: 12, name: "Vikram", role: "Tech Support", description: "Vikram oversees the technical backbone of Nexathon, ensuring systems are reliable, scalable, and efficient under pressure. He focuses on execution without friction, anticipating failure points before they surface. His role is defined by stability, speed, and technical precision.", image: Vikram },
  { id: 13, name: "Palak", role: "Social Media Manager", description: "Palak Arora is the Social Media Manager for Nexathon, leading its digital presence across platforms. She creates engaging content, manages online communities, and drives impactful campaigns. With a strong grasp of trends and audience behavior, she ensures the brand stays relevant while building meaningful connections.", image: Palak, instagram: "https://www.instagram.com/pal_akarora?igsh=MTRkaW1rcWF3eHRkbQ%3D%3D&utm_source=qr" },
  { id: 14, name: "Dheeraj", role: "Video Editor", description: "Dheeraj manages Nexathon’s visual and digital presence with an emphasis on clean, engaging storytelling. He focuses on creating content that captures attention quickly while staying aligned with the brand’s tone. His work balances creativity with consistency, ensuring every piece serves a purpose.", image: Dheeraj, linkedin: "https://www.linkedin.com/in/dheeraj-rajput/" },
  { id: 15, name: "Devit", role: "Content Writer", description: "Devit works on shaping Nexathon’s narrative with a clear, controlled voice. He focuses on making communication sharp and purposeful, avoiding unnecessary noise while maintaining impact. His writing is built around clarity, positioning, and ensuring that every message aligns with the larger vision.", image: Devit, linkedin: "https://www.linkedin.com/in/devit-rattan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
  { id: 16, name: "Vigus", role: "Content Writer", description: "As Content Lead at Nexathon V2, he approaches every brief with curiosity and care, believing that good content isn't just written, it's felt. Driven by a love for words and an appetite for building things that matter, he's someone who grows best in the company of people worth learning from.", image: Vigus, linkedin: "https://www.linkedin.com/in/viguspreetsingh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/vigussssssss?igsh=MTMwdDQ0MjFrbjhz" },
];

export default function TeamPage() {
  const [activeId, setActiveId] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeMember = teamMembers.find((m) => m.id === activeId) || teamMembers[0];

  const scroll = (direction: "up" | "down") => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 1024;
      const scrollAmount = 140;
      if (isMobile) {
        scrollContainerRef.current.scrollBy({ left: direction === "up" ? -scrollAmount : scrollAmount, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ top: direction === "up" ? -scrollAmount : scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <main className="fixed inset-0 w-screen h-screen bg-[#050505] text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src={backgroundImage} alt="Background" fill className="object-cover opacity-100" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="relative z-30 w-full max-w-[1400px] h-screen flex flex-col lg:flex-row px-4 lg:px-8 overflow-hidden">        <div className="w-full lg:w-[200px] flex flex-col items-start pt-10 lg:py-20 h-auto lg:h-[90vh] z-50">
          <h1 className="text-[10px] lg:text-sm font-serif font-bold tracking-[0.3em] lg:tracking-[0.4em] text-white uppercase mb-5 lg:mb-8 pl-10 lg:pl-2 whitespace-nowrap">CAST AND CREW</h1>
          <div className="flex flex-row lg:flex-col items-center gap-2 h-full w-full relative z-[100]">
            <button onClick={() => scroll("up")} className="p-1.5 lg:p-2 opacity-40 hover:opacity-100 transition-opacity z-[110] shrink-0">
              <ChevronUp className="rotate-[-90deg] lg:rotate-0" size={20} />
            </button>
            <div ref={scrollContainerRef} className="flex flex-row lg:flex-col items-center gap-4 lg:gap-8 py-2 lg:py-10 px-2 overflow-x-auto lg:overflow-y-auto no-scrollbar scroll-smooth h-full lg:max-h-[500px]">
              {teamMembers.map((m) => (
                <button key={m.id} onClick={() => setActiveId(m.id)} className={`relative shrink-0 w-10 h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 transition-all duration-500 ${activeId === m.id ? "border-cyan-500 scale-125 shadow-[0_0_20px_rgba(6,182,212,0.5)]" : "border-zinc-800 grayscale opacity-40 hover:opacity-100"}`}>
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </button>
              ))}
            </div>
            <button onClick={() => scroll("down")} className="p-1.5 lg:p-2 opacity-40 hover:opacity-100 transition-opacity z-[110] shrink-0">
              <ChevronDown className="rotate-[-90deg] lg:rotate-0" size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 relative flex flex-col items-center md:flex-row lg:items-start justify-center md:justify-start lg:pl-16">
          
          <div className="hidden md:block lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-end lg:pr-40 z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div key={activeId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.8 }} 
                className="relative w-[280px] h-[350px] md:w-[350px] md:h-[450px] md:!-translate-x-[-150px] md:-top-20 xl:w-[550px] xl:h-[650px] xl:!translate-x-24 xl:top-0 xl:translate-y-[-40px]">
                <Image src={activeMember.image} alt={activeMember.name} fill className="object-contain" priority />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex md:hidden justify-center w-full z-10">
            <AnimatePresence mode="wait">
              <motion.div key={activeId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.8 }} className="relative w-[180px] h-[200px] -mb-2">
                <Image src={activeMember.image} alt={activeMember.name} fill className="object-contain" priority />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-20 w-full flex flex-col items-center md:items-start md:pl-8 lg:pl-0 lg:mt-[180px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-xl text-center md:text-left drop-shadow-2xl px-2">
                <h2 className={`${ethnocentric.className} text-3xl md:text-4xl lg:text-7xl font-bold text-white mb-2 lg:mt-20 uppercase tracking-tighter`}>
                  <span className="relative px-2 py-0.5">{activeMember.name}</span>
                </h2>
                
                <div className="flex items-center justify-center md:justify-start gap-4 mb-3 lg:mb-8">
                  <div className="hidden md:block h-[2px] w-12 lg:w-16 bg-cyan-500" />
                  <span className="relative px-3 py-1 text-[11px] md:text-xs lg:text-lg font-mono text-cyan-400 tracking-[0.3em] uppercase font-bold" style={{ textShadow: "2px 2px 0px #083344" }}>
                    <div className="absolute inset-0 bg-black/60 -z-10 rounded-sm" />{activeMember.role}
                  </span>
                </div>

              <p className={`${dmMono.className} text-[11px] md:text-[13px] lg:text-lg text-zinc-400 bg-black/50 rounded-xl px-4 py-1.5 md:px-5 md:py-2 lg:px-10 lg:py-3 xl:pr-4 xl:mt-12 text-center md:text-left w-full lg:w-[750px] xl:w-[900px] leading-relaxed`}>
                  {activeMember.description}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-6 mt-4 md:-mt-10 lg:mt-4 relative w-full left-0 md:left-5">
                  {activeMember.linkedin && (
                    <a href={activeMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-all">
                      <Linkedin size={18} className="lg:w-6 lg:h-6" />
                    </a>
                  )}
                  
                  {activeMember.instagram && (
                    <a href={activeMember.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-pink-500 transition-all">
                      <Instagram size={18} className="lg:w-6 lg:h-6" />
                    </a>
                  )}

                  {activeMember.github && (
                    <a href={activeMember.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-slate-500 transition-all">
                      <Github size={18} className="lg:w-6 lg:h-6" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
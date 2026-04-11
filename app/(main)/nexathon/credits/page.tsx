"use client";
import React, { useEffect, useState } from 'react';

const CreditsPage: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; duration: string; delay: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 4}s`,
      delay: `${Math.random() * 4}s`,
      size: Math.random() > 0.7 ? '2px' : '1px',
      opacity: Math.random() * 0.8 + 0.1,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="credits-root min-h-screen relative overflow-hidden bg-[#05050f] py-10 px-4 text-white" style={{ fontFamily: '"DM Mono", monospace' }}>
      <style>{`
        @font-face {
          font-family: 'Ethnocentric';
          src: url('/fonts/ethnocentric.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .ethno-heading { 
          font-family: var(--font-infinite-beyond), 'Ethnocentric', sans-serif !important; 
          text-transform: uppercase;
          letter-spacing: 0.15em;
          -webkit-font-smoothing: antialiased;
        }

        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-4px)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanLine { 0%{top:0%} 100%{top:100%} }

        .star { animation: twinkle var(--d) var(--delay) infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.9s ease both; }

        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: rgba(255, 215, 0, 0.4);
          pointer-events: none;
          opacity: 0;
          z-index: 10;
        }
        .model-card {
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        
        .model-card:hover, .model-card:active {
          background-color: rgba(255, 215, 0, 0.05) !important;
          border-color: rgba(255, 215, 0, 0.4) !important;
        }

        .model-card:hover .scan-line, .model-card:active .scan-line {
          opacity: 1;
          animation: scanLine 3s linear infinite;
        }

        .credits-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        .top-row {
          display: flex;
          gap: 20px;
          align-items: stretch;
        }
        .bottom-row {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .top-row { flex-direction: column; }
          .bottom-row > div { width: 100% !important; }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div key={star.id} className="star absolute bg-white rounded-full"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size, opacity: star.opacity, ['--d' as any]: star.duration, ['--delay' as any]: star.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center mb-12 animate-fadeInUp">
        <h1 className="ethno-heading text-[22px] md:text-[34px] text-[#ffd700] leading-tight">
          Credits & Attributions
        </h1>
        <div className="w-[60px] h-[1px] bg-[#ffd700]/30 mx-auto mt-4" />
      </div>

      <div className="credits-container relative z-10 px-4 mb-10">
        <div className="top-row">
          <div className="flex-1">
            <ModelCard 
              delay="0.3s" 
              name="Imperial Nu-Class Shuttle" 
              creator="bennyboi" 
              link="https://sketchfab.com/3d-models/imperial-nu-class-attack-shuttle-ada616832fe74f68a1e1a452d0af542c"
            >
              <svg className="w-[42px] h-[42px] mb-3 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 42 42" fill="none">
                <polygon points="6,32 21,10 36,32" stroke="#ffd700" strokeWidth="1.2" fill="none"/>
                <polygon points="10,32 21,16 32,32" stroke="#ffd700" strokeWidth="0.6" fill="rgba(255,215,0,0.07)"/>
                <line x1="21" y1="10" x2="21" y2="32" stroke="#ffd700" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.4"/>
                <rect x="17" y="30" width="8" height="4" rx="1" fill="#ffd700" fillOpacity="0.4"/>
                <circle cx="21" cy="10" r="2" fill="#ffd700" fillOpacity="0.7"/>
              </svg>
            </ModelCard>
          </div>

          <div className="flex-1">
            <ModelCard 
              delay="0.2s" 
              name="Millennium Falcon" 
              creator="Johnson Martin" 
              link="https://sketchfab.com/3d-models/millennium-falcon-bd3e54ac20ff4ade8ddd8043db75c1d1"
            >
              <svg className="w-[42px] h-[42px] mb-3 animate-float" style={{ animationDelay: '0.5s' }} viewBox="0 0 42 42" fill="none">
                <ellipse cx="21" cy="22" rx="17" ry="7" stroke="#ffd700" strokeWidth="1.2"/>
                <ellipse cx="21" cy="19" rx="9" ry="5" stroke="#ffd700" strokeWidth="0.8"/>
                <rect x="12" y="20" width="5" height="4" rx="2" fill="#ffd700" fillOpacity="0.5"/>
                <circle cx="30" cy="20" r="2" stroke="#ffd700" strokeWidth="0.8"/>
                <circle cx="12" cy="20" r="2" stroke="#ffd700" strokeWidth="0.8"/>
              </svg>
            </ModelCard>
          </div>
        </div>

        <div className="bottom-row">
          <div className="w-full md:w-[49%]">
            <ModelCard 
              delay="0.1s" 
              name="Death Star 2" 
              creator="Hj.Kj" 
              link="https://sketchfab.com/3d-models/death-star-2-eadd05e23595432994b1c9fdf4471437"
              modified
            >
              <svg className="w-[42px] h-[42px] mb-3 animate-float" viewBox="0 0 42 42" fill="none">
                <circle cx="21" cy="21" r="18" stroke="#ffd700" strokeWidth="1.2"/>
                <circle cx="21" cy="21" r="10" stroke="#ffd700" strokeWidth="0.8" strokeDasharray="3 2"/>
                <circle cx="21" cy="21" r="4" fill="#ffd700" fillOpacity="0.6"/>
                <line x1="3" y1="21" x2="39" y2="21" stroke="#ffd700" strokeWidth="0.8" strokeOpacity="0.4"/>
                <circle cx="28" cy="14" r="3" stroke="#ffd700" strokeWidth="0.8"/>
              </svg>
            </ModelCard>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto animate-fadeInUp px-4" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 mt-5">
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#8a8aaa] mb-2 font-mono">Legal Notice</div>
          <p className="text-[12px] text-[#606080] leading-relaxed">
            Star Wars, the Millennium Falcon, the Death Star, and all related names, characters, and imagery are trademarks and &copy; <em className="text-[#9090b0] not-italic">Lucasfilm Ltd. / Disney.</em> This is an independent fan project - not affiliated with, endorsed by, or sponsored by Lucasfilm Ltd., Disney, or any of their affiliates. No copyright infringement is intended.
          </p>
          <p className="text-[12px] text-[#606080] leading-relaxed mt-2">
            All 3D models are sourced from Sketchfab under the <em className="text-[#9090b0] not-italic">Creative Commons Attribution 4.0 International (CC BY 4.0)</em> license and are credited to their respective creators.
          </p>
        </div>
      </div>
    </div>
  );
};

const ModelCard: React.FC<{ name: string; creator: string; link: string; delay: string; modified?: boolean; children: React.ReactNode; }> = ({ name, creator, link, delay, modified, children }) => {
  return (
    <div className="group model-card w-full h-full relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-xl p-6 animate-fadeInUp flex flex-col items-center text-center cursor-pointer" style={{ animationDelay: delay }}>
      <div className="scan-line" />
      {children}
      <div className="ethno-heading text-[15px] md:text-[17px] text-[#ffd700] mb-3 leading-tight">
        {name}
      </div>
      <div className="flex flex-col items-center mb-1">
        <span className="text-[7px] tracking-[0.3em] text-[#8a8aaa] uppercase mb-0.5 font-mono">Author</span>
        <span className="text-[13px] text-[#c8c8e8] font-medium font-mono">{creator}</span>
      </div>
      {modified && (
        <span className="text-[8px] text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/20 px-3 py-0.5 rounded uppercase tracking-[0.2em] my-2 font-mono">Modified</span>
      )}
      <a href={link} target="_blank" rel="noopener noreferrer" className={`text-[10px] text-[#ffd700] font-bold pb-0.5 transition-all font-mono uppercase ${!modified ? 'mt-3' : 'mt-1'}`}>View Asset</a>
    </div>
  );
};

export default CreditsPage;
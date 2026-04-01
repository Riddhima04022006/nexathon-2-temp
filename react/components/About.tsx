import React, { useEffect, useRef, useState } from 'react';
import '../styles/about.css';

// Ensure the model-viewer script is included in your index.html:
// <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

export default function About() {
  const shipRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const saberWrapperRef = useRef<HTMLDivElement>(null);
  const saberTopRef = useRef<HTMLDivElement>(null);
  const saberBottomRef = useRef<HTMLDivElement>(null);
  const lightDetailsRef = useRef<HTMLDivElement>(null);
  const darkDetailsRef = useRef<HTMLDivElement>(null);
  const labelLightRef = useRef<HTMLDivElement>(null);
  const labelDarkRef = useRef<HTMLDivElement>(null);

  const [isSaberMode, setIsSaberMode] = useState(false);

  useEffect(() => {
    const ship = shipRef.current;
    if (!ship) return;

    let localSaberMode = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !localSaberMode) {
            const newClass = entry.target.getAttribute('data-model') || '';
            ship.className = '';
            // Needs a timeout or rAF potentially for Web Components to react in some cases
            ship.classList.add(newClass);
            sectionsRef.current.forEach((s) => s?.classList.remove('active'));
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionsRef.current.forEach((s) => {
      if (s) observer.observe(s);
    });

    const handleScroll = () => {
      if (!saberWrapperRef.current) return;
      const wrapperRect = saberWrapperRef.current.getBoundingClientRect();
      const scrollProgress =
        -wrapperRect.top / (wrapperRect.height - window.innerHeight);

      if (wrapperRect.top < window.innerHeight / 1.5) {
        localSaberMode = true;
        setIsSaberMode(true);
        ship.classList.add('ship-hidden');
      } else {
        if (localSaberMode) {
          localSaberMode = false;
          setIsSaberMode(false);
          ship.classList.remove('ship-hidden');
          sectionsRef.current.forEach((s) => {
            if (!s) return;
            const rect = s.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight) {
              ship.className = s.getAttribute('data-model') || '';
            }
          });
        }
      }

      if (scrollProgress >= 0 && scrollProgress <= 1) {
        if (scrollProgress < 0.4) {
          if (saberTopRef.current) saberTopRef.current.className = 'saber blue';
          if (saberBottomRef.current) saberBottomRef.current.className = 'saber blue';
          labelLightRef.current?.classList.add('active');
          labelDarkRef.current?.classList.remove('active');
          lightDetailsRef.current?.classList.add('active');
          darkDetailsRef.current?.classList.remove('active');
        } else if (scrollProgress > 0.6) {
          if (saberTopRef.current) saberTopRef.current.className = 'saber red';
          if (saberBottomRef.current) saberBottomRef.current.className = 'saber red';
          labelDarkRef.current?.classList.add('active');
          labelLightRef.current?.classList.remove('active');
          darkDetailsRef.current?.classList.add('active');
          lightDetailsRef.current?.classList.remove('active');
        } else {
          if (saberTopRef.current) saberTopRef.current.className = 'saber';
          if (saberBottomRef.current) saberBottomRef.current.className = 'saber';
          labelLightRef.current?.classList.remove('active');
          labelDarkRef.current?.classList.remove('active');
          lightDetailsRef.current?.classList.remove('active');
          darkDetailsRef.current?.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="about-container">
      <nav className="about-nav">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#achievements">Achievements</a>
          <a href="#contributions">Contributions</a>
          <a href="#sponsors">Sponsors</a>
        </div>
      </nav>

      <div className="canvas-container">
        {/* @ts-ignore - model-viewer is a web component */}
        <model-viewer
          id="ship"
          ref={shipRef}
          src="/models/lambda_t-a_shuttle.glb"
          auto-rotate
          rotation-per-second="15deg"
          className="pos-hero"
        ></model-viewer>
      </div>

      <section
        id="about"
        className="align-center"
        data-model="pos-hero"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="content-card hero-card">
          <h1>WHAT IS NEXATHON</h1>
          <p className="desc">
            The ultimate convergence of technology and creativity—an interstellar journey where innovators push the boundaries of the digital universe.
          </p>
          <button className="btn btn-dark">EXPLORE MISSION</button>
        </div>
      </section>

      <section
        id="achievements"
        className="align-left"
        data-model="pos-right"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="content-card">
          <h1>PAST ACHIEVEMENTS</h1>
          <p className="desc">
            Our previous missions have achieved incredible milestones, bringing thousands of developers together to build groundbreaking solutions.
          </p>
          <button className="btn">VIEW ARCHIVE</button>
        </div>
      </section>

      <section
        id="contributions"
        className="align-right"
        data-model="pos-left"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="content-card">
          <h1>CONTRIBUTIONS</h1>
          <p className="desc">
            Every commit is a step towards the stars. Join our open-source fleet and build the core engine of decentralized tech.
          </p>
          <button className="btn">START CODING</button>
        </div>
      </section>

      <section
        id="sponsors"
        className="align-left"
        data-model="pos-right"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="content-card" style={{ maxWidth: 750 }}>
          <h1>SPONSORS</h1>
          <div className="logo-slider">
            <div className="logo-track">
              {/* Duplicate logos for infinite scroll effect */}
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="logo-item"><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" /></div>
                  <div className="logo-item"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" /></div>
                  <div className="logo-item"><img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" alt="Nvidia" /></div>
                  <div className="logo-item"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" /></div>
                  <div className="logo-item"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" /></div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className="desc">Fueled by global leaders. Join the fleet to accelerate the innovators of tomorrow.</p>
          <button className="btn">JOIN THE FLEET</button>
        </div>
      </section>

      <div id="path" className="saber-wrapper" ref={saberWrapperRef}>
        <div className="saber-sticky">
          <div id="label-light" className="side-label blue" ref={labelLightRef}>LIGHT SIDE</div>
          <div id="label-dark" className="side-label red" ref={labelDarkRef}>DARK SIDE</div>

          <div className="saber-container">
            <div className="saber" id="saber-top" ref={saberTopRef}></div>
            <div className="saber-text-center">THERE IS NO<br />NEUTRAL</div>
            <div className="saber" id="saber-bottom" ref={saberBottomRef}></div>
          </div>

          <div id="details-light" className="side-details" ref={lightDetailsRef}>This part of hackathon is logical and values stability and morality.</div>
          <div id="details-dark" className="side-details" ref={darkDetailsRef}>Take the risk responsibly to make a better move.</div>
        </div>
      </div>
    </div>
  );
}

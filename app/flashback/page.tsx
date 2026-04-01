"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Nexathon.css';

gsap.registerPlugin(ScrollTrigger);

const SPONSORS = [
  { src: './src/assets/appwrite.svg', alt: 'Appwrite' },
  { src: './src/assets/codecrafter.webp', alt: 'CodeCrafter' },
  { src: './src/assets/fft.png', alt: 'FFT' },
  { src: './src/assets/fx-header.png', alt: 'FX' },
  { src: './src/assets/sprintlogo.png', alt: 'Sprint' },
  { src: './src/assets/xyz.svg', alt: 'XYZ' },
];

export default function Nexathon() {
  const heroRef = useRef<HTMLElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  // 1. Mouse Trail Animation (Disabled on Mobile/Touch)
  useEffect(() => {
    // Prevent running on touch devices or small screens
    if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
      return;
    }

    const heroEl = heroRef.current;
    const trailEl = trailContainerRef.current;
    if (!heroEl || !trailEl) return;

    let trailIdx = 0;
    let lastMouse = { x: -999, y: -999 };
    const imageUrls = [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=70',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=70',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=70',
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (Math.hypot(x - lastMouse.x, y - lastMouse.y) < 160) return;
      lastMouse = { x, y };

      const div = document.createElement('div');
      div.className = 'trail-img';
      div.style.backgroundImage = `url(${imageUrls[trailIdx % imageUrls.length]})`;
      div.style.left = `${x - 120}px`;
      div.style.top = `${y - 105}px`;
      trailIdx++;

      trailEl.appendChild(div);

      gsap.fromTo(
        div,
        { opacity: 0, scale: 0.82 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.28,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(div, {
              opacity: 0,
              scale: 0.72,
              duration: 0.75,
              delay: 0.35,
              ease: 'power2.in',
              onComplete: () => div.remove(),
            });
          },
        }
      );
    };

    heroEl.addEventListener('mousemove', handleMouseMove);
    return () => heroEl.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Stats & Bento Fade-In Animation (Unchanged, works great)
  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      const animateCount = (el: Element) => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
        const comma = el.getAttribute('data-comma') === 'true';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            let v: string | number = dec ? obj.val.toFixed(dec) : Math.floor(obj.val);
            if (comma) v = Number(v).toLocaleString('en-IN');
            el.textContent = v + suffix;
          },
        });
      };

      gsap.set('.bento-cell', { opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to('.bento-cell', {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            onStart: () => {
              gsap.utils.toArray('.count-up').forEach((el) => animateCount(el as Element));
            },
          });
        },
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  // 3. Infinite Ticker Animation (Updated for dynamic width)
  useEffect(() => {
    const track = tickerTrackRef.current;
    if (!track) return;
    
    let x = 0;
    let animationFrameId: number;
    let totalWidth = 0;

    // Calculate the dynamic width of exactly ONE set of sponsors
    const calculateWidth = () => {
      const cards = track.querySelectorAll('.sponsor-card');
      if (cards.length > 0) {
        const singleSet = Array.from(cards).slice(0, SPONSORS.length);
        totalWidth = singleSet.reduce((acc, card) => {
          const style = window.getComputedStyle(card);
          const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
          return acc + (card as HTMLElement).offsetWidth + margin;
        }, 0);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);

    const tick = () => {
      if (totalWidth === 0) return; // Wait until width is calculated
      x -= 0.8;
      if (x <= -totalWidth) {
        x += totalWidth; // Seamless jump back
      }
      track.style.transform = `translateX(${x}px)`;
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  return (

    <>

      {/* ── HERO ── */}

      <section id="hero" ref={heroRef}>

        <div id="trail-container" ref={trailContainerRef}></div>

        <h1 className="hero-word">NEXATHON</h1>

        <p className="hero-edition">Flashback — Version 1</p>

        <div className="hero-scroll-hint">

          <div className="scroll-line"></div>

          <span>scroll</span>

        </div>

      </section>



      {/* ── STATS SECTION ── */}

      <section id="stats" ref={statsRef}>

        <div className="stats-bg-text">N1</div>



        <div className="stats-inner">

          <div className="stats-header">

            <div>

              <div className="stats-eyebrow">

                <div className="eyebrow-line"></div>

                <span className="eyebrow-text">By the numbers</span>

              </div>

              <h2 className="stats-headline">

                The impact<br />

                <span className="ghost">speaks</span><br />

                for itself.

              </h2>

            </div>

            <div className="stats-header-right">

              <p>Edition we wrapped. Real engineers showed up, real numbers followed.</p>

            </div>

          </div>



          <div className="bento">

            <div className="bento-cell">

              <div className="stat-val">

                <span className="count-up" data-target="800" data-suffix="+">0</span>

              </div>

              <div className="stat-lbl">Registrations</div>

              <div className="cell-accent"></div>

            </div>



            <div className="bento-cell">

              <div className="stat-val">

                <span className="count-up" data-target="20000" data-suffix="+" data-comma="true">0</span>

              </div>

              <div className="stat-lbl">Impressions across platforms</div>

              <div className="cell-accent"></div>

            </div>



            <div className="bento-cell">

              <div className="stat-val">

                ₹<span className="count-up" data-target="32.5" data-suffix="L" data-dec="1">0</span>

              </div>

              <div className="stat-lbl">Total partner ecosystem value</div>

              <div className="cell-accent"></div>

            </div>



            <div className="bento-cell">

              <div className="stat-val">

                ₹<span className="count-up" data-target="25" data-suffix="L+">0</span>

              </div>

              <div className="stat-lbl">In-kind partnerships</div>

              <div className="cell-accent"></div>

            </div>



            <div className="bento-cell">

              <div className="stat-val">

                ₹<span className="count-up" data-target="5" data-suffix="L">0</span>

              </div>

              <div className="stat-lbl">In-cash bonus</div>

              <div className="cell-accent"></div>

            </div>



            <div className="bento-cell">

              <div className="stat-val">

                ₹<span className="count-up" data-target="2.5" data-suffix="L+" data-dec="1">0</span>

              </div>

              <div className="stat-lbl">Direct cash funding</div>

              <div className="cell-accent"></div>

              <div className="cell-6-branding"></div>

            </div>

          </div>

        </div>

      </section>



      {/* ── SPONSORS ── */}

      <section id="sponsors">

        <div className="sponsors-header">

          <div>

            <div className="stats-eyebrow">

              <div className="eyebrow-line"></div>

              <span className="eyebrow-text">Who backed us</span>

            </div>

            <h2 className="sponsors-headline">

              Our<br />

              <span className="ghost">partners</span><br />

              &amp; sponsors.

            </h2>

          </div>

          <p className="sponsors-sub">The brands and platforms that made Edition 1 possible.</p>

        </div>



        <div className="ticker-rule"></div>

        <div className="ticker-outer">

          <div className="ticker-track" ref={tickerTrackRef}>

            {/* Render the list twice to create a seamless infinite loop */}

            {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (

              <div className="sponsor-card" key={index}>

                <img src={sponsor.src} alt={sponsor.alt} />

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* ── FOOTER ── */}

      <footer id="footer">

        <span className="footer-brand">Nexathon</span>

        <span className="footer-tag">Edition I — Flashback</span>

      </footer>

    </>

  );
}
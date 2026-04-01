import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/flashback.css';

gsap.registerPlugin(ScrollTrigger);

// Update these paths to match your actual public/asset directories
const trailImageUrls = [
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=70',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=70',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=70'
];

export default function Flashback() {
  const heroRef = useRef<HTMLElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Cursor Trail
    let trailIdx = 0;
    let lastMouse = { x: -999, y: -999 };
    const heroEl = heroRef.current;
    const trailEl = trailContainerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroEl || !trailEl) return;
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (Math.hypot(x - lastMouse.x, y - lastMouse.y) < 160) return;
      
      lastMouse = { x, y };
      const div = document.createElement('div');
      div.className = 'trail-img';
      div.style.backgroundImage = `url(${trailImageUrls[trailIdx % trailImageUrls.length]})`;
      div.style.left = (x - 120) + 'px';
      div.style.top = (y - 105) + 'px';
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
          onComplete() {
            gsap.to(div, {
              opacity: 0,
              scale: 0.72,
              duration: 0.75,
              delay: 0.35,
              ease: 'power2.in',
              onComplete: () => div.remove()
            });
          }
        }
      );
    };

    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
    }

    // 2. GSAP Count-up
    let scrollTriggerInst: globalThis.ScrollTrigger | null = null;
    const animateCount = (el: Element) => {
      const htmlEl = el as HTMLElement;
      const target = parseFloat(htmlEl.dataset.target || '0');
      const suffix = htmlEl.dataset.suffix || '';
      const dec = parseInt(htmlEl.dataset.dec || '0') || 0;
      const comma = htmlEl.dataset.comma === 'true';
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power3.out',
        onUpdate() {
          let v: string | number = dec ? obj.val.toFixed(dec) : Math.floor(obj.val);
          if (comma) v = Number(v).toLocaleString('en-IN');
          htmlEl.textContent = v + suffix;
        }
      });
    };

    gsap.set('.bento-cell', { opacity: 0, y: 28 });
    
    if (statsRef.current) {
      scrollTriggerInst = ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 70%',
        once: true,
        onEnter() {
          gsap.to('.bento-cell', {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            onStart() {
              document.querySelectorAll('.count-up').forEach(animateCount);
            }
          });
        }
      });
    }

    // 3. Ticker
    let rAF_ID: number;
    if (tickerTrackRef.current) {
      const track = tickerTrackRef.current;
      const originals = Array.from(track.children);
      originals.forEach((child) => track.appendChild(child.cloneNode(true)));
      
      // Wait a moment for layouts to settle before measuring
      setTimeout(() => {
        const totalWidth = track.scrollWidth / 2;
        let x = 0;
        const tick = () => {
          x -= 0.8;
          if (x <= -totalWidth) x = 0;
          track.style.transform = `translateX(${x}px)`;
          rAF_ID = requestAnimationFrame(tick);
        };
        tick();
      }, 100);
    }

    return () => {
      if (heroEl) heroEl.removeEventListener('mousemove', handleMouseMove);
      if (scrollTriggerInst) scrollTriggerInst.kill();
      if (rAF_ID) cancelAnimationFrame(rAF_ID);
    };
  }, []);

  return (
    <div className="flashback-container">
      <section id="hero" ref={heroRef}>
        <div id="trail-container" ref={trailContainerRef}></div>
        <h1 className="hero-word">NEXATHON</h1>
        <p className="hero-edition">Flashback &mdash; Version 1</p>
        <div className="hero-scroll-hint">
          <div className="scroll-line"></div>
          <span>scroll</span>
        </div>
      </section>

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
                &#8377;<span className="count-up" data-target="32.5" data-suffix="L" data-dec="1">0</span>
              </div>
              <div className="stat-lbl">Total partner ecosystem value</div>
              <div className="cell-accent"></div>
            </div>

            <div className="bento-cell">
              <div className="stat-val">
                &#8377;<span className="count-up" data-target="25" data-suffix="L+">0</span>
              </div>
              <div className="stat-lbl">In-kind partnerships</div>
              <div className="cell-accent"></div>
            </div>

            <div className="bento-cell">
              <div className="stat-val">
                &#8377;<span className="count-up" data-target="5" data-suffix="L">0</span>
              </div>
              <div className="stat-lbl">In-cash bonus</div>
              <div className="cell-accent"></div>
            </div>

            <div className="bento-cell">
              <div className="stat-val">
                &#8377;<span className="count-up" data-target="2.5" data-suffix="L+" data-dec="1">0</span>
              </div>
              <div className="stat-lbl">Direct cash funding</div>
              <div className="cell-accent"></div>
              <div className="cell-6-branding"></div>
            </div>
          </div>
        </div>
      </section>

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
          <div className="ticker-track" id="ticker-1" ref={tickerTrackRef}>
            <div className="sponsor-card"><img src="/assets/appwrite.svg" alt="Appwrite" /></div>
            <div className="sponsor-card"><img src="/assets/codecrafter.webp" alt="CodeCrafter" /></div>
            <div className="sponsor-card"><img src="/assets/fft.png" alt="FFT" /></div>
            <div className="sponsor-card"><img src="/assets/fx-header.png" alt="FX" /></div>
            <div className="sponsor-card"><img src="/assets/sprintlogo.png" alt="Sprint" /></div>
            <div className="sponsor-card"><img src="/assets/xyz.svg" alt="XYZ" /></div>
          </div>
        </div>
      </section>

      <footer id="footer">
        <span className="footer-brand">Nexathon</span>
        <span className="footer-tag">Edition I &mdash; Flashback</span>
      </footer>
    </div>
  );
}

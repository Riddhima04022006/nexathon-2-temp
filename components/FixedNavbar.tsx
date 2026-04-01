"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

// ─── Fixed Navbar (standalone, outside R3F) ─────────────────────────────
export default function FixedNavbar({ isNavOpen }: { isNavOpen?: boolean }) {
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [navOpacity, setNavOpacity] = useState(1);
  const [mobileHidden, setMobileHidden] = useState(false);
  const scrollElRef = useRef<HTMLElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const magnetOffsets = useRef<{ x: number; y: number }[]>([0, 0, 0].map(() => ({ x: 0, y: 0 })));
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== undefined) {
        setGlobalNavOpen(customEvent.detail);
      }
    };
    window.addEventListener('nexaMenuToggle', handleMenuToggle);
    return () => window.removeEventListener('nexaMenuToggle', handleMenuToggle);
  }, []);

  // — scroll velocity tracking for fade —
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // — mobile auto-hide timer —
  const mobileHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Find the drei ScrollControls scroll container via DOM polling
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max

    const findScrollContainer = () => {
      // drei ScrollControls creates a div with overflow-y: auto inside the canvas wrapper
      const candidates = document.querySelectorAll('[data-scroll-container], div[style*="overflow"][style*="auto"]');
      for (const el of candidates) {
        const htmlEl = el as HTMLElement;
        if (htmlEl.scrollHeight > htmlEl.clientHeight && htmlEl.closest('canvas') === null) {
          scrollElRef.current = htmlEl;
          return true;
        }
      }
      
      // Fallback: look for the specific drei scroll container pattern
      const allDivs = document.querySelectorAll('div');
      for (const div of allDivs) {
        const style = window.getComputedStyle(div);
        if (
          style.position === 'absolute' &&
          style.overflow === 'auto' &&
          div.scrollHeight > div.clientHeight + 100
        ) {
          scrollElRef.current = div as HTMLElement;
          return true;
        }
      }
      return false;
    };

    if (findScrollContainer()) return;

    const interval = setInterval(() => {
      attempts++;
      if (findScrollContainer() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // — scroll: active section + fast-scroll fade —
  useEffect(() => {
    // We need to re-poll because scrollElRef might get set after this effect runs
    const checkInterval = setInterval(() => {
      if (scrollElRef.current) {
        clearInterval(checkInterval);
        setupScrollListener(scrollElRef.current);
      }
    }, 200);

    let cleanup: (() => void) | undefined;

    function setupScrollListener(scrollEl: HTMLElement) {
      const onScroll = () => {
        const now = Date.now();
        const dt = now - lastScrollTime.current;
        const dy = Math.abs(scrollEl.scrollTop - lastScrollTop.current);
        const velocity = dy / Math.max(dt, 1);

        lastScrollTop.current = scrollEl.scrollTop;
        lastScrollTime.current = now;

        const progress = scrollEl.scrollTop / (scrollEl.scrollHeight - scrollEl.clientHeight);
        setActive(Math.round(progress * 2));

        if (velocity > 1.2) {
          setNavOpacity(0);
          if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
          fadeTimeout.current = setTimeout(() => setNavOpacity(1), 500);
        }
      };

      scrollEl.addEventListener('scroll', onScroll, { passive: true });
      cleanup = () => {
        scrollEl.removeEventListener('scroll', onScroll);
        if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      };
    }

    return () => {
      clearInterval(checkInterval);
      cleanup?.();
    };
  }, []);

  // — mobile auto-hide —
  const resetMobileHideTimer = useCallback(() => {
    setMobileHidden(false);
    if (mobileHideTimeout.current) clearTimeout(mobileHideTimeout.current);
    mobileHideTimeout.current = setTimeout(() => setMobileHidden(true), 3000);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    resetMobileHideTimer();

    const onTouch = () => resetMobileHideTimer();
    window.addEventListener('touchstart', onTouch, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouch);
      if (mobileHideTimeout.current) clearTimeout(mobileHideTimeout.current);
    };
  }, [resetMobileHideTimer]);

  // — magnetic cursor —
  useEffect(() => {
    const RADIUS = 80;
    const STRENGTH = 0.35;

    const onMouseMove = (e: MouseEvent) => {
      let changed = false;
      buttonRefs.current.forEach((btn, i) => {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          magnetOffsets.current[i] = {
            x: dx * STRENGTH * (1 - dist / RADIUS),
            y: dy * STRENGTH * (1 - dist / RADIUS),
          };
        } else {
          magnetOffsets.current[i] = { x: 0, y: 0 };
        }
        changed = true;
      });
      if (changed) forceUpdate(n => n + 1);
    };

    const onMouseLeave = () => {
      magnetOffsets.current = magnetOffsets.current.map(() => ({ x: 0, y: 0 }));
      forceUpdate(n => n + 1);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const scrollToSection = useCallback((pageIndex: number) => {
    const scrollEl = scrollElRef.current;
    if (!scrollEl) return;
    const { scrollHeight, clientHeight } = scrollEl;
    const targets = [
      0,
      scrollHeight / 2 - clientHeight / 2,
      scrollHeight - clientHeight,
    ];
    
    const start = scrollEl.scrollTop;
    const end = targets[pageIndex];
    const distance = end - start;
    const duration = 1200;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      scrollEl.scrollTop = start + distance * ease;

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
    resetMobileHideTimer();
  }, [resetMobileHideTimer]);

  const navItems = [
    { label: 'NEXATHON', page: 0 },
    { label: 'OUR TEAM', page: 1 },
    { label: 'SPONSORS', page: 2 },
  ];

  return (
    <>
      {/* Desktop */}
      <nav style={{
        position: 'fixed', left: '1.2rem', top: '50%',
        transform: 'translateY(-50%)', zIndex: 9999,
        flexDirection: 'column', gap: '2rem',
        pointerEvents: (isNavOpen || globalNavOpen) ? 'none' : 'auto',
        opacity: (isNavOpen || globalNavOpen) ? 0 : navOpacity,
        transition: 'opacity 0.4s ease',
      }} className="hidden md:flex">
        {navItems.map(({ label, page }, i) => (
          <button
            key={label}
            ref={el => { buttonRefs.current[i] = el; }}
            onClick={() => scrollToSection(page)}
            style={{
              writingMode: 'vertical-lr',
              transform: `rotate(180deg) translate(${-magnetOffsets.current[i].x}px, ${-magnetOffsets.current[i].y}px)`,
              color: active === page ? '#fff' : 'rgba(255,255,255,0.35)',
              fontFamily: '"DM Mono", monospace', fontSize: '12px',
              letterSpacing: '0.35em', textTransform: 'uppercase',
              background: 'none', border: 'none', cursor: 'none',
              transition: 'color 0.3s ease, transform 0.2s ease',
              padding: '0.25rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = active === page ? '#fff' : 'rgba(255,255,255,0.35)')}
          >{label}</button>
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', marginTop: '0.5rem' }}>
          {navItems.map(({ page }) => (
            <div key={page} onClick={() => scrollToSection(page)} style={{
              width: '2px', height: active === page ? '20px' : '6px',
              borderRadius: '2px', background: active === page ? '#fff' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease', cursor: 'none',
            }} />
          ))}
        </div>
      </nav>

      {/* Mobile */}
      <nav style={{
        position: 'fixed', bottom: '1.5rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 9999,
        flexDirection: 'row',
        pointerEvents: (isNavOpen || globalNavOpen) ? 'none' : mobileHidden ? 'none' : 'auto',
        background: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '100px', padding: '0.4rem',
        opacity: (isNavOpen || globalNavOpen) ? 0 : mobileHidden ? 0 : navOpacity,
        translate: mobileHidden ? '0 12px' : '0 0',
        transition: 'opacity 0.4s ease, translate 0.4s ease',
      }} className="flex md:hidden">
        {navItems.map(({ label, page }) => (
          <button key={label} onClick={() => scrollToSection(page)} style={{
            color: active === page ? '#000000' : 'rgba(255,255,255,0.5)',
            fontFamily: '"DM Mono", monospace', fontSize: '8px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            background: active === page ? '#fff' : 'transparent',
            border: 'none', cursor: 'none', transition: 'all 0.3s ease',
            padding: '0.5rem 0.85rem', borderRadius: '100px', whiteSpace: 'nowrap',
          }}>{label}</button>
        ))}
      </nav>

      <div style={{
        position: 'fixed', bottom: '1.5rem', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9998, pointerEvents: 'none',
        opacity: (isNavOpen || globalNavOpen) ? 0 : mobileHidden ? 0.3 : 0,
        transition: 'opacity 0.4s ease',
        fontFamily: '"DM Mono", monospace',
        fontSize: '9px', letterSpacing: '0.2em',
        color: '#fff', textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }} className="md:hidden">
        tap to restore
      </div>
    </>
  );
}

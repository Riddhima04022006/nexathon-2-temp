"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

export default function FixedNavbar({ isNavOpen }: { isNavOpen?: boolean }) {
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [navOpacity, setNavOpacity] = useState(1);
  const [mobileHidden, setMobileHidden] = useState(false);
  const scrollElRef = useRef<HTMLElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const magnetOffsets = useRef<{ x: number; y: number }[]>([0, 0, 0, 0].map(() => ({ x: 0, y: 0 })));
  const [, forceUpdate] = useState(0);

  const navItems = [
    { label: 'MISSION', page: 0 },
    { label: 'SPONSORS', page: 1 }, 
    { label: 'ARCHIVES', page: 2 },
    { label: 'CREW', page: 3 }, 
  ];

  useEffect(() => {
    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== undefined) setGlobalNavOpen(customEvent.detail);
    };
    window.addEventListener('nexaMenuToggle', handleMenuToggle);
    return () => window.removeEventListener('nexaMenuToggle', handleMenuToggle);
  }, []);

  useEffect(() => {
    let attempts = 0;
    const findScrollContainer = () => {
      const candidates = document.querySelectorAll('div[style*="overflow"][style*="auto"]');
      for (const el of candidates) {
        const htmlEl = el as HTMLElement;
        const style = window.getComputedStyle(htmlEl);
        if (htmlEl.scrollHeight > htmlEl.clientHeight && htmlEl.closest('canvas') === null && style.position === 'absolute') {
          scrollElRef.current = htmlEl;
          return true;
        }
      }
      return false;
    };
    if (findScrollContainer()) return;
    const interval = setInterval(() => {
      attempts++;
      if (findScrollContainer() || attempts >= 50) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (scrollElRef.current) {
        clearInterval(checkInterval);
        setupScrollListener(scrollElRef.current);
      }
    }, 200);

    let cleanup: (() => void) | undefined;
    function setupScrollListener(scrollEl: HTMLElement) {
      const onScroll = () => {
        const progress = scrollEl.scrollTop / (scrollEl.scrollHeight - scrollEl.clientHeight);
        setActive(Math.round(progress * (navItems.length - 1)));
      };
      scrollEl.addEventListener('scroll', onScroll, { passive: true });
      cleanup = () => scrollEl.removeEventListener('scroll', onScroll);
    }
    return () => { clearInterval(checkInterval); cleanup?.(); };
  }, [navItems.length]);

  const scrollToSection = useCallback((pageIndex: number) => {
    const scrollEl = scrollElRef.current;
    if (!scrollEl) return;
    const targetScroll = (pageIndex / (navItems.length - 1)) * (scrollEl.scrollHeight - scrollEl.clientHeight);
    
    const start = scrollEl.scrollTop;
    const distance = targetScroll - start;
    const duration = 1200;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      scrollEl.scrollTop = start + distance * ease;
      if (elapsed < duration) requestAnimationFrame(animateScroll);
    };
    requestAnimationFrame(animateScroll);
  }, [navItems.length]);

  return (
    <>
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
              transform: `rotate(180deg)`,
              color: active === page ? '#fff' : 'rgba(255,255,255,0.35)',
              fontFamily: '"DM Mono", monospace', fontSize: '10px',
              letterSpacing: '0.35em', textTransform: 'uppercase',
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'color 0.3s ease',
              padding: '0.25rem',
            }}
          >{label}</button>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', marginTop: '0.5rem' }}>
          {navItems.map(({ page }) => (
            <div key={page} onClick={() => scrollToSection(page)} style={{
              width: '2px', height: active === page ? '20px' : '6px',
              borderRadius: '2px', background: active === page ? '#fff' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }} />
          ))}
        </div>
      </nav>

      <nav style={{
        position: 'fixed', bottom: '1.5rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '100px', padding: '0.4rem',
        opacity: (isNavOpen || globalNavOpen) ? 0 : navOpacity,
        transition: 'all 0.4s ease',
      }} className="flex md:hidden">
        {navItems.map(({ label, page }) => (
          <button key={label} onClick={() => scrollToSection(page)} style={{
            color: active === page ? '#000' : 'rgba(255,255,255,0.5)',
            fontFamily: '"DM Mono", monospace', fontSize: '8px',
            background: active === page ? '#fff' : 'transparent',
            border: 'none', padding: '0.5rem 0.85rem', borderRadius: '100px',
          }}>{label}</button>
        ))}
      </nav>
    </>
  );
}
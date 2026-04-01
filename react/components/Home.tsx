import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../styles/home.css';

// Pre-load or reference your images here (or pass via props)
// Update these paths to match your actual Next/Vite public or asset directory
const imageUrls = [
  '/assets/hero-images/1.jfif',
  '/assets/hero-images/2.jfif',
  '/assets/hero-images/3.jfif',
  '/assets/hero-images/4.jfif'
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let imageIndex = 0;
    let lastMousePos = { x: 0, y: 0 };
    const threshold = 220;
    const imgWidth = 220;
    const imgHeight = 200;

    const createTrailImage = (x: number, y: number) => {
      if (!containerRef.current || imageUrls.length === 0) return;

      const img = document.createElement('div');
      img.className = 'trail-image';
      // In a real project you'd ensure imageUrls point to actual paths
      img.style.backgroundImage = `url(${imageUrls[imageIndex]})`;
      imageIndex = (imageIndex + 1) % imageUrls.length;

      const offsetX = imgWidth / 2;
      const offsetY = imgHeight / 2;

      gsap.set(img, {
        x: x - offsetX,
        y: y - offsetY,
        scale: 0.8,
        opacity: 0
      });

      containerRef.current.appendChild(img);

      const tl = gsap.timeline();
      tl.to(img, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(img, {
        opacity: 0,
        scale: 0.7,
        duration: 0.8,
        delay: 0.2,
        onComplete: () => img.remove()
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.hypot(
        e.clientX - lastMousePos.x,
        e.clientY - lastMousePos.y
      );

      if (distance > threshold) {
        createTrailImage(e.clientX, e.clientY);
        lastMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleBegin = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to([appRef.current, ".trail-image"], {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        // Trigger your routing logic here (e.g. useNavigate, router.push)
        window.location.href = '/menu';
      }
    });
  };

  return (
    <div id="app" ref={appRef} className="home-container">
      <h1 className="heading">NEXATHON</h1>
      <button id="begin-btn" onClick={handleBegin}>
        <span>Begin</span>
      </button>
      <div id="image-container" ref={containerRef}></div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

interface FloatingItem {
  type: "image" | "quote";
  top: number;
  left: number;
  rotate: number;
  zIndex: number;
  src?: string;
  imgW?: number;
  imgH?: number;
  caption?: string;
  quoteText?: string;
  accentColor?: string;
}

interface Slide {
  id: number;
  bg: string;
  accentColor: string;
  items: FloatingItem[];
}

const slides: Slide[] = [
  {
    id: 1,
    bg: "#6b7c68",
    accentColor: "#d4e84a",
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", imgW: 380, imgH: 480, top: 10, left: 28, rotate: -1.2, zIndex: 1, caption: "GRINDELWALD · 2024" },
      { type: "image", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80", imgW: 195, imgH: 250, top: 6, left: 3, rotate: 0.8, zIndex: 2, caption: "ALPS, 2023" },
      { type: "image", src: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=500&q=80", imgW: 200, imgH: 240, top: 52, left: 3, rotate: -1.5, zIndex: 2, caption: "SUMMIT TRAIL" },
      { type: "quote", top: 14, left: 36, rotate: 0, zIndex: 4, quoteText: "It doesn't matter\nwhere you start, it's\nhow you reach the\ntop from there.", accentColor: "#d4e84a" },
      { type: "image", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80", imgW: 210, imgH: 260, top: 8, left: 72, rotate: 1.5, zIndex: 2, caption: "WINTER BASIN · 2024" },
      { type: "image", src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=700&q=80", imgW: 300, imgH: 340, top: 40, left: 66, rotate: -0.8, zIndex: 1, caption: "BRITISH PEAKS · 2025" },
    ],
  },
  {
    id: 2,
    bg: "#5c4a3a",
    accentColor: "#f0c060",
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80", imgW: 360, imgH: 460, top: 12, left: 28, rotate: 1, zIndex: 1, caption: "ERG CHEBBI · 2023" },
      { type: "image", src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&q=80", imgW: 190, imgH: 240, top: 8, left: 2, rotate: -2, zIndex: 2, caption: "SAHARA, MOROCCO" },
      { type: "image", src: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=500&q=80", imgW: 200, imgH: 210, top: 55, left: 5, rotate: 1.5, zIndex: 2, caption: "CAMEL TRAIL" },
      { type: "quote", top: 13, left: 36, rotate: 0, zIndex: 4, quoteText: "The desert doesn't\ncare who you are.\nOnly that you kept\nmoving forward.", accentColor: "#f0c060" },
      { type: "image", src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=500&q=80", imgW: 215, imgH: 255, top: 7, left: 70, rotate: -1.8, zIndex: 2, caption: "DUSK DUNES · 2023" },
      { type: "image", src: "https://images.unsplash.com/photo-1531888264952-524a9570e4b5?w=700&q=80", imgW: 290, imgH: 320, top: 42, left: 65, rotate: 1.2, zIndex: 1, caption: "OASIS BASIN · 2023" },
    ],
  },
  {
    id: 3,
    bg: "#2a4a5a",
    accentColor: "#4fd8de",
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80", imgW: 370, imgH: 460, top: 11, left: 28, rotate: -1, zIndex: 1, caption: "NORTH MALÉ · 2024" },
      { type: "image", src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80", imgW: 200, imgH: 250, top: 6, left: 2, rotate: 1.5, zIndex: 2, caption: "REEF DIVE" },
      { type: "image", src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=500&q=80", imgW: 190, imgH: 220, top: 56, left: 4, rotate: -2, zIndex: 2, caption: "MALDIVES, 2024" },
      { type: "quote", top: 12, left: 35, rotate: 0, zIndex: 4, quoteText: "Depth isn't just\nfound in the ocean.\nSometimes you dive\nto find yourself.", accentColor: "#4fd8de" },
      { type: "image", src: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=500&q=80", imgW: 205, imgH: 255, top: 8, left: 71, rotate: 2, zIndex: 2, caption: "LAGOON LIGHT · 2024" },
      { type: "image", src: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=700&q=80", imgW: 295, imgH: 330, top: 41, left: 65, rotate: -1.3, zIndex: 1, caption: "ATOLL BASIN · 2024" },
    ],
  },
  {
    id: 4,
    bg: "#2d4035",
    accentColor: "#88e0a0",
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80", imgW: 375, imgH: 465, top: 10, left: 28, rotate: 0.8, zIndex: 1, caption: "HOH RAINFOREST · 2023" },
      { type: "image", src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80", imgW: 195, imgH: 245, top: 7, left: 2, rotate: -1.2, zIndex: 2, caption: "OLD GROWTH" },
      { type: "image", src: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=500&q=80", imgW: 200, imgH: 230, top: 54, left: 3, rotate: 2, zIndex: 2, caption: "OREGON, 2023" },
      { type: "quote", top: 12, left: 34, rotate: 0, zIndex: 4, quoteText: "Trees don't rush\nto reach the light.\nThey simply grow\ntoward it, always.", accentColor: "#88e0a0" },
      { type: "image", src: "https://images.unsplash.com/photo-1511497584788-876760111969?w=500&q=80", imgW: 210, imgH: 260, top: 9, left: 71, rotate: -1.5, zIndex: 2, caption: "FOREST CANOPY · 2023" },
      { type: "image", src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=700&q=80", imgW: 300, imgH: 335, top: 42, left: 65, rotate: 0.9, zIndex: 1, caption: "MOSSY TRAIL · 2023" },
    ],
  },
  {
    id: 5,
    bg: "#3a3550",
    accentColor: "#c0b0f0",
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=80", imgW: 365, imgH: 455, top: 11, left: 29, rotate: -0.8, zIndex: 1, caption: "FIORDLAND · 2024" },
      { type: "image", src: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=500&q=80", imgW: 195, imgH: 245, top: 7, left: 3, rotate: 1.8, zIndex: 2, caption: "MILFORD SOUND" },
      { type: "image", src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=80", imgW: 200, imgH: 235, top: 55, left: 4, rotate: -1.8, zIndex: 2, caption: "NEW ZEALAND, 2024" },
      { type: "quote", top: 13, left: 35, rotate: 0, zIndex: 4, quoteText: "Clouds don't ask\nfor permission to\nform. Neither should\nyour ambitions.", accentColor: "#c0b0f0" },
      { type: "image", src: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=500&q=80", imgW: 208, imgH: 258, top: 8, left: 71, rotate: 1.6, zIndex: 2, caption: "ALPINE LAKE · 2024" },
      { type: "image", src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=700&q=80", imgW: 295, imgH: 330, top: 41, left: 65, rotate: -0.9, zIndex: 1, caption: "SOUTH ISLAND · 2024" },
    ],
  },
  {
    id: 6,
    bg: "#1a2a3a",
    accentColor: "#80f0c0",
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=80", imgW: 370, imgH: 460, top: 10, left: 28, rotate: 1.3, zIndex: 1, caption: "JÖKULSÁRLÓN · 2023" },
      { type: "image", src: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=500&q=80", imgW: 195, imgH: 248, top: 6, left: 2, rotate: -1.5, zIndex: 2, caption: "AURORA SEASON" },
      { type: "image", src: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=500&q=80", imgW: 200, imgH: 235, top: 54, left: 3, rotate: 1.8, zIndex: 2, caption: "ICELAND, 2023" },
      { type: "quote", top: 11, left: 34, rotate: 0, zIndex: 4, quoteText: "The light finds\nyou even at the\nedge of the world,\nif you wait for it.", accentColor: "#80f0c0" },
      { type: "image", src: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=500&q=80", imgW: 210, imgH: 260, top: 7, left: 71, rotate: -2, zIndex: 2, caption: "GLACIER WALK · 2023" },
      { type: "image", src: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=700&q=80", imgW: 295, imgH: 330, top: 42, left: 65, rotate: 1, zIndex: 1, caption: "NORTHERN LIGHTS · 2023" },
    ],
  },
];

const SLIDE_COUNT = slides.length;

export default function HorizontalScrollGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [winH, setWinH] = useState(0);
  const [winW, setWinW] = useState(0);

  useEffect(() => {
    const update = () => {
      setWinH(window.innerHeight);
      setWinW(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The wrapper is (SLIDE_COUNT * 100vh) tall so each slide gets 1 full viewport of scroll
  const totalScrollable = winH * SLIDE_COUNT; // wrapper height
  const stickyScrollable = totalScrollable - winH; // how much we actually scroll
  const wrapperTop = wrapperRef.current?.offsetTop ?? 0;

  const scrolledIntoWrapper = scrollY - wrapperTop;
  const rawProgress = winH > 0 ? scrolledIntoWrapper / stickyScrollable : 0;
  const progress = Math.max(0, Math.min(1, rawProgress));

  const translateX = progress * winW * (SLIDE_COUNT - 1);
  const activeIndex = Math.round(progress * (SLIDE_COUNT - 1));

  const renderItem = (item: FloatingItem, idx: number) => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      top: `${item.top}%`,
      left: `${item.left}%`,
      transform: `rotate(${item.rotate}deg)`,
      zIndex: item.zIndex,
    };

    if (item.type === "image") {
      return (
        <div key={idx} className="hs-img-wrap" style={{ ...baseStyle, width: item.imgW, height: (item.imgH ?? 0) + 22 }}>
          <div className="hs-img-inner" style={{ width: "100%", height: item.imgH }}>
            <img src={item.src} alt={item.caption || ""} loading="lazy" />
          </div>
          {item.caption && <span className="hs-caption">{item.caption}</span>}
        </div>
      );
    }

    if (item.type === "quote") {
      return (
        <div key={idx} className="hs-quote" style={{ ...baseStyle, "--accent": item.accentColor } as React.CSSProperties}>
          <p className="hs-quote-text">{item.quoteText}</p>
          <div className="hs-quote-line" style={{ background: item.accentColor }} />
        </div>
      );
    }

    return null;
  };
  useEffect(() => {
    // This script walks up the DOM tree and logs any element that is breaking position: sticky
    let parent = wrapperRef.current?.parentElement;
    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflows = [style.overflow, style.overflowX, style.overflowY];
      
      if (overflows.some(o => ['hidden', 'auto', 'scroll'].includes(o))) {
        console.error(
          '🚨 FOUND THE ELEMENT BREAKING STICKY SCROLL:', 
          parent, 
          '\nChange its overflow to "visible" or "clip"!'
        );
      }
      parent = parent.parentElement;
    }
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@400;500;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: auto; }
        
        body { background: #111; 
    overflow-x: clip; 
    max-width: 100vw; }

        /* HERO */
        .hs-hero {
          position: relative;
          height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: #111;
          text-align: center; padding: 2rem; overflow: hidden;
        }
        .hs-hero::before {
          content:''; position:absolute; inset:0;
          background: radial-gradient(ellipse 80% 60% at 50% 55%, rgba(212,232,74,0.07) 0%, transparent 70%);
          pointer-events:none;
        }
        .hs-hero-eyebrow {
          font-family:'Syne',sans-serif; font-size:.62rem;
          letter-spacing:.45em; text-transform:uppercase;
          color:rgba(255,255,255,.3); margin-bottom:1.8rem;
        }
        .hs-hero-title {
          font-family:'Cormorant Garamond',serif; font-weight:300;
          font-size:clamp(3.5rem,9vw,8.5rem); color:#f0ece4;
          line-height:.95; margin-bottom:2rem;
        }
        .hs-hero-title em { font-style:italic; color:#d4e84a; }
        .hs-hero-sub {
          font-family:'Syne',sans-serif; font-size:.68rem;
          letter-spacing:.25em; color:rgba(240,236,228,.3); text-transform:uppercase;
        }
        .hs-cue {
          position:absolute; bottom:2.5rem; left:50%;
          transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:.5rem;
          animation: cueBounce 2.2s ease-in-out infinite;
        }
        .hs-cue-line { width:1px; height:38px; background:linear-gradient(to bottom,transparent,rgba(212,232,74,.55)); }
        .hs-cue-label {
          font-family:'Syne',sans-serif; font-size:.58rem;
          letter-spacing:.22em; color:rgba(240,236,228,.28); text-transform:uppercase;
        }
        @keyframes cueBounce {
          0%,100%{opacity:.5;transform:translateX(-50%) translateY(0)}
          50%{opacity:1;transform:translateX(-50%) translateY(7px)}
        }

        /* SCROLL WRAPPER — tall enough to give each slide a full viewport of scroll travel */
        .hs-wrapper {
          position: relative;
          /* SLIDE_COUNT viewports tall so sticky has room */
          height: calc(${SLIDE_COUNT} * 100vh);
        }

        /* STICKY VIEWPORT */
        .hs-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        /* TRACK — all slides side by side */
        .hs-track {
          display: flex;
          width: calc(${SLIDE_COUNT} * 100vw);
          height: 100%;
          will-change: transform;
        }

        /* PANEL */
        .hs-panel {
          flex-shrink: 0;
          position: relative;
          width: 100vw;
          height: 100%;
          overflow: hidden;
        }

        /* PROGRESS BAR */
        .hs-bar {
          position: absolute; top:0; left:0;
          height:2px; z-index:50;
          transition: width .06s linear;
        }

        /* COUNTER */
        .hs-counter {
          position:absolute; top:1.6rem; right:2rem;
          font-family:'Cormorant Garamond',serif; font-size:.78rem;
          color:rgba(255,255,255,.25); z-index:50; letter-spacing:.06em;
        }
        .hs-counter b { color:rgba(255,255,255,.7); font-weight:400; }

        /* IMAGE */
        .hs-img-wrap {
          position:absolute; cursor:pointer;
          box-shadow:0 12px 40px rgba(0,0,0,.45);
          transition: box-shadow .4s ease;
        }
        .hs-img-wrap:hover {
          z-index:40 !important;
          box-shadow:0 28px 70px rgba(0,0,0,.65);
        }
        .hs-img-inner { overflow:hidden; }
        .hs-img-inner img {
          width:100%; height:100%; object-fit:cover; display:block;
          filter:brightness(.82) saturate(.88);
          transition:transform .55s cubic-bezier(.23,1,.32,1), filter .4s ease;
        }
        .hs-img-wrap:hover .hs-img-inner img {
          transform:scale(1.06);
          filter:brightness(.95) saturate(1.05);
        }
        .hs-caption {
          display:block; margin-top:5px;
          font-family:'Syne',sans-serif; font-size:.55rem;
          letter-spacing:.22em; text-transform:uppercase;
          color:rgba(255,255,255,.38);
        }

        /* QUOTE */
        .hs-quote { position:absolute; max-width:320px; }
        .hs-quote-text {
          font-family:'Cormorant Garamond',serif; font-weight:300;
          font-size:clamp(1.5rem,2.3vw,2.5rem);
          line-height:1.28; color:rgba(255,255,255,.9);
          white-space:pre-line;
        }
        .hs-quote-line {
          margin-top:1.1rem; width:40px; height:2px;
          border-radius:1px; opacity:.7;
        }

        /* DOTS */
        .hs-dots {
          position:absolute; bottom:1.6rem; left:50%;
          transform:translateX(-50%);
          display:flex; gap:.45rem; z-index:50;
        }
        .hs-dot {
          width:5px; height:5px; border-radius:50%;
          background:rgba(255,255,255,.2);
          transition:background .3s,transform .3s;
        }
        .hs-dot.on { background:#d4e84a; transform:scale(1.5); }

        /* FOOTER */
        .hs-footer {
          height:52vh; background:#111;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:.9rem;
          border-top:1px solid rgba(255,255,255,.05);
          padding:2rem; text-align:center;
        }
        .hs-footer h2 {
          font-family:'Cormorant Garamond',serif; font-weight:300;
          font-size:clamp(1.8rem,5vw,4rem); color:#f0ece4;
        }
        .hs-footer h2 em { font-style:italic; color:#d4e84a; }
        .hs-footer p {
          font-family:'Syne',sans-serif; font-size:.6rem;
          letter-spacing:.3em; text-transform:uppercase;
          color:rgba(255,255,255,.2);
        }
      `}</style>

      {/* HERO */}
      <section className="hs-hero">
        <p className="hs-hero-eyebrow">A Visual Journey — Six Chapters</p>
        <h1 className="hs-hero-title">The World<br />in <em>Frames</em></h1>
        <p className="hs-hero-sub">Scroll down to travel sideways</p>
        <div className="hs-cue">
          <div className="hs-cue-line" />
          <span className="hs-cue-label">Scroll</span>
        </div>
      </section>

      {/* HORIZONTAL SCROLL SECTION */}
      <div className="hs-wrapper" ref={wrapperRef}>
        <div className="hs-sticky">
          {/* Progress bar */}
          <div
            className="hs-bar"
            style={{
              width: `${progress * 100}%`,
              background: slides[activeIndex]?.accentColor ?? "#d4e84a",
            }}
          />

          {/* Counter */}
          <div className="hs-counter">
            <b>{String(activeIndex + 1).padStart(2, "0")}</b>
            &thinsp;/&thinsp;
            {String(SLIDE_COUNT).padStart(2, "0")}
          </div>

          {/* The actual horizontal track — moved by translateX */}
          <div
            className="hs-track"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="hs-panel"
                style={{ background: slide.bg }}
              >
                {slide.items.map((item, ii) => renderItem(item, ii))}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="hs-dots">
            {slides.map((_, i) => (
              <div key={i} className={`hs-dot${i === activeIndex ? " on" : ""}`} />
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <section className="hs-footer">
        <h2>Every frame tells a <em>story.</em></h2>
        <p>Six destinations · Six chapters</p>
      </section>
    </>
  );
}
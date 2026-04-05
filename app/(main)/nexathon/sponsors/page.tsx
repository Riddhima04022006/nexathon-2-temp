"use client";
import { useEffect } from "react";
import nexathonLogo from "../assets/logo.webp";

export default function NexathonSponsor() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]');
    const handleScroll = () => {
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      navLinks.forEach((a) => {
        a.style.color =
          a.getAttribute("href") === "#" + current ? "var(--text)" : "";
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        :root {
          --bg: #04030d;
          --surface: #07061a;
          --surface2: #0b0920;
          --surface3: #0f0d28;
          --border: rgba(119,92,255,0.08);
          --border2: rgba(119,92,255,0.16);
          --accent: #775cff;
          --accent-dim: rgba(119,92,255,0.1);
          --accent-glow: rgba(119,92,255,0.3);
          --accent-bright: #9b82ff;
          --gold: #c9a84c;
          --text: #ece8ff;
          --muted: #6b6296;
          --dim: #2a2545;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          line-height: 1.75;
          overflow-x: hidden;
        }

        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.022;
          pointer-events: none;
          z-index: 9999;
        }
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 40px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          background: rgba(4,3,13,0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo img { height: 30px; width: 70px; display: block; }
        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
          align-items: center;
        }
        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-cta {
          background: var(--accent) !important;
          color: #fff !important;
          padding: 7px 18px;
          border-radius: 3px;
        }
        .nav-cta:hover { background: var(--accent-bright) !important; }

        .wrap { max-width: 1080px; margin: 0 auto; padding: 0 40px; }

        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .section-tag::before {
          content: '';
          display: block;
          width: 20px; height: 1px;
          background: var(--accent);
        }

        .section-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(30px, 4vw, 50px);
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 12px;
        }
        .section-sub {
          color: var(--muted);
          max-width: 500px;
          margin-bottom: 40px;
          font-size: 13px;
        }

        /* HERO: bg */
        #hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 60px;
          overflow: hidden;
          background: var(--bg);
        }
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(119,92,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(119,92,255,0.05) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-glow {
          position: absolute;
          top: 25%; left: 50%;
          transform: translateX(-50%);
          width: 750px; height: 500px;
          background: radial-gradient(ellipse, rgba(119,92,255,0.14) 0%, rgba(90,63,217,0.06) 45%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          padding: 80px 0 72px;
          max-width: 860px;
        }
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          animation: fadeUp 0.8s ease both;
        }
        .hero-badge {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(119,92,255,0.35);
          padding: 5px 14px;
          border-radius: 2px;
          background: var(--accent-dim);
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        h1.hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 1.0;
          letter-spacing: -0.035em;
          margin-bottom: 28px;
          animation: fadeUp 0.8s 0.1s ease both;
        }
        h1.hero-title em {
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          color: var(--accent);
          font-size: 1.06em;
        }
        .hero-sub {
          font-size: 14px;
          line-height: 1.75;
          color: var(--muted);
          max-width: 560px;
          margin-bottom: 40px;
          border-left: 2px solid var(--accent);
          padding-left: 20px;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .hero-sub strong { color: var(--text); font-weight: 500; }
        .hero-actions { animation: fadeUp 0.8s 0.3s ease both; }
        .btn-primary {
          background: var(--accent);
          color: #fff;
          padding: 13px 32px;
          border-radius: 3px;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.04em;
          transition: all 0.2s;
          box-shadow: 0 0 36px rgba(119,92,255,0.3);
          display: inline-block;
        }
        .btn-primary:hover {
          background: var(--accent-bright);
          box-shadow: 0 0 52px rgba(119,92,255,0.5);
          transform: translateY(-1px);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* DIFFERENT: surface */
        #different {
          padding: 64px 0;
          background: var(--surface);
        }
        .diff-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 2px;
        }
        .diff-card {
          background: var(--bg);
          padding: 36px 28px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .diff-card:hover { background: var(--surface2); }
        .diff-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-bright));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .diff-card:hover::before { transform: scaleX(1); }
        .diff-num {
          font-family: 'Syne', sans-serif;
          font-size: 64px;
          font-weight: 800;
          color: var(--dim);
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: -0.05em;
        }
        .diff-tag {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-dim);
          padding: 4px 10px;
          border-radius: 2px;
          margin-bottom: 12px;
        }
        .diff-card h3 {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .diff-card p { color: var(--muted); font-size: 12px; line-height: 1.7; }

        /* FUNNEL: surface2, tight padding */
        #funnelnumbers { background: var(--surface2); }
        .funnel-visual {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding: 32px 40px;
          position: relative;
          overflow: hidden;
        }
        .funnel-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 120% at 50% 50%, rgba(119,92,255,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .funnel-step { text-align: center; flex: 1; min-width: 90px; position: relative; z-index: 1; }
        .funnel-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: -0.04em;
          display: block;
          color: var(--text);
        }
        .funnel-label {
          font-size: 10px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 4px;
          line-height: 1.5;
        }
        .funnel-arrow { color: var(--accent); font-size: 18px; opacity: 0.45; flex-shrink: 0; }

        /* SIGNAL: surface */
        #signal {
          padding: 64px 0;
          background: var(--surface);
        }
        .signal-layout {
          display: grid;
          grid-template-columns: 5fr 4fr;
          gap: 56px;
          align-items: start;
        }
        .signal-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 2.5vw, 30px);
          font-style: italic;
          line-height: 1.45;
          color: var(--text);
          margin-bottom: 24px;
          position: relative;
          padding-left: 26px;
        }
        .signal-quote::before {
          content: '"';
          position: absolute;
          left: 0; top: -8px;
          font-size: 56px;
          line-height: 1;
          color: var(--accent);
          font-style: normal;
        }

        /* 2-col full width below layout, third card centered */
        .signal-points-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-top: 2px;
        }
        .signal-points-grid .signal-point:nth-child(3) {
          grid-column: 1 / -1;
          max-width: 50%;
          margin: 0 auto;
        }
        .signal-point-center {
          display: block;
        }
        .signal-point-center .signal-point {
          width: 100%;
        }

        .signal-point {
          padding: 20px;
          background: var(--surface2);
          border-left: 2px solid var(--accent);
          transition: background 0.2s;
        }
        .signal-point:hover { background: var(--surface3); }
        .signal-point h4 {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .signal-point p { font-size: 12px; color: var(--muted); line-height: 1.6; }

        .signal-aside-block {
          background: var(--surface2);
          border: 1px solid var(--border);
          padding: 24px;
          margin-bottom: 2px;
        }
        .signal-aside-block h4 {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
          color: var(--muted);
        }
        .signal-aside-block ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .signal-aside-block li {
          font-size: 12px;
          color: var(--muted);
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }
        .signal-aside-block li::before { content: '/'; color: var(--dim); flex-shrink: 0; }

        /* USE CASES: bg */
        #usecases {
          padding: 64px 0;
          background: var(--bg);
        }
        .usecases-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-top: 40px;
        }
        .usecase-card {
          background: var(--surface);
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .usecase-card:hover { background: var(--surface2); }
        .usecase-tag {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 18px;
        }
        .usecase-tag.startup { color: var(--accent-bright); }
        .usecase-tag.corp { color: var(--gold); }
        .usecase-card h3 {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .usecase-card > p {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.72;
          margin-bottom: 24px;
        }
        .usecase-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
        .usecase-list li {
          font-size: 12px;
          color: var(--text);
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }
        .usecase-list li::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          margin-top: 6px;
        }
        .usecase-card:nth-child(2) .usecase-list li::before { background: var(--gold); }
        .uc-bg-num {
          position: absolute;
          bottom: -16px; right: -6px;
          font-family: 'Syne', sans-serif;
          font-size: 130px;
          font-weight: 800;
          color: rgba(119,92,255,0.04);
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.06em;
        }

        /* CTA: surface2 */
        #cta {
          padding: 80px 0;
          background: var(--surface2);
          position: relative;
          overflow: hidden;
        }
        .cta-bg {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(119,92,255,0.1) 0%, transparent 65%);
          filter: blur(70px);
          pointer-events: none;
        }
        .cta-inner {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
        }
        .cta-inner h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 5vw, 66px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 20px;
        }
        .cta-inner h2 em {
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 1.06em;
          color: var(--accent);
        }
        .cta-inner p {
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 40px;
          line-height: 1.75;
        }
        .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        footer {
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding: 28px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-logo img { height: 26px; width: 70px; display: block; }
        .footer-note { font-size: 11px; color: var(--muted); letter-spacing: 0.04em; }
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }
        @media (max-width: 768px) {
          .wrap { padding: 0 18px; }
          nav { padding: 0 18px; height: 56px; }
          .nav-links { display: none; }

          #hero { min-height: auto; }
          .hero-inner { padding: 56px 0 48px; }
          h1.hero-title { font-size: clamp(38px, 10vw, 60px); }
          .hero-sub { font-size: 13px; }

          #different { padding: 44px 0; }
          .diff-grid { grid-template-columns: 1fr; gap: 2px; }
          .diff-card { padding: 26px 20px; }
          .diff-num { font-size: 48px; }

          .funnel-visual {
            padding: 20px 18px;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px 4px;
          }
          .funnel-step { min-width: 64px; flex: 0 1 auto; }
          .funnel-num { font-size: 22px; }
          .funnel-label { font-size: 9px; }
          .funnel-arrow { font-size: 14px; line-height: 2.4; }

          #signal { padding: 44px 0; }
          .signal-layout { grid-template-columns: 1fr; gap: 28px; }
          .signal-points-grid { grid-template-columns: 1fr; }
          .signal-points-grid .signal-point:nth-child(3) { grid-column: auto; max-width: 100%; margin: 0; }
          .signal-point-center { display: block; }
          .signal-point-center .signal-point { width: 100%; }

          #usecases { padding: 44px 0; }
          .usecases-grid { grid-template-columns: 1fr; }
          .usecase-card { padding: 30px 22px; }
          .uc-bg-num { font-size: 90px; }

          #cta { padding: 52px 0; }
          footer { padding: 22px 18px; }
          .section-heading { font-size: clamp(24px, 7vw, 38px); }
          .section-sub { margin-bottom: 28px; }
        }

        @media (max-width: 400px) {
          .funnel-visual { flex-direction: column; align-items: center; gap: 2px; }
          .funnel-arrow { transform: rotate(90deg); display: block; }
        }
      `}</style>
<nav>
        <a href="#" className="nav-logo">
          <img src={nexathonLogo.src} alt="Nexathon" />
        </a>
        <ul className="nav-links">
          <li><a href="#different">Why Nexathon</a></li>
          <li><a href="#signal">The Signal</a></li>
          <li><a href="#usecases">Use Cases</a></li>
          <li><a href="#cta" className="nav-cta">Become a Partner</a></li>
        </ul>
      </nav>
<section id="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <div className="hero-badge-dot" />
              <span className="hero-badge">Sponsorship: 2026</span>
            </div>
            <h1 className="hero-title">
              Sponsor<br /><em>Nexathon.</em>
            </h1>
            <p className="hero-sub">
              You're not buying ad space. You're buying access to a <strong>pre-verified engineering cohort</strong>: the top developers in India, filtered through a process most hiring pipelines can't replicate.
            </p>
            <div className="hero-actions">
              <a href="#cta" className="btn-primary">Become a Partner</a>
            </div>
          </div>
        </div>
      </section>
<section id="different">
        <div className="wrap">
          <div className="section-tag">What sets this apart</div>
          <h2 className="section-heading reveal">Not a hackathon.<br />A filtering machine.</h2>
          <p className="section-sub reveal reveal-d1">Most developer programs optimise for reach. Nexathon optimises for signal. Every team you meet has earned their place.</p>
          <div className="diff-grid">
            <div className="diff-card reveal">
              <div className="diff-num">01</div>
              <span className="diff-tag">Filtered, not invited</span>
              <h3>98%+ elimination</h3>
              <p>Teams don't apply and show up. They survive two consecutive knockout rounds. By the time they reach you, the field has been reduced to the exceptional.</p>
            </div>
            <div className="diff-card reveal reveal-d1">
              <div className="diff-num">02</div>
              <span className="diff-tag">Multi-domain</span>
              <h3>Engineers, not specialists</h3>
              <p>Stage 2 tests across backend, systems, product, algorithms, and web3 simultaneously. No hiding behind a comfort zone. You see who can actually range.</p>
            </div>
            <div className="diff-card reveal reveal-d2">
              <div className="diff-num">03</div>
              <span className="diff-tag">Proven under pressure</span>
              <h3>Observed execution</h3>
              <p>Offline finals in Delhi. Real-time builds, in person. You see how teams think when the stakes are real: not a recorded submission. A live performance.</p>
            </div>
          </div>
        </div>
      </section>
<section id="funnelnumbers">
        <div className="wrap">
          <div className="funnel-visual reveal">
            <div className="funnel-step">
              <span className="funnel-num">~1000</span>
              <div className="funnel-label">Developers<br />register</div>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-step">
              <span className="funnel-num">~100</span>
              <div className="funnel-label">Qualify<br />Stage 2</div>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-step">
              <span className="funnel-num">Top 15</span>
              <div className="funnel-label">Offline<br />finalists</div>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-step">
              <span className="funnel-num">1</span>
              <div className="funnel-label">Winning<br />team</div>
            </div>
          </div>
        </div>
      </section>
<section id="signal">
        <div className="wrap">
          <div className="section-tag">The hiring signal argument</div>
<div className="signal-layout">
            <div>
              <h2 className="section-heading reveal" style={{ marginBottom: 24 }}>
                Resumes tell you what they know.<br />This shows you how they think.
              </h2>
              <p className="signal-quote reveal reveal-d1">
                Nexathon doesn't just test developers. It produces proof: the kind that matters to companies that build real things.
              </p>
            </div>
            <div>
              <div className="signal-aside-block reveal">
                <h4>What the top 15 actually have</h4>
                <ul>
                  <li>Proof they can solve under time pressure (Stage 1 CP filter)</li>
                  <li>Proof they operate across multiple engineering domains (Stage 2)</li>
                  <li>Proof they can build a working system in a high-stakes environment (Stage 3)</li>
                  <li>A national ranking against developers from 100+ colleges</li>
                  <li>Observed work: companies saw how they think, not just submissions</li>
                </ul>
              </div>
              <div className="signal-aside-block reveal reveal-d1">
                <h4>Why early-stage companies especially benefit</h4>
                <ul>
                  <li>Can't afford bad engineering hires: they need signal, not just potential</li>
                  <li>Nexathon's filter is harder and more multi-dimensional than most technical interviews</li>
                  <li>Access without the headcount budget for a full campus recruiting operation</li>
                </ul>
              </div>
            </div>
          </div>
<div className="signal-points-grid">
            <div className="signal-point reveal reveal-d1">
              <h4>Hiring signal beats resumes</h4>
              <p>The top 15 have self-selected into a highly competitive environment: a strong indicator of intrinsic drive that no CV column captures.</p>
            </div>
            <div className="signal-point reveal reveal-d2">
              <h4>Observe how teams think, not just what they ship</h4>
              <p>Companies in the room see how teams handle ambiguity, break down problems, and execute under time pressure. That's the signal most interviews miss entirely.</p>
            </div>
            <div className="signal-point reveal reveal-d3">
              <h4>Identify builders, not applicants</h4>
              <p>Direct interaction during Stage 3 means relationships form organically: not through a resume portal, but through watching them work in real conditions.</p>
            </div>
          </div>
        </div>
      </section>
<section id="usecases">
        <div className="wrap">
          <div className="section-tag">Use cases</div>
          <h2 className="section-heading reveal">Built for two<br />kinds of companies.</h2>
          <div className="usecases-grid">
            <div className="usecase-card reveal">
              <span className="usecase-tag startup">For early-stage startups</span>
              <h3>Find builders before anyone else does.</h3>
              <p>You don't have the brand or budget to win a campus recruiting war. Nexathon gives you access to high-intent developers who have already proven themselves: before the big companies show up.</p>
              <ul className="usecase-list">
                <li>Find early builders before they're on the market</li>
                <li>Network with developers who choose challenges over comfort</li>
                <li>Contribute problem statements that test your actual stack</li>
                <li>Identify potential founding engineer profiles</li>
              </ul>
              <div className="uc-bg-num">01</div>
            </div>
            <div className="usecase-card reveal reveal-d1">
              <span className="usecase-tag corp">For established companies</span>
              <h3>Benchmark the next generation. For real.</h3>
              <p>You have inbound. What you don't have is a reliable way to distinguish genuine engineering talent from well-prepared interviewees. Nexathon provides observed performance data: not self-reported credentials.</p>
              <ul className="usecase-list">
                <li>Benchmark freshers and students against a national cohort</li>
                <li>Evaluate internship and job candidates under real conditions</li>
                <li>Test real-world engineering capability, not interview prep</li>
                <li>Build employer brand with serious developers who notice quality</li>
              </ul>
              <div className="uc-bg-num">02</div>
            </div>
          </div>
        </div>
      </section>
<section id="cta">
        <div className="cta-bg" />
        <div className="wrap">
          <div className="cta-inner">
            <h2 className="reveal">
              Access Engineers<br />Who Can <em>Actually Build.</em>
            </h2>
            <p className="reveal reveal-d1">
              One slot at the top. Three entry points. All of them offering something a job board never will: a filtered, observed, ranked engineering cohort: not a list of applicants.
            </p>
            <div className="cta-actions reveal reveal-d2">
              <a href="mailto:sponsor@nexathon.in" className="btn-primary">Apply as Sponsor</a>
            </div>
          </div>
        </div>
      </section>
<footer>
        <div className="footer-logo">
          <img src={nexathonLogo.src} alt="Nexathon" />
        </div>
        <div className="footer-note">© 2026 Nexathon · Delhi, India · sponsor@nexathon.in</div>
      </footer>
    </>
  );
}
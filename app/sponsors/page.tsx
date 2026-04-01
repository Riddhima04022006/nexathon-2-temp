"use client";

export default function Page() {
  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: "clamp(2.5rem, 8vw, 7rem)",
          fontWeight: 400,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        Sponsors Will Be
        <br />
        Shown Here
      </h2>

      <div
        style={{
          width: "80px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          margin: "1.5rem 0",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.3)",
          textAlign: "center",
        }}
      >
        Stay tuned for updates
      </p>

      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.6)",
          marginTop: "2.5rem",
          animation: "sponsorPulse 2s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes sponsorPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); box-shadow: 0 0 0 rgba(255,255,255,0); }
          50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 20px rgba(255,255,255,0.3); }
        }
      `}</style>
    </main>
  );
}
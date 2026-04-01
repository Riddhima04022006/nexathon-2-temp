import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const menuItems = [
  { id: "01", label: "HOME", icon: "◈", active: true, link: "/nexathon" },
  { id: "02", label: "STRUCTURE", icon: "⊕", link: "/structure" },
  { id: "03", label: "SPONSORS", icon: "☆", link: "/sponsors" },
  { id: "04", label: "FLASHBACK", icon: "⏻", link: "/flashback" }
];

const stats = [
  { label: "TIME LEFT", value: "48:00:00" },
  { label: "REGISTERED TEAMS", value: "45" },
  { label: "Number of participants", value: "150" },
  { label: "NEXT BRIEFING", value: "02h 15m" },
];

function DottedGlobeInner({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const distortionCurrent = useRef(0);
  
  const originalPositions = useMemo(() => {
    const coords = [];
    const radius = 2.2;
    const numPoints = 1200;
    
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        coords.push(x * radius, y * radius, z * radius);
    }
    
    return new Float32Array(coords);
  }, []);

  const particles = useMemo(() => new Float32Array(originalPositions), [originalPositions]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const targetD = hovered ? 1 : 0;
    distortionCurrent.current = THREE.MathUtils.lerp(distortionCurrent.current, targetD, 0.1);
    const d = distortionCurrent.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005 + d * 0.02;
      groupRef.current.rotation.x = 0.25 + d * Math.sin(time * 2) * 0.1;
      groupRef.current.rotation.z = -0.15 + d * Math.cos(time * 2) * 0.1;
    }

    if (coreRef.current) coreRef.current.scale.setScalar(1 + d * 0.05 + Math.sin(time * 10) * 0.02 * d);
    if (ring1Ref.current) ring1Ref.current.scale.setScalar(1 + d * 0.15 + Math.cos(time * 8) * 0.03 * d);
    if (ring2Ref.current) ring2Ref.current.scale.setScalar(1 + d * 0.1 + Math.sin(time * 12) * 0.04 * d);
    if (ring3Ref.current) ring3Ref.current.scale.setScalar(1 + d * 0.2 + Math.cos(time * 9) * 0.05 * d);

    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];
        
        if (d > 0.001) {
          const noise = Math.sin(ox * 4 + time * 8) * Math.cos(oy * 4 + time * 6) * Math.sin(oz * 4 + time * 7);
          const scale = 1 + noise * 0.25 * d + d * 0.15;
          positions[i] = ox * scale;
          positions[i + 1] = oy * scale;
          positions[i + 2] = oz * scale;
        } else {
          positions[i] += (ox - positions[i]) * 0.15;
          positions[i + 1] += (oy - positions[i + 1]) * 0.15;
          positions[i + 2] += (oz - positions[i + 2]) * 0.15;
        }
      }
      geometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute 
              attach="attributes-position"
              args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.035} 
          color="#ffffff" 
          transparent 
          opacity={0.6}
          sizeAttenuation 
        />
      </points>
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} wireframe={false} />
      </mesh>
      <mesh ref={ring1Ref} rotation={[Math.PI/2 + 0.2, 0, 0]}>
        <ringGeometry args={[2.5, 2.51, 64]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI/4, Math.PI/3, 0]}>
        <ringGeometry args={[2.5, 2.51, 64]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI/4, -Math.PI/6, 0]}>
        <ringGeometry args={[2.5, 2.51, 64]} />
        <meshBasicMaterial color="#ffffffff" side={THREE.DoubleSide} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function WireGlobe({ isMobile }: { isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  // Scale down the globe container for mobile
  const size = isMobile ? "180px" : "230px";
  
  return (
    <div 
      style={{ width: size, height: size, position: "relative", cursor: "crosshair" , overflow:"hidden" }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" ,overflow:"hidden" }}>
        <ambientLight intensity={1} />
        <DottedGlobeInner hovered={hovered} />
      </Canvas>
    </div>
  );
}

export default function NexaMenu(props: any) {
  const [activeItem, setActiveItem] = useState("01");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [themeColor, setThemeColor] = useState("#ffffff");
  const router = useRouter();

  const rgbStr = useMemo(() => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(themeColor);
    if (!result) return "255, 255, 255";
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }, [themeColor]);

  // Responsive Hook
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("nexaMenuToggle", { detail: visible }));
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div style={{ position: "fixed", top: isMobile ? "1rem" : "2rem", right: isMobile ? "1rem" : "2rem", zIndex: 99998}}>
        <AnimatePresence>
          {!visible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setVisible(true)}
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "0.8rem 1.5rem",
                borderRadius: "30px",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(40,40,40,0.8)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              <span>MENU</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ width: "16px", height: "1px", background: "#fff", display: "block" }}></span>
                <span style={{ width: "16px", height: "1px", background: "#fff", display: "block" }}></span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: `radial-gradient(ellipse at center, rgba(${rgbStr},0.15) 0%, rgba(0,0,0,0.95) 100%)`,
              display: "flex",
              // Switch to column on mobile, allow scrolling if screen is too short
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "stretch",
              justifyContent: isMobile ? "flex-start" : "space-between",
              fontFamily: "'Courier New', 'Lucida Console', monospace",
              overflowY: isMobile ? "auto" : "hidden",
              overflowX: "hidden",
            }}
          >
            {/* Background elements (Kept identical) */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                backgroundImage: `
                  radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
                  radial-gradient(1px 1px at 25% 70%, rgba(255,255,255,0.2) 0%, transparent 100%),
                  radial-gradient(1px 1px at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 100%),
                  radial-gradient(1px 1px at 75% 55%, rgba(255,255,255,0.2) 0%, transparent 100%),
                  radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.3) 0%, transparent 100%),
                  radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.1) 0%, transparent 100%),
                  radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.2) 0%, transparent 100%),
                  radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.3) 0%, transparent 100%)
                `,
              }}
            />
            <div
              style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255,255,255,0.03) 2px,
                  rgba(255,255,255,0.03) 4px
                )`,
                zIndex: 10,
              }}
            />

            {/* ═══ LEFT CARD ═══ */}
            <motion.div
              initial={{ x: isMobile ? 0 : "-100%", y: isMobile ? -50 : 0, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: isMobile ? 0 : "-100%", y: isMobile ? -50 : 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              style={{
                // Auto height and full width on mobile
                flex: isMobile ? "none" : "0 0 350px",
                width: isMobile ? "100%" : "auto",
                background: `linear-gradient(135deg, rgba(${rgbStr},0.1) 0%, rgba(5,5,5,0.8) 100%)`,
                backdropFilter: "blur(24px) saturate(1)",
                WebkitBackdropFilter: "blur(24px) saturate(1)",
                // Adjust borders and padding for mobile
                borderRight: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                borderLeft: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 20,
                left: isMobile ? "0" : "3.5rem"
              }}
            >
              <div style={{ position: "relative", marginBottom: isMobile ? "1.5rem" : "2.5rem" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "-20px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                    pointerEvents: "none",
                    overflow:"none"
                  }}
                />
                <WireGlobe isMobile={isMobile} />
              </div>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  marginBottom: "1.5rem",
                }}
              />

              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{s.label}</span>
                    <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: "bold", fontSize: "12px" }}>{s.value}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  margin: "1.5rem 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.3)",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}
              >
                {["Schedule", "Mentors", "Rules", "Support"].map((link) => (
                  <span
                    key={link}
                    style={{ cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                  >
                    {link}
                  </span>
                ))}
              </div>

              {!isMobile && (
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.2)",
                    textTransform: "uppercase",
                  }}
                >
                  NEXATHON
                </div>
              )}
            </motion.div>

            {/* ═══ RIGHT CARD ═══ */}
            <motion.div
              initial={{ x: isMobile ? 0 : "100%", y: isMobile ? 50 : 0, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: isMobile ? 0 : "100%", y: isMobile ? 50 : 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              style={{
                flex: isMobile ? "1" : "0 0 450px",
                width: isMobile ? "100%" : "auto",
                background: `linear-gradient(to bottom right, rgba(${rgbStr},0.05), rgba(10, 10, 10, 0.85) 40%)`,
                borderLeft: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                padding: isMobile ? "2rem 1.5rem 4rem 1.5rem" : "3rem 4rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 20,
                minHeight: isMobile ? "50vh" : "auto"
              }}
            >
              <div style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", gap: "2rem", marginBottom: isMobile ? "2rem" : "0" }}>
                <button
                  onClick={() => setVisible(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  ✕ CLOSE
                </button>
              </div>

              <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: isMobile ? "1rem" : "1.5rem" }}>
                {menuItems.map((item, i) => {
                  const isActive = activeItem === item.id;
                  const isHovered = hoveredItem === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveItem(item.id);
                        if (item.link) {
                          router.push(item.link);
                          setVisible(false);
                        }
                      }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? "1rem" : "1.5rem",
                        padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem",
                        cursor: "pointer",
                        borderLeft: isActive ? `2px solid rgba(${rgbStr},1)` : "2px solid transparent",
                        transition: "all 0.3s ease",
                        background: isActive ? `rgba(${rgbStr},0.08)` : isHovered ? `rgba(${rgbStr},0.03)` : "transparent",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", minWidth: isMobile ? "60px" : "80px" }}>
                        <span style={{ fontSize: "14px", color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}>
                          {item.icon}
                        </span>
                        <span style={{ fontSize: "12px", letterSpacing: "0.1em", color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}>
                          {item.id}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: isMobile ? "1.5rem" : "2rem",
                          fontWeight: "bold",
                          letterSpacing: "0.02em",
                          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                          color: isActive ? "rgba(255,255,255,1)" : isHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
                          transition: "color 0.3s, transform 0.3s",
                          transform: isHovered ? "translateX(8px)" : "translateX(0)",
                          display: "inline-block",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </nav>

              <div style={{ marginTop: isMobile ? "2rem" : "0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    marginBottom: "1.5rem",
                  }}
                />
                <button
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,1)",
                    fontSize: "12px",
                    letterSpacing: "0.25em",
                    padding: "1rem 2rem",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onClick={() => {
                    router.push("/side");
                    setVisible(false);
                  }}
                >
                  ◈ CHOOSE YOUR PATH
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
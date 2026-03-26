import { useState, useEffect, useRef } from "react"

const T = {
  bg: "#F5F4F1",
  tx: "#111111",
  ts: "#666666",
  tm: "#999999",
  ac: "#C47B2B",
  bd: "rgba(0,0,0,0.08)",
}

export default function FeaturedProject() {
  const ribbonRef = useRef()
  const imageRef = useRef()
  const sectionRef = useRef()
  const [ribbonVisible, setRibbonVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const obs1 = new IntersectionObserver(e => { if (e[0].isIntersecting) setRibbonVisible(true) }, { threshold: 0.3 })
    const obs2 = new IntersectionObserver(e => { if (e[0].isIntersecting) setImageVisible(true) }, { threshold: 0.1 })
    if (ribbonRef.current) obs1.observe(ribbonRef.current)
    if (imageRef.current) obs2.observe(imageRef.current)
    return () => { obs1.disconnect(); obs2.disconnect() }
  }, [])

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) setCursorPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}`, position: "relative" }}
    >

      {/* Custom cursor — only shows when hovering image */}
      {hovered && (
        <div style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          transform: "translate(-50%, -50%)",
          width: 100, height: 100,
          borderRadius: "50%",
          background: T.tx,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.3s ease, height 0.3s ease",
        }}>
          <span style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.5,
          }}>View<br />Project</span>
        </div>
      )}

      {/* ── RIBBON ── */}
      <div ref={ribbonRef} style={{
        padding: "80px 60px 60px",
        textAlign: "center",
        opacity: ribbonVisible ? 1 : 0,
        transform: ribbonVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.tx, margin: "0 auto 16px" }} />
        <div style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 400,
          fontSize: "clamp(11px,1vw,13px)", letterSpacing: "0.28em",
          textTransform: "uppercase", color: T.ts,
        }}>Featured Project</div>
      </div>

      {/* ── FULL WIDTH IMAGE ── */}
      <div
        ref={imageRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative", width: "100%", height: "85vh",
          overflow: "hidden", cursor: "none",
          opacity: imageVisible ? 1 : 0,
          transform: imageVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}
      >
        <img
          src="/sioki-screen.png"
          alt="SIOKI — Ship It or Kill It"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            transform: hovered ? "scale(1.02)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.25)",
          transition: "background 0.5s ease",
        }} />

        {/* Bottom left */}
        <div style={{ position: "absolute", bottom: 48, left: 60 }}>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            PM Judgment Training · 2026
          </div>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", letterSpacing: "-2px", color: "#ffffff", lineHeight: 1.0, marginBottom: 8 }}>
            SIOKI
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.6)" }}>
            Ship It or Kill It — 12 real product decisions between you and Earth.
          </div>
        </div>

        {/* Bottom right — tags */}
        <div style={{ position: "absolute", bottom: 48, right: 60, display: "flex", gap: 8 }}>
          {["Product Hunt → April 1", "0→1 Build", "Active"].map((tag, i) => (
            <div key={tag} style={{
              fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
              color: i === 2 ? T.ac : "rgba(255,255,255,0.5)",
              border: `0.5px solid ${i === 2 ? T.ac : "rgba(255,255,255,0.2)"}`,
              padding: "5px 12px", borderRadius: 100,
              background: i === 2 ? "rgba(196,123,43,0.15)" : "transparent",
            }}>{tag}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

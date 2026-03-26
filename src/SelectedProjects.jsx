import { useState, useRef, useEffect } from "react"

const T = {
  bg: "#F5F4F1",
  bg2: "#EEECEA",
  tx: "#111111",
  ts: "#666666",
  tm: "#999999",
  ac: "#C47B2B",
  bd: "rgba(0,0,0,0.08)",
}

const PROJECTS = [
  {
    id: "lucid",
    category: "AI Safety · Product Design · 2026",
    title: "Lucid",
    desc: "A family safety app that detects AI-generated synthetic media on social platforms in real time — stopping harmful content before it reaches your family.",
    tags: ["Android", "Pre-Beta", "0→1"],
    image: "/sioki-screen.png",
    imageBg: "#0a0e14",
    href: "#",
  },
  {
    id: "signal",
    category: "Personal Intelligence · Productivity · 2025–",
    title: "Signal & Cipher",
    desc: "A personal intelligence system built to gather, filter, and synthesise market signals — turning noise into actionable product and career clarity.",
    tags: ["Personal Tool", "Active"],
    image: null,
    imageBg: "#1a1a2e",
    href: "#",
  },
]

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const rowRef = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (rowRef.current) obs.observe(rowRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: `0.5px solid ${T.bd}`,
        background: hovered ? T.bg2 : T.bg,
        transition: "background 0.4s ease",
        cursor: "none",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionProperty: "background, opacity, transform",
        transitionDuration: "0.4s, 0.7s, 0.7s",
        transitionDelay: `0s, ${index * 0.15}s, ${index * 0.15}s`,
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        justifyItems: "center",
        padding: "60px 60px",
        gap: 40,
      }}>

        {/* Left: centered title + desc on hover */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <div style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 10, letterSpacing: "0.16em",
            textTransform: "uppercase", color: T.tm,
            marginBottom: 16,
          }}>{project.category}</div>

          <div style={{
            fontFamily: "'Kaisei Tokumin', serif",
            fontWeight: 400,
            fontSize: "clamp(36px,4.5vw,62px)",
            letterSpacing: "-2px",
            lineHeight: 1.0,
            color: T.tx,
            marginBottom: hovered ? 24 : 0,
            transition: "margin-bottom 0.4s ease",
          }}>{project.title}</div>

          {/* Description slides in on hover */}
          <div style={{
            maxHeight: hovered ? 200 : 0,
            opacity: hovered ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
          }}>
            <p style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 14, fontWeight: 300,
              color: T.ts, lineHeight: 1.8,
              margin: "0 auto 20px",
              maxWidth: 380,
            }}>{project.desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {project.tags.map(tag => (
                <div key={tag} style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 9, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: T.tm,
                  border: `0.5px solid ${T.bd}`,
                  padding: "4px 12px", borderRadius: 100,
                }}>{tag}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: image always visible, grows on hover */}
        <div style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 6,
          overflow: "hidden",
          height: hovered ? 280 : 200,
          transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
          background: project.imageBg,
          position: "relative",
        }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
              gap: 12,
            }}>
              <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 400, fontSize: 36, letterSpacing: "-1px", color: "rgba(255,255,255,0.12)" }}>S&C</div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Signal & Cipher</div>
              <div style={{ width: 32, height: 0.5, background: "rgba(196,123,43,0.4)" }} />
              <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(196,123,43,0.5)" }}>Personal Tool · Active</div>
            </div>
          )}
          <div style={{
            position: "absolute", top: 16, right: 16,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, color: T.tx,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s",
          }}>↗</div>
        </div>
      </div>
    </div>
  )
}

export default function SelectedProjects() {
  return (
    <section style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}` }}>
      {PROJECTS.map((project, i) => (
        <ProjectRow key={project.id} project={project} index={i} />
      ))}
    </section>
  )
}

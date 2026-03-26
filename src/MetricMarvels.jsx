import { useState, useEffect, useRef } from "react"

const T = {
  bg: "#F5F4F1",
  bg2: "#EEECEA",
  tx: "#111111",
  ts: "#666666",
  tm: "#999999",
  ac: "#C47B2B",
  bd: "rgba(0,0,0,0.08)",
}

const METRICS = [
  {
    id: "revenue",
    label: "Revenue Impact",
    num: "$2M+",
    breakdown: [
      { num: "$1.2M", label: "LTI Infrastructure Savings" },
      { num: "$500K", label: "Archemy First-Year Revenue" },
      { num: "$300K", label: "Collabera Optimization" },
    ],
  },
  {
    id: "shipped",
    label: "Products Shipped",
    num: "5",
    breakdown: [
      { num: "01", label: "SIOKI — PM Judgment Trainer" },
      { num: "02", label: "Red Zone Dashboard" },
      { num: "03", label: "AI Content Platform (Archemy)" },
      { num: "04", label: "Web Application (L&T)" },
      { num: "05", label: "ATS Platform (Collabera)" },
    ],
  },
  {
    id: "efficiency",
    label: "Efficiency Gains",
    num: "4×",
    breakdown: [
      { num: "60%", label: "↓ Time-to-Hire" },
      { num: "28%", label: "Recruiter Efficiency ↑" },
      { num: "45%", label: "↓ Onboarding Time" },
      { num: "20%", label: "↑ Release Velocity" },
    ],
  },
  {
    id: "geo",
    label: "Geographies",
    num: "3",
    breakdown: [
      { num: "🇺🇸", label: "United States" },
      { num: "🇪🇺", label: "Europe" },
      { num: "🇮🇳", label: "India" },
    ],
  },
]

function MetricRow({ metric, index }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setVisible(true)
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      padding: "64px 0",
      borderBottom: `0.5px solid ${T.bd}`,
      gap: 40,
    }}>
      {/* Left: label + big number */}
      <div style={{ overflow: "hidden" }}>
        <div style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: 10, letterSpacing: "0.18em",
          textTransform: "uppercase", color: T.tm,
          marginBottom: 20,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        }}>{metric.label}</div>

        {/* Big number — emerges from center outward */}
        <div style={{
          fontFamily: "'Kaisei Tokumin', serif",
          fontWeight: 800,
          fontSize: "clamp(64px,10vw,140px)",
          letterSpacing: "-4px",
          lineHeight: 1,
          color: T.tx,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.6) translateY(20px)",
          transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.1}s`,
          transformOrigin: "left center",
        }}>{metric.num}</div>
      </div>

      {/* Right: breakdown list — items emerge outward from center */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {metric.breakdown.map((item, i) => (
          <div key={item.label} style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            padding: "12px 0",
            borderBottom: i < metric.breakdown.length - 1 ? `0.5px solid ${T.bd}` : "none",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(32px)",
            transition: `opacity 0.6s ease ${index * 0.1 + 0.2 + i * 0.07}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.2 + i * 0.07}s`,
          }}>
            <span style={{
              fontFamily: "'Kaisei Tokumin', serif",
              fontWeight: 800,
              fontSize: "clamp(20px,2.5vw,32px)",
              letterSpacing: "-1px",
              color: T.ac,
              minWidth: 60,
              lineHeight: 1,
            }}>{item.num}</span>
            <span style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "clamp(14px,1.4vw,18px)",
              fontWeight: 300,
              color: T.ts,
              lineHeight: 1.3,
            }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MetricMarvels() {
  const headerRef = useRef()
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setHeaderVisible(true)
    }, { threshold: 0.3 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}`, padding: "0 60px" }}>

      {/* Header */}
      <div ref={headerRef} style={{
        padding: "80px 0 0",
        textAlign: "center",
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <div style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: 10, letterSpacing: "0.28em",
          textTransform: "uppercase", color: T.ts,
        }}>Metric Marvels</div>
      </div>

      {/* Metric rows */}
      {METRICS.map((metric, i) => (
        <MetricRow key={metric.id} metric={metric} index={i} />
      ))}

      <div style={{ height: 80 }} />
    </section>
  )
}

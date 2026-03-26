import { useState, useEffect, useRef } from "react"

const T = {
  bg: "#F5F4F1",
  tx: "#111111",
  ts: "#666666",
  tm: "#999999",
  ac: "#C47B2B",
  bd: "rgba(0,0,0,0.08)",
}

const METRICS = [
  { num: "12", label: "Real PM Decisions" },
  { num: "6", label: "Planet Modules" },
  { num: "Apr 1", label: "Product Hunt" },
  { num: "0→1", label: "Built Solo" },
]

export default function SIOKIDetail() {
  const statementRef = useRef()
  const metricsRef = useRef()
  const [statementVisible, setStatementVisible] = useState(false)
  const [metricsVisible, setMetricsVisible] = useState(false)

  useEffect(() => {
    const obs1 = new IntersectionObserver(e => { if (e[0].isIntersecting) setStatementVisible(true) }, { threshold: 0.2 })
    const obs2 = new IntersectionObserver(e => { if (e[0].isIntersecting) setMetricsVisible(true) }, { threshold: 0.2 })
    if (statementRef.current) obs1.observe(statementRef.current)
    if (metricsRef.current) obs2.observe(metricsRef.current)
    return () => { obs1.disconnect(); obs2.disconnect() }
  }, [])

  return (
    <section style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}` }}>

      {/* STATEMENT */}
      <div ref={statementRef} style={{
        padding: "100px 60px 80px",
        maxWidth: 1100, margin: "0 auto",
        opacity: statementVisible ? 1 : 0,
        transform: statementVisible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <p style={{
          fontFamily: "'Kaisei Tokumin', serif",
          fontWeight: 800,
          fontSize: "clamp(28px,4.5vw,62px)",
          letterSpacing: "-2px",
          lineHeight: 1.2,
          color: T.tx,
          maxWidth: 900,
        }}>
          I built a PM judgment training simulator.<br />
          <span style={{ color: T.ts, fontWeight: 400 }}>
            12 real decisions that shaped the products you use every day.
          </span><br />
          <span style={{ color: T.ac }}>
            One question: Ship It or Kill It.
          </span>
        </p>
      </div>

      {/* METRICS ROW */}
      <div ref={metricsRef} style={{
        borderTop: `0.5px solid ${T.bd}`,
        borderBottom: `0.5px solid ${T.bd}`,
        padding: "0 60px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          maxWidth: 1100, margin: "0 auto",
        }}>
          {METRICS.map(({ num, label }, i) => (
            <div key={label} style={{
              padding: "36px 0",
              borderRight: i < 3 ? `0.5px solid ${T.bd}` : "none",
              paddingRight: i < 3 ? 40 : 0,
              paddingLeft: i > 0 ? 40 : 0,
              opacity: metricsVisible ? 1 : 0,
              transform: metricsVisible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
            }}>
              <div style={{
                fontFamily: "'Kaisei Tokumin', serif",
                fontWeight: 800,
                fontSize: "clamp(24px,2.8vw,40px)",
                letterSpacing: "-1px",
                color: T.ac,
                lineHeight: 1,
                marginBottom: 8,
              }}>{num}</div>
              <div style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: T.tm,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SELECTED PROJECTS */}
      <div style={{ padding: "80px 60px 60px", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "clamp(11px,1vw,13px)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: T.ts,
        }}>Selected Projects</div>
      </div>

    </section>
  )
}

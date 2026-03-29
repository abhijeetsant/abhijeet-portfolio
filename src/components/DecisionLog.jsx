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

const DECISIONS = [
  {
    id: "d1",
    company: "Lucid",
    context: "Feature Scoping · Q1 2026",
    num: "01",
    cards: [
      { num: "01", title: "The Choice", content: "Shipped detection-only MVP with no user dashboard. Chose to validate core AI detection accuracy before investing in UI." },
      { num: "02", title: "The Sacrifice", content: "Delayed onboarding flow by 6 weeks. Early testers had no visibility into what was being flagged or why." },
      { num: "03", title: "The Signal", content: "Detection accuracy hit 91% in beta. Users forgave the bare UI because the core promise worked. Right call." },
    ],
    metrics: [
      { label: "Confidence Score", value: "72%" },
      { label: "Outcome", value: "Validated" },
      { label: "Reversibility", value: "High" },
    ],
  },
  {
    id: "d2",
    company: "Collabera",
    context: "ATS Roadmap · Q3 2024",
    num: "02",
    cards: [
      { num: "01", title: "The Choice", content: "Deprioritized bulk candidate import requested by 12 enterprise clients to ship interview scheduling automation first." },
      { num: "02", title: "The Sacrifice", content: "Three clients escalated. Sales pushed back hard. One client threatened to reduce contract scope." },
      { num: "03", title: "The Signal", content: "Interview scheduling reduced time-to-hire by 60%. The 12 clients requesting bulk import renewed at higher tiers anyway." },
    ],
    metrics: [
      { label: "Confidence Score", value: "61%" },
      { label: "Outcome", value: "60% ↓ TTH" },
      { label: "Reversibility", value: "Medium" },
    ],
  },
  {
    id: "d3",
    company: "Archemy",
    context: "AI Platform · Q1 2022",
    num: "03",
    cards: [
      { num: "01", title: "The Choice", content: "Rebuilt the explainability layer from scratch instead of patching the existing model output display clients complained about." },
      { num: "02", title: "The Sacrifice", content: "4-week engineering freeze on new features. Two planned client demos pushed. CTO was skeptical of the full rebuild." },
      { num: "03", title: "The Signal", content: "New explainability layer became the top-cited reason in client renewal conversations. 90% retention that quarter." },
    ],
    metrics: [
      { label: "Confidence Score", value: "55%" },
      { label: "Outcome", value: "90% Retention" },
      { label: "Reversibility", value: "Low" },
    ],
  },
]

function SubCard({ card, dotsCount }) {
  return (
    <div style={{
      flex: 1,
      background: T.bg,
      border: `0.5px solid ${T.bd}`,
      borderRadius: 6,
      padding: "24px 24px 32px",
      minHeight: 220,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Top row: number + dots */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <span style={{
          fontFamily: "'Kaisei Tokumin', serif",
          fontWeight: 800, fontSize: 22,
          color: T.tx, letterSpacing: "-0.5px",
        }}>{card.num}</span>
        <div style={{ display: "flex", gap: 4, paddingTop: 4 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i <= dotsCount ? T.ac : "rgba(0,0,0,0.12)",
            }} />
          ))}
        </div>
      </div>

      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.ac, flexShrink: 0 }} />
        <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 13, color: T.tx }}>{card.title}</div>
      </div>

      {/* Content */}
      <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, fontWeight: 300, color: T.ts, lineHeight: 1.8, flex: 1 }}>
        {card.content}
      </p>
    </div>
  )
}

function DecisionCard({ decision }) {
  return (
    <div style={{
      background: T.bg2,
      border: `0.5px solid ${T.bd}`,
      borderRadius: 8,
      padding: "36px 32px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.tm, marginBottom: 8 }}>
          {decision.num} · {decision.context}
        </div>
        <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: "clamp(24px,2.8vw,36px)", letterSpacing: "-1px", lineHeight: 1.1, color: T.tx }}>
          {decision.company}
        </div>
      </div>

      {/* Three sub-cards */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {decision.cards.map((card, i) => (
          <SubCard key={card.num} card={card} dotsCount={i + 1} />
        ))}
      </div>

      {/* Metrics — stacked vertically */}
      <div style={{ borderTop: `0.5px solid ${T.bd}`, maxWidth: 560, margin: "0 auto", width: "100%" }}>
        {decision.metrics.map((m, i) => (
          <div key={m.label} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: i < decision.metrics.length - 1 ? `0.5px solid ${T.bd}` : "none",
          }}>
            <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.tm }}>
              {m.label}
            </div>
            <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: 16, color: T.ac, letterSpacing: "-0.2px" }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DecisionLog() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef()
  const scrollRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewH = window.innerHeight
      // How far into the section we've scrolled (0 to 1)
      const scrolled = Math.max(0, Math.min(1, -rect.top / (sectionHeight - viewH)))
      const idx = Math.min(DECISIONS.length - 1, Math.floor(scrolled * DECISIONS.length))
      setActive(idx)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}` }}>

      {/* Header */}
      <div style={{ padding: "80px 60px 48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `0.5px solid ${T.bd}` }}>
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.tm, marginBottom: 12 }}>
            [ 03 ] · Decision Log
          </div>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-2px", lineHeight: 1.05, color: T.tx }}>
            The calls I made.<br />The price I paid.
          </div>
        </div>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: T.tm, maxWidth: 260, textAlign: "right", lineHeight: 1.7 }}>
          Real decisions. Real trade-offs.<br />What I chose and what it cost.
        </div>
      </div>

      {/* Scroll container — tall enough for 3 scroll steps */}
      <div ref={sectionRef} style={{ height: `${DECISIONS.length * 100}vh`, position: "relative" }}>

        {/* Sticky card viewport */}
        <div style={{ position: "sticky", top: 56, height: "calc(100vh - 56px)", display: "flex", alignItems: "center", padding: "0 60px" }}>

          {DECISIONS.map((d, i) => (
            <div key={d.id} style={{
              position: "absolute",
              left: 60, right: 60,
              opacity: active === i ? 1 : 0,
              transform: active === i ? "translateY(0)" : active > i ? "translateY(-40px)" : "translateY(40px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: active === i ? "auto" : "none",
            }}>
              <DecisionCard decision={d} />
            </div>
          ))}

          {/* Progress indicator */}
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
            {DECISIONS.map((d, i) => (
              <div key={d.id} style={{
                width: active === i ? 24 : 6,
                height: 6, borderRadius: 100,
                background: active === i ? T.ac : T.bd,
                transition: "width 0.3s ease, background 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

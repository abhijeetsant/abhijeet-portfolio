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

const CARDS = [
  {
    id: "ceiling",
    num: "01",
    label: "CEILING_ANALYSIS",
    sub: "The US Realization",
    content: [
      "The US gave me real skills. I learned to think in systems, to understand users deeply, to take complexity and turn it into decisions that actually move products forward. That sharpness — how to prioritize, how to align, how to build with purpose — I carry that everywhere.",
      "But skill without room to use it fully is just potential sitting in a box.",
      "The ceiling wasn't loud. It was the accumulation of small realizations — that ownership would always be limited, that the most important rooms had a different kind of entry requirement.",
    ],
    quote: "Staying hopeful inside a system not designed for you to win isn't resilience. It's delayed clarity.",
  },
  {
    id: "thesis",
    num: "02",
    label: "MARKET_THESIS",
    sub: "The India Bet",
    content: [
      "Coming back to India was not the obvious move. It was not the comfortable move. The ceiling was structural, not circumstantial. No amount of patience was going to change the fundamental limits of what I could build, own, or become within that system.",
      "India was uncertain in the way that open doors are uncertain. The ecosystem has crossed a real threshold — capital is serious, founders are sharp, and a generation of builders is solving hard problems without waiting for Western validation.",
    ],
    quote: "Being early to the right place isn't risk. It's strategy.",
  },
  {
    id: "velocity",
    num: "03",
    label: "VELOCITY_WINDOW",
    sub: "The Career Window",
    content: [
      "There is a window in every career where you are at your most dangerous — experienced enough to move fast, hungry enough to still absorb everything around you. That window doesn't stay open forever.",
      "I'm in that window right now, and I'm using it with full attention. Every chapter of a career deserves one ruthlessly honest question: is this taking me somewhere bigger? The ceiling was real. The chance is real. I chose the chance.",
    ],
    quote: "The only question is — how long are you going to wait before you ask yourself the same thing?",
  },
]

const Icons = {
  LinkedIn: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  GitHub: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  Substack: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18M3 9h18M3 14l9 7 9-7"/></svg>,
  Medium: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>,
  ProductHunt: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 8h4a3 3 0 0 1 0 6H9V8z"/><path d="M9 14v4"/></svg>,
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhijeetsant05/", icon: "LinkedIn" },
  { label: "GitHub", href: "#", icon: "GitHub" },
  { label: "Substack", href: "#", icon: "Substack" },
  { label: "Medium", href: "#", icon: "Medium" },
  { label: "Product Hunt", href: "#", icon: "ProductHunt" },
]

function Card({ card, index }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      padding: "52px 0",
      borderBottom: `0.5px solid ${T.bd}`,
    }}>
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, fontWeight: 600, color: T.ac, letterSpacing: "0.1em" }}>{card.num}</span>
        <div style={{ height: "0.5px", width: 24, background: T.bd }} />
        <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: T.tm }}>{card.label}</span>
      </div>

      {/* Sub heading */}
      <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: "clamp(18px,2vw,24px)", color: T.tx, letterSpacing: "-0.5px", marginBottom: 20, lineHeight: 1.2 }}>
        {card.sub}
      </div>

      {/* Body */}
      {card.content.map((p, i) => (
        <p key={i} style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, fontWeight: 300, color: T.ts, lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
      ))}

      {/* Pull quote */}
      <div style={{ marginTop: 24, paddingLeft: 18, borderLeft: `2px solid ${T.ac}` }}>
        <p style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(14px,1.4vw,17px)", color: T.tx, letterSpacing: "-0.2px", lineHeight: 1.6 }}>
          "{card.quote}"
        </p>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const [hoveredSocial, setHoveredSocial] = useState(null)

  return (
    <section style={{
      display: "grid",
      gridTemplateColumns: "45% 55%",
      borderTop: `0.5px solid ${T.bd}`,
      background: T.bg,
    }}>

      {/* ── LEFT: large sticky photo ── */}
      <div style={{
        position: "sticky",
        top: 56,
        height: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 36px",
        background: T.bg2,
        borderRight: `0.5px solid ${T.bd}`,
      }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          {/* Large rectangular photo */}
          <div style={{
            width: "100%",
            aspectRatio: "3/4",
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 32px 72px rgba(0,0,0,0.14)",
          }}>
            <img
              src="/abhijeet.jpeg"
              alt="Abhijeet Sant"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          {/* Name + icons below */}
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: 13, color: T.tx, letterSpacing: "-0.2px", marginBottom: 3 }}>Abhijeet Sant</div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 9, color: T.tm, letterSpacing: "0.14em", textTransform: "uppercase" }}>PM · Mumbai, IN</div>
            </div>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 6 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  onMouseEnter={() => setHoveredSocial(s.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    width: 32, height: 32,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: "50%",
                    border: `0.5px solid ${hoveredSocial === s.label ? T.ac : T.bd}`,
                    color: hoveredSocial === s.label ? T.ac : T.ts,
                    background: hoveredSocial === s.label ? "rgba(196,123,43,0.06)" : "transparent",
                    textDecoration: "none", cursor: "none",
                    transition: "all 0.2s",
                  }}>
                  {Icons[s.icon]}
                </a>
              ))}
            </div>
          </div>
          {/* Resume link */}
          <div style={{ marginTop: 14 }}>
            <a href="/sant_abhijeet.pdf" download style={{
              fontFamily: "'Geist', sans-serif", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.08em", color: T.ts,
              textDecoration: "none", cursor: "none",
              borderBottom: `0.5px solid ${T.bd}`,
              paddingBottom: 2,
              transition: "color 0.2s, border-color 0.2s",
            }}>Resume ↓</a>
          </div>
        </div>
      </div>

      {/* ── RIGHT: scrolling cards ── */}
      <div style={{ padding: "80px 60px" }}>
        {/* Section label */}
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: T.tm, marginBottom: 8 }}>[ 01 ] · About</div>
        <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(28px,3vw,40px)", color: T.tx, letterSpacing: "-1.5px", lineHeight: 1.08, marginBottom: 0 }}>
          Both paths were uncertain.<br />One just had a ceiling.
        </div>

        {/* Cards */}
        {CARDS.map((card, i) => (
          <Card key={card.id} card={card} index={i} />
        ))}

        {/* End spacer */}
        <div style={{ height: 80 }} />
      </div>
    </section>
  )
}

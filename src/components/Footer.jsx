import { useState, useEffect, useRef } from "react"

const T = {
  bg: "#F5F4F1",
  tx: "#111111",
  ts: "#666666",
  tm: "#999999",
  ac: "#C47B2B",
  bd: "rgba(0,0,0,0.08)",
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhijeetsant05/" },
  { label: "GitHub", href: "https://github.com/abhijeetsant" },
  { label: "Substack", href: "https://substack.com/@secondfurther" },
  { label: "Medium", href: "https://medium.com/@secondfurther" },
  { label: "Product Hunt", href: "https://www.producthunt.com/@abhijeetsant" },
]

function CopyField({ value, display }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, color: "#111111" }}>{display || value}</span>
      <button onClick={copy} title="Copy" style={{ background: "transparent", border: "none", cursor: "none", padding: 0, display: "flex", alignItems: "center", color: copied ? T.ac : T.tm, transition: "color 0.2s" }}>
        {copied ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        )}
      </button>
    </div>
  )
}

export default function Footer() {
  const [time, setTime] = useState("")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    const tick = () => {
      const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
      setTime(`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`)
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer id="contact">

      {/* Dark contact section */}
      <div style={{
        background: "#0f0f0f",
        padding: isMobile ? "80px 32px 80px" : "120px 60px 100px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        alignItems: "center",
        gap: isMobile ? 40 : 80,
      }}>
        <div>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-2.5px", lineHeight: 1.05, color: "#F5F4F1", marginBottom: 40 }}>
            If you've read this far, you already know how I think.
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 18, fontWeight: 300, color: "rgba(245,244,241,0.75)", lineHeight: 1.8, marginBottom: 32 }}>
            The next conversation is whether we're useful to each other. <span style={{color: '#C47B2B'}}>India's tech ecosystem is the most interesting product market in the world right now</span> — I came back to build inside it, not adjacent to it.
          </div>
          <div style={{ marginTop: 0 }}>
            <a href="https://www.linkedin.com/in/abhijeetsant05/" target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "'Geist', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#0f0f0f", background: "#F5F4F1", border: "1.5px solid #F5F4F1",
              padding: "14px 32px", borderRadius: 100, textDecoration: "none", cursor: "none",
            }}>Connect on LinkedIn →</a>
          </div>
        </div>
      </div>

      {/* Big name */}
      <div style={{ background: T.bg, overflow: "hidden", borderTop: `0.5px solid ${T.bd}` }}>
        <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(40px,12vw,180px)", letterSpacing: "-6px", lineHeight: 0.9, color: T.tx, whiteSpace: "nowrap", padding: "20px 40px" }}>
          ABHIJEET SANT
        </div>
      </div>

      {/* Two column info */}
      <div style={{ background: T.bg, padding: "60px clamp(20px,6vw,80px)", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", alignItems: "start", borderTop: "1px solid rgba(245,244,241,0.1)" }}>
        <div>
          <CopyField value="abhijeetsant@gmail.com" />
          <CopyField value="+917447242883" display="+91 744 724 2883" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, color: "#111111", textDecoration: "none", cursor: "none", lineHeight: 2 }}
              onMouseEnter={e => e.currentTarget.style.color = "#C47B2B"}
              onMouseLeave={e => e.currentTarget.style.color = "#111111"}
            >{s.label}</a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: T.bg, padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `0.5px solid ${T.bd}` }}>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: T.tm }}>© 2026 Abhijeet Sant — All rights reserved.</div>
        <button onClick={scrollToTop} style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: T.tm, background: "transparent", border: "none", cursor: "none" }}>Back to top ↑</button>
      </div>


    </footer>
  )
}

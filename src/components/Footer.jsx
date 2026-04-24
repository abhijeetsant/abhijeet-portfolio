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
  { label: "GitHub", href: "#" },
  { label: "Substack", href: "#" },
  { label: "Medium", href: "#" },
  { label: "Product Hunt", href: "#" },
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
      <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.ts }}>{display || value}</span>
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
        background: "#0d1117",
        padding: "120px 60px 100px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: 80,
      }}>
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
            Start the conversation
          </div>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-2.5px", lineHeight: 1.05, color: "#ffffff", marginBottom: 40 }}>
            Let's build something<br /><span style={{ color: T.ac }}>worth building.</span>
          </div>
          <a href="https://www.linkedin.com/in/abhijeetsant05/" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "'Geist', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#0d1117", background: "#ffffff", border: "1.5px solid #ffffff",
            padding: "14px 32px", borderRadius: 100, textDecoration: "none", cursor: "none",
          }}>Connect on LinkedIn →</a>
        </div>
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32 }}>
            I'm available for Senior PM roles<br />in India's tech ecosystem.
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Geist', sans-serif", fontSize: 12, letterSpacing: "0.06em", color: T.ac, border: `1px solid rgba(196,123,43,0.3)`, padding: "10px 20px", borderRadius: 100, background: "rgba(196,123,43,0.08)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.ac, animation: "glow 2s ease-in-out infinite" }} />
            Open to new opportunities
          </div>
        </div>
      </div>

      {/* Big name */}
      <div style={{ background: T.bg, overflow: "hidden", borderTop: `0.5px solid ${T.bd}` }}>
        <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(60px,12vw,180px)", letterSpacing: "-6px", lineHeight: 0.9, color: T.tx, whiteSpace: "nowrap", padding: "20px 40px" }}>
          ABHIJEET SANT
        </div>
      </div>

      {/* Four column info */}
      <div style={{ background: T.bg, padding: "40px 60px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 40, borderTop: `0.5px solid ${T.bd}` }}>
        <div>
          <CopyField value="abhijeetsant@gmail.com" />
          <CopyField value="+917447242883" display="+91 744 724 2883" />
        </div>
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, color: T.tm, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>My current time</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 11, color: T.tx }}>{time}</span>
            <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.tm }}>Mumbai (IST)</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.ts, lineHeight: 1.7 }}>
            Mumbai / Nagpur<br />Maharashtra, India
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.ts, textDecoration: "none", cursor: "none" }}>{s.label}</a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: T.bg, padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `0.5px solid ${T.bd}` }}>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.tm }}>© 2026 Abhijeet Sant — All rights reserved.</div>
        <button onClick={scrollToTop} style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.tm, background: "transparent", border: "none", cursor: "none" }}>Back to top ↑</button>
      </div>

      <style>{`@keyframes glow{0%,100%{opacity:1;box-shadow:0 0 6px #C47B2B}50%{opacity:0.3;box-shadow:none}}`}</style>
    </footer>
  )
}

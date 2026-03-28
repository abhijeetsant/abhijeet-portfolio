import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CustomCursor from "./CustomCursor"
import AboutSection from "./AboutSection"
import FeaturedProject from "./FeaturedProject"
import SIOKIDetail from "./SIOKIDetail"
import SelectedProjects from "./SelectedProjects"
import Writing from "./Writing"
import DecisionLog from "./DecisionLog"
import MetricMarvels from "./MetricMarvels"
import Footer from "./Footer"

const T = {
  bg: "#F5F4F1",
  bg2: "#EEECEA",
  tx: "#111111",
  ts: "#666666",
  tm: "#999999",
  ac: "#C47B2B",
  bd: "rgba(0,0,0,0.08)",
}

const WORDS = ["Ambiguity-reducer", "Systems thinker", "0→1 builder", "Clarity architect"]
const PILL_MAP = [0, 1, 2, 0]

const LINES = [
  { t: "7 years building products.", hl: [[0, 7]] },
  { t: "From data to decisions.", hl: [[5, 9], [13, 23]] },
  { t: "From the US to India — by choice.", hl: [[12, 14], [18, 23]] },
  { t: "Built Lucid — AI safety for Indian families.", hl: [[6, 11]] },
  { t: "Now building SIOKI to train PM judgment.", hl: [[4, 11]] },
]

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Decisions", href: "#decisions" },
  { label: "Contact", href: "#contact" },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

function renderHL(text, shown, hl) {
  return text.slice(0, shown).split("").map((ch, i) => {
    const inHL = hl && hl.some(([s, e]) => i >= s && i < e)
    return inHL ? <span key={i} style={{ color: T.ac }}>{ch}</span> : <span key={i}>{ch}</span>
  })
}

export default function App() {
  // Clock
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => {
      const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")} IST`)
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])

  // Cycling word
  const [wi, setWi] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => { setWi(w => (w + 1) % WORDS.length); setWordVisible(true) }, 320)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  // Typewriter
  const [li, setLi] = useState(0)
  const [ci, setCi] = useState(0)
  const [erasing, setErasing] = useState(false)
  const [done, setDone] = useState(false)
  const [convShow, setConvShow] = useState(false)
  const [ctaShow, setCtaShow] = useState(false)
  const [started, setStarted] = useState(false)
  const tw = useRef({ li: 0, ci: 0, erasing: false, done: false })
  const s2Ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) setStarted(true)
    }, { threshold: 0.2 })
    if (s2Ref.current) obs.observe(s2Ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || tw.current.done) return
    const s = tw.current
    const line = LINES[s.li]
    const delay = s.ci === 0 && !s.erasing ? 600 : s.erasing ? 16 : 38
    const id = setTimeout(() => {
      if (!s.erasing) {
        if (s.ci <= line.t.length) { s.ci++; setCi(s.ci) }
        else if (s.li < LINES.length - 1) setTimeout(() => { s.erasing = true; setErasing(true) }, 850)
        else { s.done = true; setDone(true); setTimeout(() => { setConvShow(true); setTimeout(() => setCtaShow(true), 700) }, 400) }
      } else {
        if (s.ci > 0) { s.ci--; setCi(s.ci) }
        else { s.erasing = false; setErasing(false); s.li++; setLi(s.li); s.ci = 0; setCi(0) }
      }
    }, delay)
    return () => clearTimeout(id)
  }, [started, ci, li, erasing, done])

  const skip = () => {
    tw.current.done = true; setDone(true)
    tw.current.li = LINES.length - 1; setLi(LINES.length - 1)
    tw.current.ci = LINES[LINES.length - 1].t.length; setCi(LINES[LINES.length - 1].t.length)
    setConvShow(true); setTimeout(() => setCtaShow(true), 400)
  }

  const currentLine = LINES[li]

  return (
    <div style={{ background: T.bg, cursor: "none", fontFamily: "'Geist', sans-serif" }}>
      <CustomCursor />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56, padding: "0 60px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(245,244,241,0.92)", backdropFilter: "blur(16px)", borderBottom: `0.5px solid ${T.bd}` }}>
        <button onClick={() => scrollTo("hero")} style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: 15, color: T.tx, letterSpacing: "-0.3px", background: "none", border: "none", cursor: "none" }}>Abhijeet Sant</button>
        <div style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href.replace("#", ""))} style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: T.ts, background: "none", border: "none", cursor: "none" }}>{l.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Geist', sans-serif", fontSize: 12, color: T.ts }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.ac }} />
          {time}
        </div>
      </nav>

      {/* S1 — IDENTITY */}
      <motion.section 
        id="hero" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 60px", overflow: "hidden" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 72, maxWidth: 1100, width: "100%" }}>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ flexShrink: 0, position: "relative" }}
          >
            <div style={{ width: 380, height: 380, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(196,123,43,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.08)" }}>
              <img src="/abhijeet.jpeg" alt="Abhijeet Sant" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div style={{ position: "absolute", bottom: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: T.ac, border: `3px solid ${T.bg}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: T.bg, fontWeight: 700 }}>✓</div>
          </motion.div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ flex: 1, minWidth: 0 }}
          >
            <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, color: T.ts, marginBottom: 10 }}>
              Hi, I'm <span style={{ color: T.tx, fontWeight: 500 }}>@abhijeetsant,</span>
            </div>
            <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(40px,4.9vw,72px)", letterSpacing: "-1.7px", lineHeight: 1.02, marginBottom: 12, whiteSpace: "nowrap" }}>
              <span style={{ color: T.ac, display: "inline-block", opacity: wordVisible ? 1 : 0, transform: wordVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.32s ease, transform 0.32s ease", whiteSpace: "nowrap" }}>{WORDS[wi]}</span>
            </div>
            <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 400, fontSize: "clamp(18px,2.3vw,30px)", letterSpacing: "-0.5px", lineHeight: 1.35, color: T.ts, marginBottom: 28 }}>
              who turns complexity into<br />decisive product clarity.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Product Manager", "Systems Thinker", "0→1 Builder"].map((p, i) => (
                <div key={p} style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, letterSpacing: "0.05em", color: PILL_MAP[wi] === i ? T.ac : T.ts, background: PILL_MAP[wi] === i ? "rgba(196,123,43,0.08)" : "transparent", border: `0.5px solid ${PILL_MAP[wi] === i ? "rgba(196,123,43,0.4)" : T.bd}`, padding: "9px 20px", borderRadius: 100, transition: "all 0.3s", cursor: "none", fontWeight: PILL_MAP[wi] === i ? 500 : 400 }}>{p}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* S2 — TYPEWRITER */}
      <section id="typewriter" ref={s2Ref} style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 60px", textAlign: "center", borderTop: `0.5px solid ${T.bd}`, background: T.bg2, position: "relative", overflow: "hidden" }}>
        <button onClick={skip} style={{ position: "absolute", top: 24, right: 60, fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.tm, background: "transparent", border: `0.5px solid ${T.bd}`, padding: "5px 14px", borderRadius: 20, cursor: "none" }}>Skip →</button>
        <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: "clamp(26px,3.8vw,48px)", letterSpacing: "-1.5px", lineHeight: 1.35, color: T.ts, maxWidth: 700, minHeight: "2.8em", marginBottom: 48 }}>
          {renderHL(currentLine.t, ci, currentLine.hl)}
          {!done && <span style={{ display: "inline-block", width: 2, height: "0.85em", background: T.ac, marginLeft: 3, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />}
        </div>
        <div style={{ opacity: convShow ? 1 : 0, transition: "opacity 0.8s ease", marginBottom: 36 }}>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(18px,2.2vw,26px)", color: T.tx, letterSpacing: "-0.5px", marginBottom: 10 }}>This still feels like day one.</div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, fontWeight: 300, color: T.ts, lineHeight: 1.75, marginBottom: 10 }}>Harder problems. End-to-end ownership.<br />Built in the US — building in India now, by choice.</div>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: "clamp(16px,2vw,22px)", color: T.ac, letterSpacing: "-0.3px" }}>Ready for the right team.</div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", opacity: ctaShow ? 1 : 0, transition: "opacity 0.8s ease" }}>
          {[
            { label: "📂 My work", id: "projects" },
            { label: "🧠 How I think", id: "decisions" },
            { label: "📄 My path", id: "about" },
            { label: "✉️ Let's talk", id: "contact", primary: true },
          ].map(({ label, id, primary }) => (
            <button key={label} onClick={() => scrollTo(id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "'Geist', sans-serif", fontSize: 12, fontWeight: primary ? 500 : 400, letterSpacing: "0.06em", color: primary ? T.bg : T.ts, background: primary ? T.ac : "rgba(0,0,0,0.03)", border: `0.5px solid ${primary ? T.ac : T.bd}`, padding: "11px 24px", borderRadius: 100, cursor: "none" }}>{label}</button>
          ))}
        </div>
      </section>

      {/* S3 — ABOUT */}
      <div id="about"><AboutSection /></div>

      {/* S4 — FEATURED PROJECT */}
      <div id="work"><FeaturedProject /></div>

      {/* S5 — SIOKI DETAIL */}
      <SIOKIDetail />

      {/* S6 — SELECTED PROJECTS */}
      <div id="projects"><SelectedProjects /></div>

      {/* S7 — WRITING */}
      <Writing />

      {/* S8 — DECISION LOG */}
      <div id="decisions"><DecisionLog /></div>

      {/* S9 — METRIC MARVELS */}
      <MetricMarvels />

      {/* FOOTER */}
      <div id="contact"><Footer /></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kaisei+Tokumin:wght@400;700;800&family=Geist:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  )
}


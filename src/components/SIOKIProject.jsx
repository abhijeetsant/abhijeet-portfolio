import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function ISTClock() {
  const [clock, setClock] = useState('')
  useEffect(() => {
    const tick = () => {
      const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      setClock(
        `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')} IST`
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
}

export default function SIOKIProject() {
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const cur = document.getElementById('cur')
    const ring = document.getElementById('ring')
    const move = e => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', move)
    let raf
    const loop = () => {
      if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px' }
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      {/* Cursor */}
      <div id="cur" style={{ position: 'fixed', width: 7, height: 7, background: '#C47B2B', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)' }} />
      <div id="ring" style={{ position: 'fixed', width: 32, height: 32, border: '1px solid rgba(196,123,43,0.35)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)' }} />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 56,
        borderBottom: '0.5px solid rgba(255,255,255,0.07)',
        background: 'rgba(15,15,15,0.85)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button
            onClick={() => window.history.back()}
            style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Geist, sans-serif', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}
          >
            ←
          </button>
          <div style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em' }}>AS</div>
        </div>
        <div style={{ display: 'flex', gap: 40, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {['About', 'Work', 'Decisions', 'Contact'].map(link => (
            <a key={link} href={`/#${link.toLowerCase()}`} style={{ fontSize: 20, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{link}</a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em' }}>
          <ISTClock />
        </div>
      </nav>

      {/* SECTION 1 — Full-bleed hero image */}
      <section style={{ position: 'relative', width: '100%', height: '90vh', overflow: 'hidden', marginTop: 56 }}>
        <img
          src="https://ph-files.imgix.net/ae998bf8-24a1-462f-80e0-90658f9c0989.jpeg"
          alt="SIOKI hero"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 'clamp(20px, 6vw, 80px)' }}>
          <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5F4F1', opacity: 0.6 }}>
            SIOKI · 2026
          </div>
          <div style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 600, color: '#F5F4F1', lineHeight: 1.05, marginTop: 12 }}>
            Ship It or Kill It
          </div>
          <div style={{ fontFamily: 'Kaisei Tokumin, serif', fontStyle: 'italic', fontSize: 20, color: 'rgba(245,244,241,0.7)', marginTop: 16 }}>
            PM judgment training through real product decisions.
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', fontFamily: 'Geist, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F5F4F1' }}>
          DISCOVER PROJECT ↓
        </div>
      </section>

      {/* SECTION 2 — Meta strip */}
      <section style={{ background: '#F5F4F1', padding: `48px clamp(20px, 6vw, 80px)`, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
          {[
            { label: 'CLIENT', value: 'Solo Project', link: null },
            { label: 'TIMELINE', value: '3 weeks · Mar–Apr 2026', link: null },
            { label: 'STACK', value: 'HTML · JS · Vercel', link: null },
            { label: 'LIVE AT', value: 'sioki.vercel.app', link: 'https://sioki.vercel.app/' },
          ].map(({ label, value, link }) => (
            <div key={label} style={{ flex: '1 1 160px' }}>
              <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a756f', marginBottom: 8 }}>
                {label}
              </div>
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Geist, sans-serif', fontSize: 16, color: '#C47B2B', textDecoration: 'none' }}>
                  {value}
                </a>
              ) : (
                <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 16, color: '#111111' }}>{value}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Overview */}
      <section style={{ background: '#F5F4F1', padding: `100px clamp(20px, 6vw, 80px)` }}>
        <div style={{ maxWidth: 860 }}>
          <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 40 }}>
            Project Overview
          </div>
          <p style={{ fontFamily: 'Kaisei Tokumin, serif', fontStyle: 'italic', fontSize: 26, lineHeight: 1.6, color: '#111111' }}>
            PMs are evaluated on their decisions every day. Nobody trains them to make better ones. SIOKI puts you inside 6 real product decisions — Instagram, Spotify, Uber, Slack, and more. Make the call first. See what history judged second.
          </p>
          <p style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 20, lineHeight: 1.75, color: '#555', marginTop: 32 }}>
            Built solo in 3 weeks as a returning India PM proving craft through product. The mechanic is simple: anonymized case, one binary call, one reasoning pick, then the reveal. At the end, your PM archetype: ORBIT, PULSE, SHIELD, FLARE, PRISM, or SIGNAL — based on how you actually decided, not what you say about yourself.
          </p>
        </div>
      </section>

      {/* SECTION 4 — Full-width image */}
      <section style={{ width: '100%', height: '70vh', overflow: 'hidden' }}>
        <img
          src="https://ph-files.imgix.net/dc77d84a-0a2b-4eb5-91ed-1065a175ae5c.png"
          alt="SIOKI screen"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

      {/* SECTION 5 — Two-image row */}
      <section style={{ background: '#0f0f0f', display: 'flex' }}>
        <img
          src="https://ph-files.imgix.net/f1148520-0031-420c-a626-49db9658f08e.png"
          alt="SIOKI case view"
          style={{ display: 'block', width: '50%', height: '65vh', objectFit: 'cover' }}
        />
        <img
          src="https://ph-files.imgix.net/db4b8141-ced4-4f18-b597-00ad3472a65b.png"
          alt="SIOKI archetype reveal"
          style={{ display: 'block', width: '50%', height: '65vh', objectFit: 'cover' }}
        />
      </section>

      {/* SECTION 6 — Approach */}
      <section style={{ background: '#F5F4F1', padding: `100px clamp(20px, 6vw, 80px)` }}>
        <div style={{ maxWidth: 860 }}>
          <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 40 }}>
            Approach
          </div>
          <p style={{ fontFamily: 'Kaisei Tokumin, serif', fontStyle: 'italic', fontSize: 26, lineHeight: 1.6, color: '#111111' }}>
            The insight behind SIOKI: stated preferences lie. Watching how someone decides across real cases — under time pressure, with incomplete information — reveals actual PM identity better than any self-assessment or framework exercise.
          </p>
          <p style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 20, lineHeight: 1.75, color: '#555', marginTop: 32 }}>
            I anonymized the cases deliberately so you can't Google the answer. Context and constraints load first. You make the call. Then you pick what drove your thinking: Data, Instinct, Risk, or Conviction. Six cases. Six data points. One archetype reveal.
          </p>
        </div>
      </section>

      {/* SECTION 7 — Full-width image */}
      <section style={{ width: '100%', height: '70vh', overflow: 'hidden' }}>
        <img
          src="https://ph-files.imgix.net/ffcb6c27-325d-47ad-9ebe-a9a86dae91b7.png"
          alt="SIOKI results"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

      {/* SECTION 8 — Video embed */}
      <section style={{ background: '#0f0f0f', padding: `100px clamp(20px, 6vw, 80px)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a756f' }}>
            The Product in Motion
          </div>
          <div style={{ marginTop: 48, position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8 }}>
            <iframe
              src="https://www.youtube.com/embed/xpKRFmErpY4"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              title="SIOKI walkthrough"
            />
          </div>
        </div>
      </section>

      {/* SECTION 9 — Maker quote */}
      <section style={{ background: '#F5F4F1', padding: `100px clamp(20px, 6vw, 80px)` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <img
            src="/about.jpg"
            alt="Abhijeet Sant"
            style={{ display: 'block', width: '100%', height: 500, objectFit: 'cover', objectPosition: 'top', borderRadius: 8, marginBottom: 60 }}
          />
          <p style={{ fontFamily: 'Kaisei Tokumin, serif', fontStyle: 'italic', fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.4, color: '#111111' }}>
            "Building SIOKI was about proving that a PM who thinks clearly can also build clearly. The product is the portfolio piece. The archetype reveal is the proof of craft."
          </p>
          <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, color: '#7a756f', marginTop: 32 }}>
            — Abhijeet Sant, Senior PM
          </div>
        </div>
      </section>

      {/* SECTION 10 — Last image + CTA */}
      <section>
        <div style={{ width: '100%', height: '60vh', overflow: 'hidden' }}>
          <img
            src="https://ph-files.imgix.net/539ec37e-bd18-4036-bc9c-7b83a5bd7338.png"
            alt="SIOKI final"
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ background: '#0f0f0f', padding: `80px clamp(20px, 6vw, 80px)` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 60 }}>
            <div>
              <a
                href="https://sioki.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'baseline', gap: 16, textDecoration: 'none' }}
              >
                <span style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 48, color: '#F5F4F1', lineHeight: 1.1 }}>Play SIOKI</span>
                <span style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 48, color: '#C47B2B', lineHeight: 1.1 }}>→</span>
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
              <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a756f' }}>
                Next Project →
              </div>
              <Link to="/projects/lucid" style={{ textDecoration: 'none' }}>
                <div style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 28, color: '#F5F4F1', textAlign: 'right' }}>
                  Lucid · AI Safety
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

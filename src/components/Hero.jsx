import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const CYCLING_WORDS = [
  'Ambiguity-reducer',
  'Systems thinker',
  '0→1 builder',
  'Clarity architect'
]

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
  })
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [clock, setClock] = useState('')
  const [isWide, setIsWide] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % CYCLING_WORDS.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const tick = () => {
      const ist = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      const d = new Date(ist)
      const h = String(d.getHours()).padStart(2, '0')
      const m = String(d.getMinutes()).padStart(2, '0')
      const s = String(d.getSeconds()).padStart(2, '0')
      setClock(`${h}:${m}:${s} IST`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = e => setIsWide(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

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
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Cursor */}
      <div id="cur" style={{
        position: 'fixed', width: 7, height: 7,
        background: 'var(--amber)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)'
      }} />
      <div id="ring" style={{
        position: 'fixed', width: 32, height: 32,
        border: '1px solid rgba(196,123,43,0.35)',
        borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9998, transform: 'translate(-50%,-50%)'
      }} />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 48px',
        height: 56, borderBottom: '0.5px solid var(--border-dark)',
        background: 'rgba(15,15,15,0.85)',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 30, fontWeight: 700, color: 'var(--white-hi)', letterSpacing: '0.04em' }}>AS</div>
        <div style={{ display: 'flex', gap: 40, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {['About', 'Work', 'Decisions', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              fontSize: 20, color: 'var(--white-mid)', textDecoration: 'none',
              letterSpacing: '0.08em', textTransform: 'uppercase'
            }}>{link}</a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--white-lo)', letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums' }}>
          {clock}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '56px 0 0',
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg-dark)'
      }}>

        {/* Photo */}
        <div style={{
          position: 'absolute', top: 56, right: 0,
          width: '60%', height: 'calc(100vh - 56px)', overflow: 'hidden'
        }}>
          <img
            src="/hero-photo.jpg"
            alt="Abhijeet Sant"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: '20% 8%',
              filter: 'grayscale(100%)', opacity: 0.72
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--bg-dark) 0%, transparent 25%)',
            zIndex: 1
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, transparent, var(--bg-dark))',
            zIndex: 1
          }} />
        </div>

        {/* Year tag */}
        <motion.div
          initial="hidden" animate="show"
          variants={rise} custom={1.2}
          style={{
            position: 'absolute', top: 80, right: 48,
            zIndex: 20, fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--white-lo)',
            writingMode: 'vertical-rl'
          }}>
          Mumbai · India
        </motion.div>

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: '0 48px 72px 80px',
          maxWidth: 800, display: 'flex',
          flexDirection: 'column', justifyContent: 'flex-end',
          minHeight: 'calc(100vh - 56px)'
        }}>

          <motion.div
            initial="hidden" animate="show"
            variants={rise} custom={0.3}
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 20 }}>
            Product Manager
          </motion.div>

          <motion.div
            initial="hidden" animate="show"
            variants={rise} custom={0.5}
            style={{
              fontFamily: 'Kaisei Tokumin, serif',
              fontSize: 'clamp(60px, 6.5vw, 92px)',
              fontWeight: 800, lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--white-hi)', marginBottom: 32,
              whiteSpace: isWide ? 'nowrap' : 'normal'
            }}>
            Abhijeet Sant
          </motion.div>

          <motion.div
            initial="hidden" animate="show"
            variants={rise} custom={0.7}
            style={{
              fontFamily: 'Kaisei Tokumin, serif',
              fontSize: 'clamp(22px, 2.8vw, 36px)',
              fontWeight: 400, lineHeight: 1.2,
              color: 'var(--white-mid)', marginBottom: 44
            }}>
            <span style={{ color: 'var(--white-hi)', fontWeight: 700 }}>Ambiguity in.</span><br />
            <span style={{ color: 'var(--white-hi)', fontWeight: 700 }}>Clarity out.</span><br />
            Shipped.
          </motion.div>

          <motion.div
            initial="hidden" animate="show"
            variants={rise} custom={1.0}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['0→1 Builder', 'Systems Thinker', 'Data-led'].map(pill => (
                <span key={pill} style={{
                  fontSize: 11, padding: '7px 16px',
                  border: '0.5px solid rgba(196,123,43,0.3)',
                  color: 'rgba(196,123,43,0.7)', borderRadius: 100,
                  letterSpacing: '0.08em', textTransform: 'uppercase'
                }}>{pill}</span>
              ))}
            </div>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--white-lo)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 0.5, background: 'var(--white-lo)' }} />
              Scroll
            </div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
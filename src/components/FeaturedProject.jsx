import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const BRANDS = [
  'Instagram', 'Apple', 'Amazon', 'Netflix', 'Twitter',
  'Microsoft', 'Uber', 'Spotify', 'Facebook', 'Slack', 'Dropbox', 'Pinterest'
]

export default function FeaturedProject() {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [tickerSlow, setTickerSlow] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const ticker = [...BRANDS, ...BRANDS]

  return (
    <section id="work" style={{ background: 'var(--bg-light)' }}>

      {/* FEATURED PROJECT label */}
      <div style={{ textAlign: 'center', padding: '160px 80px 120px' }}>
        <span style={{
          fontFamily: 'Kaisei Tokumin, serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          color: '#111111',
          letterSpacing: 0,
        }}>
          Featured project.
        </span>
      </div>

      {/* Full bleed SIOKI image */}
      <Link
        to="/projects/sioki"
        data-cursor="view-project"
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '65vh',
          overflow: 'hidden',
          cursor: 'none',
          textDecoration: 'none'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url(/sioki-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        </div>

      </Link>

      {/* Quote — completely separate, on light bg */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        style={{
          background: 'var(--bg-light)',
          padding: '80px 80px 0',
          textAlign: 'center',
          borderTop: '0.5px solid var(--border-light)',
        }}
      >
        <p style={{
          fontFamily: 'Kaisei Tokumin, serif',
          fontSize: 'clamp(32px, 3.5vw, 52px)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.35,
          maxWidth: 760,
          margin: '0 auto',
        }}>
          6 real decisions. The companies that made them.<br />
          The lessons they left behind.
        </p>
      </motion.div>

      {/* Ticker */}
      <div style={{
        background: 'var(--bg-light)',
        paddingTop: 100,
        paddingBottom: 92,
      }}>
        <div
          style={{ overflow: 'hidden', width: '100%', position: 'relative' }}
        >
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
            background: 'linear-gradient(to right, #F5F4F1, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
            background: 'linear-gradient(to left, #F5F4F1, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'marquee 40s linear infinite',
            }}
            onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
          >
            {ticker.map((brand, i) => (
              <div
                key={i}
                style={{
                  padding: '0 48px',
                  fontFamily: 'Kaisei Tokumin, serif',
                  fontSize: 'clamp(20px, 2.2vw, 32px)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  borderRight: '0.5px solid var(--border-light)',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  height: 56,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </section>
  )
}
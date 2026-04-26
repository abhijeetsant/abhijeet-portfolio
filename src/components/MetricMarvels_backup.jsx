import { useState, useEffect, useRef } from 'react'

// ─── Icons ──────────────────────────────────────────────────────────────────

const IconImpact = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconSpeed = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconScale = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="6" height="18" rx="1" />
    <rect x="9" y="8" width="6" height="13" rx="1" />
    <rect x="16" y="13" width="6" height="8" rx="1" />
  </svg>
)

// ─── Data ────────────────────────────────────────────────────────────────────

const METRICS = [
  {
    id: 'impact',
    label: 'Business Impact',
    num: '90%',
    icon: IconImpact,
    items: [
      { num: '90%', label: 'Retention Rate', company: 'Archemy' },
      { num: '88%', label: 'Forecast Accuracy', company: 'Collabera' },
    ],
  },
  {
    id: 'speed',
    label: 'Execution Speed',
    num: '60%',
    icon: IconSpeed,
    items: [
      { num: '60%', label: '↓ Time-to-Hire', company: 'Collabera' },
      { num: '45%', label: '↓ Onboarding Time', company: 'LTI' },
    ],
  },
  {
    id: 'scale',
    label: 'Product Scale',
    num: '10M+',
    icon: IconScale,
    items: [
      { num: '10M+', label: 'Daily Transactions', company: 'LTI' },
      { num: '20%', label: 'YoY Growth', company: 'Collabera' },
    ],
  },
]

// ─── Row ─────────────────────────────────────────────────────────────────────

function MetricRow({ metric, index }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  const Icon = metric.icon

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setVisible(true)
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '72px 0',
        borderBottom: '0.5px solid var(--border-light)',
        gap: 80,
      }}
    >
      {/* ── Left: icon + label + big number ── */}
      <div>

        {/* Icon + label row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
          color: 'var(--text-muted)',
        }}>
          <Icon />
          <span style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            {metric.label}
          </span>
        </div>

        {/* Big number */}
        <div style={{
          fontFamily: 'Kaisei Tokumin, serif',
          fontWeight: 800,
          fontSize: 'clamp(72px, 10vw, 140px)',
          letterSpacing: '-4px',
          lineHeight: 1,
          color: 'var(--text-primary)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(20px)',
          transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.1}s`,
          transformOrigin: 'center center',
        }}>
          {metric.num}
        </div>
      </div>

      {/* ── Right: two granular metrics ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {metric.items.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              alignItems: 'baseline',
              gap: 24,
              padding: '20px 0',
              borderBottom: i < metric.items.length - 1 ? '0.5px solid var(--border-light)' : 'none',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: `opacity 0.6s ease ${index * 0.1 + 0.25 + i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.25 + i * 0.1}s`,
            }}
          >
            {/* Granular number */}
            <span style={{
              fontFamily: 'Kaisei Tokumin, serif',
              fontWeight: 800,

              fontSize: 'clamp(36px, 4vw, 56px)',
              letterSpacing: '-1.5px',
              color: 'var(--amber)',
              lineHeight: 1,
            }}>
              {item.num}
            </span>

            {/* Label + company */}
            <div>
              <div style={{
                fontFamily: 'Geist, sans-serif',

                fontSize: 'clamp(16px, 1.6vw, 20px)',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                lineHeight: 1.3,
                marginBottom: 4,
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: 12,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                {item.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

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
    <section style={{
      background: 'var(--bg-light)',
      borderTop: '0.5px solid var(--border-light)',
      padding: '0 80px',
    }}>

      {/* Header */}
      <div ref={headerRef} style={{
        padding: '80px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <div>
          <div style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--amber)',
            marginBottom: 14,
          }}>
            Metric Marvels
          </div>
        </div>
      </div>

      {/* Rows */}
      {METRICS.map((metric, i) => (
        <MetricRow key={metric.id} metric={metric} index={i} />
      ))}

      <div style={{ height: 80 }} />
    </section>
  )
}

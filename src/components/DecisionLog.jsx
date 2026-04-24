import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DECISIONS = [
  {
    id: 'd3',
    company: 'Archemy',
    context: 'AI Platform · Q1 2022',
    title: 'Rebuild the explainability\nlayer from scratch.',
    body: '4-week engineering freeze. Two planned client demos pushed. CTO was skeptical. New layer became the top-cited reason in renewal conversations. 90% retention that quarter.',
    num: '03',
    metrics: [
      { label: 'Confidence Score', value: '55%' },
      { label: 'Outcome', value: '90% Retention' },
      { label: 'Reversibility', value: 'Low' },
    ],
  },
  {
    id: 'd2',
    company: 'Collabera',
    context: 'ATS Roadmap · Q3 2024',
    title: 'Deprioritize bulk import.\nShip scheduling first.',
    body: '12 enterprise clients pushed back hard. One threatened to reduce contract scope. Interview scheduling cut time-to-hire by 60%. They renewed at higher tiers anyway.',
    num: '02',
    metrics: [
      { label: 'Confidence Score', value: '61%' },
      { label: 'Outcome', value: '60% ↓ TTH' },
      { label: 'Reversibility', value: 'Medium' },
    ],
  },
  {
    id: 'd1',
    company: 'Lucid',
    context: 'Feature Scoping · Q1 2026',
    title: 'Ship detection only.\nNo dashboard yet.',
    body: 'Chose to validate core AI accuracy before investing in UI. Early testers had no visibility into what was being flagged — but detection hit 91% in beta. Right call.',
    num: '01',
    metrics: [
      { label: 'Confidence Score', value: '72%' },
      { label: 'Outcome', value: 'Validated' },
      { label: 'Reversibility', value: 'High' },
    ],
  },
]

export default function DecisionLog() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const cards = gsap.utils.toArray('.decision-card', containerRef.current)
    const total = cards.length

    // Set initial stack state — cards behind peek above
    cards.forEach((card, i) => {
      const offset = (total - 1 - i) * 16
      gsap.set(card, {
        y: -offset,
        scale: 1 - (total - 1 - i) * 0.03,
        opacity: i === total - 1 ? 1 : i === total - 2 ? 0.6 : 0.3,
        zIndex: i,
      })
    })

    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1.5,
      }
    })

    // Animate each card off — from top card downward
    cards.slice().reverse().forEach((card, i) => {
      if (i < total - 1) {
        tl.to(card, {
          y: '-130%',
          rotation: 0,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        }, i * 1.2)

        // Bring next card to front
        const nextCard = cards[total - 2 - i]
        if (nextCard) {
          tl.to(nextCard, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          }, i * 1.2)
        }
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section ref={sectionRef} id="decisions" style={{ background: 'var(--bg-light)' }}>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '80px 80px 64px',
      }}>
        <div style={{
          fontFamily: 'Kaisei Tokumin, serif',
          fontWeight: 800,
          fontSize: 'clamp(32px, 4vw, 52px)',
          letterSpacing: '-1px',
          lineHeight: 1.05,
          color: 'var(--text-muted)',
        }}>
          The calls I made.
        </div>
      </div>

      {/* Card stack container */}
      <div
        ref={containerRef}
        style={{
          padding: '0 80px 120px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 900,
          height: 'calc(100vh - 280px)',
        }}>
          {DECISIONS.map((d, i) => (
            <div
              key={d.id}
              className="decision-card"
              style={{
                opacity: i === DECISIONS.length - 1 ? 1 : 0,
                zIndex: DECISIONS.length - 1 - i,
                transform: `translateY(${(DECISIONS.length - 1 - i) * -16}px) scale(${1 - (DECISIONS.length - 1 - i) * 0.03})`,
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 32,
                background: '#0f0f0f',
                borderRadius: 20,
                padding: '48px 52px',
                color: 'white',
                overflow: 'hidden',
                willChange: 'transform, opacity',
              }}
            >
              {/* Background number */}
              <div style={{
                position: 'absolute',
                top: 32, right: 48,
                fontFamily: 'Kaisei Tokumin, serif',
                fontSize: 80, fontWeight: 800,
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1, userSelect: 'none',
              }}>
                {d.num}
              </div>

              {/* Context */}
              <div style={{
                fontSize: 10, letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 20,
                fontFamily: 'Geist, sans-serif',
              }}>
                {d.company} · {d.context}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'Kaisei Tokumin, serif',
                fontSize: 'clamp(28px, 3.4vw, 42px)',
                fontWeight: 800, lineHeight: 1.15,
                color: 'rgba(255,255,255,0.92)',
                marginBottom: 20, whiteSpace: 'pre-line',
              }}>
                {d.title}
              </div>

              {/* Body */}
              <div style={{
                fontSize: 16, lineHeight: 1.75,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: 560,
                fontFamily: 'Geist, sans-serif',
                marginBottom: 28,
              }}>
                {d.body}
              </div>

              {/* Metrics */}
              <div style={{
                display: 'flex', gap: 40,
                borderTop: '0.5px solid rgba(255,255,255,0.08)',
                paddingTop: 20,
              }}>
                {d.metrics.map(m => (
                  <div key={m.label}>
                    <div style={{
                      fontSize: 10, letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.3)',
                      marginBottom: 4,
                      fontFamily: 'Geist, sans-serif',
                    }}>
                      {m.label}
                    </div>
                    <div style={{
                      fontFamily: 'Kaisei Tokumin, serif',
                      fontSize: 16, fontWeight: 700,
                      color: 'var(--amber)',
                    }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

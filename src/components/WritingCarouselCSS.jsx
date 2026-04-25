import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"

const T = {
  bg: "#F5F4F1",
  bg2: "#EEECEA",
  tx: "#111111",
  ts: "#666666",
  tm: "#999999",
  ac: "#C47B2B",
  bd: "rgba(0,0,0,0.08)",
}

const ARTICLES = [
  {
    id: 1,
    platform: "Substack",
    tag: "Evidence Series · Best Seller",
    title: "Who Is LinkedIn Jobs Actually Optimised For?",
    desc: "A forensic teardown of LinkedIn's job recommendation algorithm — and who it's actually built to serve.",
    href: "https://open.substack.com/pub/secondfurther/p/who-is-linkedin-jobs-actually-optimised",
    featured: true,
  },
  {
    id: 2,
    platform: "Medium · Bootcamp",
    tag: "Published",
    title: "You Were Not Failing the Job Search. The Job Search Was Succeeding — Just Not for You.",
    desc: "The structural reason most job searches fail — and why the system is working exactly as designed.",
    href: "https://medium.com/design-bootcamp/you-were-not-failing-the-job-search-the-job-search-was-succeeding-just-not-for-you-8afdc9834eea",
    featured: false,
  },
  {
    id: 3,
    platform: "Substack",
    tag: "Evidence Series",
    title: "The Real Reason LinkedIn Recruiter Underperforms",
    desc: "Evidence-backed analysis of why LinkedIn's recruiter product consistently disappoints.",
    href: "https://open.substack.com/pub/secondfurther/p/linkedin-recruiter-certainty-problem",
    featured: false,
  },
  {
    id: 4,
    platform: "Substack",
    tag: "Standalone",
    title: "YouTube Didn't Build a Moat. They Found One.",
    desc: "How YouTube's defensibility came not from what they built, but from what they didn't have to.",
    href: "https://open.substack.com/pub/secondfurther/p/youtube-didnt-build-a-moat-they-found",
    featured: false,
  },
  {
    id: 5,
    platform: "Substack",
    tag: "Standalone",
    title: "The Deferral Engine",
    desc: "On the systems that organisations build — consciously or not — to delay decisions indefinitely.",
    href: "https://open.substack.com/pub/secondfurther/p/the-deferral-engine",
    featured: false,
  },
  {
    id: 6,
    platform: "Medium",
    tag: "Insight",
    title: "Why Most Business Dashboards Fail Decision-Making",
    desc: "Even the beautiful ones. A dissection of why dashboards optimise for appearance over decisions.",
    href: "https://medium.com/@secondfurther/most-dashboards-are-beautiful-almost-none-of-them-work-484fb2018d9d",
    featured: false,
  },
]

const TOTAL = ARTICLES.length
const RADIUS = 480

export default function WritingCarouselCSS() {
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragDelta = useRef(0)
  const headerRef = useRef()
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  const prev = useCallback(() => setActive(i => (i - 1 + TOTAL) % TOTAL), [])
  const next = useCallback(() => setActive(i => (i + 1) % TOTAL), [])

  const onPointerDown = (e) => {
    setDragging(true)
    dragStartX.current = e.clientX
    dragDelta.current = 0
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  const onPointerUp = () => {
    if (dragging) {
      if (dragDelta.current < -60) next()
      else if (dragDelta.current > 60) prev()
    }
    setDragging(false)
    dragDelta.current = 0
  }

  return (
    <section style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}`, paddingBottom: 120, overflow: 'hidden' }}>
      
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: "80px 60px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          maxWidth: 1100,
          margin: "0 auto",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.tm, marginBottom: 12 }}>
            [ 02 ] · Writing
          </div>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,44px)", letterSpacing: "-1.5px", color: T.tx, lineHeight: 1.08 }}>
            Thinking in public.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Nav dots */}
          {ARTICLES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? T.tx : T.bd,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Stage */}
      <div
        style={{
          height: 420,
          position: 'relative',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
        >
          {ARTICLES.map((article, i) => {
            const offset = i - active
            // Shortest path around the circle
            let angle = (offset / TOTAL) * 360
            if (angle > 180) angle -= 360
            if (angle < -180) angle += 360

            const isActive = i === active
            const absAngle = Math.abs(angle)
            const opacity = absAngle > 120 ? 0 : 1 - (absAngle / 180)
            const scale = isActive ? 1 : 0.82 - (absAngle / 360) * 0.2

            return (
              <div
                key={article.id}
                style={{
                  position: 'absolute',
                  width: 320,
                  left: '50%',
                  top: '50%',
                  transform: `
                    translateX(-50%) translateY(-50%)
                    rotateY(${angle}deg)
                    translateZ(${RADIUS}px)
                    scale(${scale})
                  `,
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                  opacity,
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : 0,
                }}
              >
                <a
                  href={article.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 340,
                    padding: '36px 28px',
                    background: isActive ? '#fff' : T.bg,
                    border: `0.5px solid ${isActive ? 'rgba(0,0,0,0.12)' : T.bd}`,
                    borderRadius: 8,
                    textDecoration: 'none',
                    boxShadow: isActive ? '0 32px 64px -16px rgba(0,0,0,0.16)' : '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* Platform + tag */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
                    <div style={{
                      fontFamily: "'Geist', sans-serif", fontSize: 9, letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: article.featured ? T.ac : T.tm,
                      border: `0.5px solid ${article.featured ? "rgba(196,123,43,0.4)" : T.bd}`,
                      padding: "3px 9px", borderRadius: 100,
                      background: article.featured ? "rgba(196,123,43,0.07)" : "transparent",
                    }}>{article.platform}</div>
                    <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.tm }}>
                      {article.tag}
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{
                    fontFamily: "'Kaisei Tokumin', serif",
                    fontWeight: 700,
                    fontSize: "clamp(16px,1.4vw,19px)",
                    letterSpacing: "-0.4px",
                    lineHeight: 1.3,
                    color: T.tx,
                    marginBottom: 16,
                    flex: 1,
                  }}>{article.title}</div>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    color: T.ts,
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}>{article.desc}</p>

                  <div style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isActive ? T.ac : T.tm,
                    transition: "color 0.2s",
                  }}>Read →</div>
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {/* Arrow Nav */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 40 }}>
        <button
          onClick={prev}
          style={{
            width: 48, height: 48,
            borderRadius: '50%',
            border: `1px solid ${T.bd}`,
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: T.tx,
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = T.bg2; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = T.bd }}
        >
          ←
        </button>
        <button
          onClick={next}
          style={{
            width: 48, height: 48,
            borderRadius: '50%',
            border: `1px solid ${T.bd}`,
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: T.tx,
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = T.bg2; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = T.bd }}
        >
          →
        </button>
      </div>
    </section>
  )
}

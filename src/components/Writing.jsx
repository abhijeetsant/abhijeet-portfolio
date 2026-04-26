import { useRef, useState, useEffect } from "react"

const T = {
  bg: "#F5F4F1",
  tx: "#111111",
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
    desc: "Evidence-backed analysis of why LinkedIn's recruiter product consistently disappoints — and what that reveals about product incentives.",
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
    desc: "Even the beautiful ones. A dissection of why dashboards optimise for appearance over the decisions they're meant to support.",
    href: "https://medium.com/@secondfurther/most-dashboards-are-beautiful-almost-none-of-them-work-484fb2018d9d",
    featured: false,
  },
]

const N = ARTICLES.length
const CLONED = [...ARTICLES, ...ARTICLES, ...ARTICLES, ...ARTICLES, ...ARTICLES]
const CARD_GAP = 24

export default function Writing() {
  const [cardWidth, setCardWidth] = useState(window.innerWidth < 768 ? 320 : 400)
  const cardStride = cardWidth + CARD_GAP

  useEffect(() => {
    const handler = () => setCardWidth(window.innerWidth < 768 ? 320 : 400)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const [activeIndex, setActiveIndex] = useState(N * 2) // start at middle set
  const [noTransition, setNoTransition] = useState(false)
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const headerRef = useRef()
  const wrapperRef = useRef()
  const dragStartX = useRef(null)
  const touchStartX = useRef(null)
  const didDrag = useRef(false)
  const jumpTimerRef = useRef(null)

  // Header fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setHeaderVisible(true)
    }, { threshold: 0.3 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  // Measure wrapper width for centering offset
  useEffect(() => {
    if (!wrapperRef.current) return
    const ro = new ResizeObserver(([e]) => setWrapperWidth(e.contentRect.width))
    ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  // Auto-advance every 3s — pauses when isPaused
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setActiveIndex(i => i + 1)
    }, 1800)
    return () => clearInterval(id)
  }, [isPaused])

  // Infinite loop: silently jump back to middle set after transition completes.
  // Uses a single ref timer so rapid navigation only fires one jump.
  useEffect(() => {
    clearTimeout(jumpTimerRef.current)

    if (activeIndex >= N * 4) {
      jumpTimerRef.current = setTimeout(() => {
        setNoTransition(true)
        setActiveIndex(i => i - N * 2)
      }, 640)
    } else if (activeIndex < N) {
      jumpTimerRef.current = setTimeout(() => {
        setNoTransition(true)
        setActiveIndex(i => i + N * 2)
      }, 640)
    }

    return () => clearTimeout(jumpTimerRef.current)
  }, [activeIndex])

  // Re-enable transition two frames after silent jump
  useEffect(() => {
    if (!noTransition) return
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setNoTransition(false))
    })
    return () => cancelAnimationFrame(raf)
  }, [noTransition])

  const advance = (delta) => {
    setActiveIndex(i => Math.max(0, Math.min(CLONED.length - 1, i + delta)))
  }

  // Mouse drag
  const onMouseDown = (e) => {
    dragStartX.current = e.clientX
    didDrag.current = false
  }
  const onMouseUp = (e) => {
    if (dragStartX.current === null) return
    const delta = dragStartX.current - e.clientX
    if (Math.abs(delta) > 60) {
      didDrag.current = true
      advance(delta > 0 ? 1 : -1)
    }
    dragStartX.current = null
  }

  // Touch drag
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 60) advance(delta > 0 ? 1 : -1)
    touchStartX.current = null
  }

  const trackOffset = -(activeIndex * cardStride) + (wrapperWidth / 2 - cardWidth / 2)

  return (
    <section style={{
      background: T.bg,
      paddingBottom: 80,
      overflow: "hidden",
    }}>

      {/* Header */}
      <div
        ref={headerRef}
        style={{
          textAlign: "center",
          padding: "80px 60px 48px",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{
          fontFamily: "'Kaisei Tokumin', serif",
          fontWeight: 700,
          fontSize: "clamp(28px,3.5vw,44px)",
          color: "#111111",
        }}>
          Thinking in public.
        </div>
      </div>

      {/* Carousel wrapper */}
      <div
        ref={wrapperRef}
        style={{ position: "relative", width: "100%", overflow: "hidden", cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          dragStartX.current = null
          setIsPaused(false)
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Left arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); advance(-1) }}
          style={{
            position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)",
            zIndex: 10, width: 48, height: 48, borderRadius: "50%",
            background: "rgba(0,0,0,0.08)", border: "none", fontSize: 20,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
        >←</button>

        {/* Right arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); advance(1) }}
          style={{
            position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)",
            zIndex: 10, width: 48, height: 48, borderRadius: "50%",
            background: "rgba(0,0,0,0.08)", border: "none", fontSize: 20,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
        >→</button>

        {/* Track */}
        <div style={{
          display: "flex",
          gap: CARD_GAP,
          transform: `translateX(${trackOffset}px)`,
          transition: noTransition
            ? "none"
            : "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
          willChange: "transform",
          paddingTop: 24,
          paddingBottom: 60,
          userSelect: "none",
        }}>
          {CLONED.map((article, idx) => {
            const dist = Math.abs(idx - activeIndex)
            const isActive = dist === 0
            const opacity = isActive ? 1 : dist === 1 ? 0.5 : 0.25
            const scale = isActive ? 1 : dist === 1 ? 0.92 : 0.85
            const isSubstack = article.platform.toLowerCase().includes("substack")
            const isMedium = article.platform.toLowerCase().includes("medium")
            const platformColor = isSubstack ? "#FF6719" : "#000000"

            return (
              <a
                key={idx}
                href={article.href}
                target="_blank"
                rel="noreferrer"
                onClick={e => {
                  if (didDrag.current) { e.preventDefault(); return }
                  if (!isActive) { e.preventDefault(); advance(idx - activeIndex) }
                }}
                style={{
                  flexShrink: 0,
                  width: cardWidth,
                  height: 480,
                  padding: 32,
                  background: article.featured ? "rgba(196,123,43,0.03)" : "#ffffff",
                  border: article.featured
                    ? "1px solid rgba(196,123,43,0.3)"
                    : "0.5px solid rgba(0,0,0,0.08)",
                  borderRadius: 12,
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isActive
                    ? "0 8px 40px rgba(0,0,0,0.12)"
                    : "0 2px 20px rgba(0,0,0,0.06)",
                  opacity,
                  transform: `scale(${scale})`,
                  transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease",
                }}
              >
                {/* Top block */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {isSubstack && (
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="18" fill="#FF6719"/>
                        <path d="M8 12h20v2.5H8zm0 5h20v2.5H8zm0 5h20v2.5H8z" fill="white"/>
                      </svg>
                    )}
                    {isMedium && (
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="18" fill="#000"/>
                        <ellipse cx="13" cy="18" rx="5" ry="6.5" fill="white"/>
                        <ellipse cx="24" cy="18" rx="3" ry="6" fill="white"/>
                        <ellipse cx="30" cy="18" rx="2" ry="5" fill="white"/>
                      </svg>
                    )}
                    <div style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: platformColor,
                      border: `0.5px solid ${platformColor}`,
                      borderRadius: 100,
                      padding: "3px 10px",
                      opacity: 0.85,
                    }}>{article.platform}</div>
                  </div>

                  <div style={{
                    fontFamily: "'Kaisei Tokumin', serif",
                    fontWeight: 700,
                    fontSize: "clamp(22px,2.2vw,32px)",
                    letterSpacing: "-0.4px",
                    lineHeight: 1.2,
                    color: T.tx,
                    marginTop: 20,
                  }}>{article.title}</div>

                  <p style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 16,
                    fontWeight: 300,
                    color: "#444444",
                    lineHeight: 1.75,
                    marginTop: 12,
                    marginBottom: 0,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}>{article.desc}</p>
                </div>

                {/* Bottom block */}
                <div>
                  <div style={{ height: 1, background: "rgba(0,0,0,0.06)", marginTop: 24 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                    <div style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#999999",
                    }}>{article.tag}</div>
                    <div style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: T.ac,
                    }}>Read →</div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
        {ARTICLES.map((_, idx) => {
          const isActiveDot = (activeIndex % N) === idx
          return (
            <button
              key={idx}
              onClick={() => {
                const base = Math.floor(activeIndex / N) * N
                advance(base + idx - activeIndex)
              }}
              style={{
                width: isActiveDot ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: isActiveDot ? T.ac : "rgba(0,0,0,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          )
        })}
      </div>

    </section>
  )
}

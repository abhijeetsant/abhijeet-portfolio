import { useRef, useState, useEffect } from "react"

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

export default function Writing() {
  const trackRef = useRef()
  const headerRef = useRef()
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hoveredId, setHoveredId] = useState(null)
  const autoRef = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setHeaderVisible(true)
    }, { threshold: 0.3 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  // Auto scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    autoRef.current = setInterval(() => {
      if (!isDragging) {
        track.scrollLeft += 0.5
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
          track.scrollLeft = 0
        }
      }
    }, 16)
    return () => clearInterval(autoRef.current)
  }, [isDragging])

  const onMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }
  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft - (x - startX)
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <section style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}`, paddingBottom: 80 }}>

      {/* Header */}
      <div ref={headerRef} style={{
        padding: "80px 60px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        maxWidth: 1100, margin: "0 auto",
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.tm, marginBottom: 12 }}>[ 02 ] · Writing</div>
          <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,44px)", letterSpacing: "-1.5px", color: T.tx, lineHeight: 1.08 }}>
            Thinking in public.
          </div>
        </div>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.tm, letterSpacing: "0.06em" }}>
          Drag to explore →
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: "flex",
          gap: 16,
          overflowX: "scroll",
          paddingLeft: 60,
          paddingRight: 60,
          scrollbarWidth: "none",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        {[...ARTICLES, ...ARTICLES].map((article, idx) => (
          <a
            key={article.id}
            href={article.href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHoveredId(article.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={e => isDragging && e.preventDefault()}
            style={{
              flexShrink: 0,
              width: 320,
              padding: "32px 28px",
              background: hoveredId === article.id ? T.bg2 : T.bg,
              border: `0.5px solid ${hoveredId === article.id ? "rgba(0,0,0,0.16)" : T.bd}`,
              borderRadius: 4,
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              transition: "background 0.25s, border-color 0.25s, transform 0.25s",
              transform: hoveredId === article.id ? "translateY(-4px)" : "translateY(0)",
              cursor: "none",
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

            {/* Read link */}
            <div style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: hoveredId === article.id ? T.ac : T.tm,
              transition: "color 0.2s",
            }}>Read →</div>
          </a>
        ))}

        {/* End spacer */}
        <div style={{ flexShrink: 0, width: 20 }} />
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}

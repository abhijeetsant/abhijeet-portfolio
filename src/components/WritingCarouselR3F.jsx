import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

const T = {
  bg: "#F5F4F1",
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
    tag: "Best Seller",
    title: "Who Is LinkedIn Jobs\nActually Optimised For?",
    desc: "A forensic teardown of LinkedIn's\njob recommendation algorithm.",
    href: "https://open.substack.com/pub/secondfurther/p/who-is-linkedin-jobs-actually-optimised",
    featured: true,
  },
  {
    id: 2,
    platform: "Medium",
    tag: "Published",
    title: "You Were Not Failing\nthe Job Search.",
    desc: "The structural reason most job\nsearches fail by design.",
    href: "https://medium.com/design-bootcamp/you-were-not-failing-the-job-search-the-job-search-was-succeeding-just-not-for-you-8afdc9834eea",
    featured: false,
  },
  {
    id: 3,
    platform: "Substack",
    tag: "Evidence Series",
    title: "The Real Reason LinkedIn\nRecruiter Underperforms",
    desc: "Evidence-backed analysis of why\nLinkedIn recruiter disappoints.",
    href: "https://open.substack.com/pub/secondfurther/p/linkedin-recruiter-certainty-problem",
    featured: false,
  },
  {
    id: 4,
    platform: "Substack",
    tag: "Standalone",
    title: "YouTube Didn't Build\na Moat. They Found One.",
    desc: "How YouTube's defensibility came\nnot from what they built.",
    href: "https://open.substack.com/pub/secondfurther/p/youtube-didnt-build-a-moat-they-found",
    featured: false,
  },
  {
    id: 5,
    platform: "Substack",
    tag: "Standalone",
    title: "The Deferral Engine",
    desc: "On systems that delay decisions\nconsciously or not.",
    href: "https://open.substack.com/pub/secondfurther/p/the-deferral-engine",
    featured: false,
  },
  {
    id: 6,
    platform: "Medium",
    tag: "Insight",
    title: "Why Most Dashboards\nFail Decision-Making",
    desc: "Even beautiful dashboards optimise\nfor looks over decisions.",
    href: "https://medium.com/@secondfurther/most-dashboards-are-beautiful-almost-none-of-them-work-484fb2018d9d",
    featured: false,
  },
]

const TOTAL = ARTICLES.length
const RADIUS = 3.2

function Card({ article, index, activeIndex, total, onClick }) {
  const meshRef = useRef()
  const angle = ((index - activeIndex) / total) * Math.PI * 2
  const isActive = index === activeIndex
  const targetX = Math.sin(angle) * RADIUS
  const targetZ = Math.cos(angle) * RADIUS - RADIUS
  const targetRotY = -angle
  const targetScale = isActive ? 1 : 0.82
  const targetOpacity = isActive ? 1 : Math.max(0, 0.35 - Math.abs(angle) / (Math.PI * 2) * 0.5)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 5)
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 5)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 5)
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 5))
    meshRef.current.children.forEach(child => {
      if (child.material) {
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity || 1, targetOpacity, delta * 5)
      }
    })
  })

  return (
    <group ref={meshRef} position={[targetX, 0, targetZ]} rotation={[0, targetRotY, 0]} onClick={onClick}>
      {/* Card background */}
      <RoundedBox args={[2.2, 3, 0.04]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color={isActive ? "#ffffff" : "#F0EEE9"}
          transparent
          opacity={targetOpacity}
        />
      </RoundedBox>

      {/* Platform pill */}
      <Text
        position={[-0.7, 1.22, 0.03]}
        fontSize={0.09}
        color={article.featured ? "#C47B2B" : "#999999"}
        letterSpacing={0.08}
        textAlign="left"
        anchorX="left"
      >
        {article.platform.toUpperCase()}
      </Text>

      {/* Tag */}
      <Text
        position={[-0.15, 1.22, 0.03]}
        fontSize={0.09}
        color="#bbbbbb"
        letterSpacing={0.06}
        textAlign="left"
        anchorX="left"
      >
        · {article.tag.toUpperCase()}
      </Text>

      {/* Title */}
      <Text
        position={[-0.85, 0.65, 0.03]}
        fontSize={0.175}
        color="#111111"
        fontWeight={700}
        letterSpacing={-0.02}
        lineHeight={1.3}
        textAlign="left"
        anchorX="left"
        maxWidth={1.75}
      >
        {article.title}
      </Text>

      {/* Desc */}
      <Text
        position={[-0.85, -0.28, 0.03]}
        fontSize={0.115}
        color="#666666"
        lineHeight={1.6}
        textAlign="left"
        anchorX="left"
        maxWidth={1.75}
      >
        {article.desc}
      </Text>

      {/* Read arrow */}
      <Text
        position={[-0.85, -1.2, 0.03]}
        fontSize={0.1}
        color={isActive ? "#C47B2B" : "#999999"}
        letterSpacing={0.1}
        textAlign="left"
        anchorX="left"
      >
        READ →
      </Text>

      {/* Active indicator line */}
      {isActive && (
        <mesh position={[-0.85, 1.38, 0.03]}>
          <planeGeometry args={[0.3, 0.015]} />
          <meshStandardMaterial color="#C47B2B" />
        </mesh>
      )}
    </group>
  )
}

function DragHandler({ onDrag }) {
  const { gl } = useThree()
  const startX = useRef(null)

  useEffect(() => {
    const canvas = gl.domElement
    const down = (e) => { startX.current = e.touches ? e.touches[0].clientX : e.clientX }
    const up = (e) => {
      if (startX.current === null) return
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
      const delta = startX.current - endX
      if (Math.abs(delta) > 50) onDrag(delta > 0 ? 1 : -1)
      startX.current = null
    }
    canvas.addEventListener("mousedown", down)
    canvas.addEventListener("mouseup", up)
    canvas.addEventListener("touchstart", down)
    canvas.addEventListener("touchend", up)
    return () => {
      canvas.removeEventListener("mousedown", down)
      canvas.removeEventListener("mouseup", up)
      canvas.removeEventListener("touchstart", down)
      canvas.removeEventListener("touchend", up)
    }
  }, [gl, onDrag])
  return null
}

export default function WritingCarouselR3F() {
  const [active, setActive] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  const next = () => setActive(i => (i + 1) % TOTAL)
  const prev = () => setActive(i => (i - 1 + TOTAL) % TOTAL)

  return (
    <section style={{ background: T.bg, borderTop: `0.5px solid ${T.bd}`, paddingBottom: 80 }}>

      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: "80px 60px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          maxWidth: 1100, margin: "0 auto",
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
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: T.tm, letterSpacing: "0.06em" }}>
          Drag to rotate →
        </div>
      </div>

      {/* R3F Canvas */}
      <div style={{ height: 480, width: '100%', cursor: 'grab' }}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <directionalLight position={[-5, -2, -5]} intensity={0.2} />

          <DragHandler onDrag={(dir) => dir > 0 ? next() : prev()} />

          {ARTICLES.map((article, i) => (
            <Card
              key={article.id}
              article={article}
              index={i}
              activeIndex={active}
              total={TOTAL}
              onClick={() => {
                if (i !== active) {
                  setActive(i)
                } else {
                  window.open(article.href, '_blank')
                }
              }}
            />
          ))}
        </Canvas>
      </div>

      {/* Article title overlay for active */}
      <div style={{ textAlign: 'center', marginTop: -16 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.tm, marginBottom: 8 }}>
          {active + 1} / {TOTAL}
        </div>
      </div>

      {/* Arrow nav */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20 }}>
        {['←', '→'].map((arrow, i) => (
          <button
            key={arrow}
            onClick={i === 0 ? prev : next}
            style={{
              width: 48, height: 48,
              borderRadius: '50%',
              border: `1px solid ${T.bd}`,
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, color: T.tx,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#EEECEA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {arrow}
          </button>
        ))}
      </div>
    </section>
  )
}

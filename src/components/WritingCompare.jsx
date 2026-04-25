import Writing from './Writing'
import WritingCarouselCSS from './WritingCarouselCSS'
import WritingCarouselR3F from './WritingCarouselR3F'

const Label = ({ letter, title, desc }) => (
  <div style={{
    background: '#111',
    color: '#fff',
    padding: '32px 60px',
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    borderBottom: '1px solid rgba(255,255,255,0.08)'
  }}>
    <div style={{
      width: 48, height: 48,
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Kaisei Tokumin', serif",
      fontSize: 22, fontWeight: 800,
      color: '#C47B2B',
      flexShrink: 0,
    }}>
      {letter}
    </div>
    <div>
      <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#666', marginBottom: 4 }}>
        Variant {letter}
      </div>
      <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: '#888' }}>
        {desc}
      </div>
    </div>
  </div>
)

export default function WritingCompare() {
  return (
    <div style={{ background: '#111', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{
        padding: '80px 60px 60px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center'
      }}>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>
          A/B/C Design Comparison
        </div>
        <div style={{ fontFamily: "'Kaisei Tokumin', serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Thinking in Public — Pick Your Carousel
        </div>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: '#666', marginTop: 16 }}>
          Scroll through all three. Tell me which one stays.
        </div>
      </div>

      {/* Variant A */}
      <div>
        <Label
          letter="A"
          title="Original — Horizontal Drag Scroll"
          desc="Auto-scrolling ticker with drag interaction. Clean, familiar, fast."
        />
        <Writing />
      </div>

      {/* Variant B */}
      <div>
        <Label
          letter="B"
          title="CSS 3D Perspective Wheel"
          desc="Pure CSS transform rotateY() carousel. No new dependencies. Cards fan on a 3D arc."
        />
        <WritingCarouselCSS />
      </div>

      {/* Variant C */}
      <div>
        <Label
          letter="C"
          title="React Three Fiber — GPU 3D Carousel"
          desc="WebGL-rendered cylindrical carousel inspired by wass08's r3f-carousel-slider. Smooth physics drag."
        />
        <WritingCarouselR3F />
      </div>

      {/* Footer nudge */}
      <div style={{ textAlign: 'center', padding: '80px 60px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 11, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Which one? A · B · C
        </div>
      </div>

    </div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}

const imgPlaceholder = (label, ratio = '4/5') => (
  <div style={{ width: '100%', aspectRatio: ratio, backgroundColor: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
    <div style={{ fontSize: 12, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase' }}>{label}</div>
  </div>
)

export default function LucidProject() {
  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', fontFamily: 'Geist, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '32px clamp(20px, 4vw, 60px)',
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#111111', fontSize: 20, fontWeight: 800, letterSpacing: '-0.04em' }}>
          ABHIJEET SANT
        </Link>
        <div style={{ display: 'flex', gap: 32, fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#111111' }}>
          <a href="/#work" style={{ textDecoration: 'none', color: 'inherit' }}>WORK</a>
          <a href="/#about" style={{ textDecoration: 'none', color: 'inherit' }}>ABOUT</a>
          <a href="/#thoughts" style={{ textDecoration: 'none', color: 'inherit' }}>THOUGHTS</a>
          <a href="/#contact" style={{ textDecoration: 'none', color: 'inherit' }}>MAIL</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px clamp(20px, 4vw, 60px) 120px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 18, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
          PROJECT LUCID
        </div>
        <h1 style={{ fontSize: 'clamp(64px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.05, color: '#111111', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
          AI Safety for<br />Indian Families
        </h1>
        <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#777', fontWeight: 400, marginBottom: 48 }}>
          Passive, invisible, always on.
        </div>
        <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />
        <div style={{ fontSize: 16, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 80 }}>
          JANUARY 2026
        </div>
        <p style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, lineHeight: 1.35, color: '#222', maxWidth: 960, marginBottom: 100, letterSpacing: '-0.02em' }}>
          — India has 900 million internet users. ₹1,935 crore was lost to digital arrest scams in 2024. Every existing deepfake detection product assumes the user knows they need protection. In India, that assumption fails.
        </p>
        <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>TYPE</span>
            <span style={{ color: '#111', fontWeight: 500 }}>PORTFOLIO CASE STUDY</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>PLATFORM</span>
            <span style={{ color: '#111', fontWeight: 500 }}>ANDROID-FIRST</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>STATUS</span>
            <span style={{ color: '#111', fontWeight: 500 }}>CONCEPT · DETECTION MVP</span>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <section style={{ width: '100%', overflow: 'hidden', padding: '0 clamp(20px, 4vw, 60px)', display: 'flex', justifyContent: 'center' }}>
        <motion.div
          {...fadeUp}
          style={{ width: '100%', maxWidth: 1400, aspectRatio: '16/9', backgroundColor: '#f0f0f0', borderRadius: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}
        >
          <div style={{ fontSize: 12, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase' }}>[ LUCID IMAGE 1 ]</div>
        </motion.div>
      </section>

      {/* Overview */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px) 120px', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}
      >
        <div style={{ flex: '1 1 350px' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 500, marginBottom: 16 }}>
            PROJECT OVERVIEW
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 400, color: '#888', fontStyle: 'italic', lineHeight: 1.6 }}>
            Not a tool for the person at risk. A tool for the person who loves them.
          </div>
        </div>
        <div style={{ flex: '1.5 1 500px' }}>
          <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#333', lineHeight: 1.5, fontWeight: 400, marginBottom: 60 }}>
            Three incidents defined the problem space before a single feature was scoped. A domain expert couldn't detect a synthetic face of someone they knew. A child watched AI-generated animals as reality. PM Modi addressed digital arrest scams on Mann Ki Baat.
          </div>
          <div style={{ borderLeft: '1px solid #eaeaea', paddingLeft: 32 }}>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: '#888', lineHeight: 1.7, fontWeight: 400 }}>
              The guardian model emerged from one observation: in India, the person most at risk is often the least digitally literate — and the most likely to be protected by someone else who cares. Lucid is built for that someone else.
            </div>
          </div>
        </div>
      </motion.section>

      {/* Three Personas */}
      <section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>
          ONE PRODUCT. THREE RELATIONSHIPS WITH SAFETY.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff', borderRadius: 4, overflow: 'hidden', width: '100%' }}>
          {[
            { name: 'ARJUN', role: 'THE GUARDIAN', text: "Sees everything. Receives alerts. Chooses who is protected and who is aware. The dashboard is his — granular, honest, never simplified. His vigilance is the product's north star." },
            { name: 'MEERA', role: 'THE PROTECTED', text: "Sees only a shield icon. Doesn't know the specifics of what's being detected. Lucid works for her without requiring her to understand it. Consent is architectural, not a checkbox." },
            { name: 'VIKRAM', role: 'THE AWARE', text: "Opted in. Sees his own scan results. Knows the system exists. The Vikram Test: if a 22-year-old tech-literate user finds the product patronising, the UX has failed." },
          ].map((persona, i) => (
            <motion.div
              key={persona.name}
              {...fadeUp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              style={{ flex: '1 1 0', minWidth: 260, display: 'flex', flexDirection: 'column', padding: '60px 40px', backgroundColor: '#fff', position: 'relative', boxShadow: '-12px 0 24px -12px rgba(0,0,0,0.1)', zIndex: i }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-start', marginBottom: 24 }}>
                  <div style={{ fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 800, color: '#111', lineHeight: 0.8, letterSpacing: '-0.05em' }}>
                    {persona.name.charAt(0)}
                  </div>
                  <div style={{ width: '100%', height: 3, backgroundColor: '#111', marginTop: 16 }} />
                </div>
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#111' }}>{persona.name}</div>
                <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginTop: 4 }}>{persona.role}</div>
              </div>
              <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#555', lineHeight: 1.6, fontWeight: 400 }}>
                {persona.text}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 01 — Problem Discovery */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
            01 — PROBLEM DISCOVERY
          </div>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
          <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 40 }}>
            The gap was in how every existing product defined the user.
          </div>
          {imgPlaceholder('[ LUCID IMAGE 2 ]')}
        </div>
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#444', lineHeight: 1.6, fontWeight: 400 }}>
            <strong>Every competitor shares one fatal assumption:</strong> Neural Defend, McAfee Deepfake Detector, Reality Defender, VASTAV India — all require the user to know they need protection and actively seek it. In India, that assumption fails at the exact population that needs it most.
          </div>
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#666', lineHeight: 1.6, fontWeight: 400 }}>
            The person most at risk is often the least digitally literate, the least likely to download a safety app, and the most likely to be protected by someone else who cares. Arjun doesn't install Lucid for himself. He installs it for his mother, his younger sibling, his partner. The product's job is to close the gap between "I wish I could protect them" and "I can."
          </div>
          <div style={{ paddingLeft: 32, borderLeft: '2px solid #111', marginTop: 16 }}>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#111', lineHeight: 1.6, fontWeight: 500 }}>
              <strong>The discovery moment:</strong> Three real incidents — not research sessions — defined the problem space before a single feature was scoped. Observation before assumption. A dinner conversation, not a user interview.
            </div>
          </div>
        </div>
      </motion.section>

      {/* 02 — Ruthless Prioritization */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', borderTop: '1px solid #eaeaea' }}
      >
        <div style={{ display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
              02 — RUTHLESS PRIORITIZATION
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Five things explicitly out of scope. Each one documented.
            </div>
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 60 }}>
            {[
              { title: 'Real-time video scanning — out of scope.', text: "On-device processing at video frame rates requires hardware optimisation beyond v1. Detection on still frames and short clips first. Real-time is v3." },
              { title: 'iOS support — out of scope.', text: "OS-layer passive detection requires accessibility APIs that Apple's sandbox prevents. Android-first was not a market preference — it was an architecture constraint that pointed at the right market." },
              { title: 'Cloud processing — out of scope.', text: "Raw content never leaves the device. No server ever sees the image or video being scanned. Privacy is architecture, not a feature toggle." },
              { title: 'Group family dashboards — out of scope.', text: "One guardian, one dashboard for v1. Multi-guardian coordination — shared alerts, role permissions — is real but not the first problem to solve." },
              { title: 'Threat reporting to authorities — out of scope.', text: "A safety product that makes promises it cannot keep is more dangerous than no product at all. Lucid detects. It does not investigate, report, or guarantee outcomes." },
            ].map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-60px', top: -16, fontSize: 64, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.05em', zIndex: -1 }}>0{idx + 1}</div>
                <div style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 700, color: '#111', marginBottom: 16 }}>{item.title}</div>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#666', lineHeight: 1.6 }}>{item.text}</div>
              </div>
            ))}
            <div style={{ padding: '40px', backgroundColor: '#f9f9f9', marginTop: 20 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 16 }}>THE MLP BAR</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#333', lineHeight: 1.5, fontWeight: 500 }}>
                Scope discipline is a safety feature, not a product limitation.
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 03 — Architecture Insight */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start', borderTop: '1px solid #eaeaea' }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
            03 — THE ARCHITECTURE INSIGHT
          </div>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
          <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 40 }}>
            Passive detection. Guardian routing. Privacy as constraint.
          </div>
          {imgPlaceholder('[ LUCID IMAGE 3 ]', '1/1')}
        </div>
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The constraint that pointed at the market</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Android-first was not a market decision. OS-layer passive detection requires accessibility APIs that Apple's sandbox prevents. The technical constraint was the product constraint — and it pointed directly at the right market. India has 600M+ Android users, the highest deepfake exposure rate globally, and no consumer passive detection product.</div>
          </div>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Privacy as architecture</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Raw content is processed on-device. Not a privacy feature — the only acceptable design for a product that monitors family members. The false positive rate is treated as a safety metric, not a quality metric. A false alarm that causes a family conflict is a product failure, not a statistical outlier.</div>
          </div>
          <div style={{ paddingLeft: 32, borderLeft: '2px solid #111', marginTop: 16 }}>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#111', lineHeight: 1.6, fontWeight: 500 }}>
              <strong>The Vikram Test:</strong> if a 22-year-old tech-literate user finds the product patronising, the UX has failed. Every consent flow, every alert, every dashboard element was tested against this.
            </div>
          </div>
        </div>
      </motion.section>

      {/* 04 — Competitive Gap */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', borderTop: '1px solid #eaeaea' }}
      >
        <div style={{ display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
              04 — THE COMPETITIVE GAP
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Every competitor shares one fatal assumption: the user will come to them.
            </div>
          </div>
          <div style={{ flex: '2 1 500px' }}>
            {[
              { name: 'Neural Defend', flaw: 'Requires user to upload content first', tag: 'ACTIVE EFFORT' },
              { name: 'McAfee Deepfake Detector', flaw: 'Desktop PCs only, not mobile', tag: 'NOT MOBILE' },
              { name: 'Reality Defender', flaw: 'Enterprise B2B, no consumer product', tag: 'WRONG MARKET' },
              { name: 'Parental Controls', flaw: 'No deepfake or synthetic media detection', tag: 'WRONG THREAT' },
              { name: 'VASTAV India', flaw: 'Active submission only, no passive monitoring', tag: 'ACTIVE ONLY' },
            ].map(({ name, flaw, tag }) => (
              <div key={name} style={{ display: 'flex', gap: 24, borderBottom: '1px solid #eaeaea', padding: '24px 0', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#111', flex: '0 0 200px' }}>{name}</div>
                <div style={{ fontSize: 16, color: '#666', flex: 1 }}>{flaw}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999', flexShrink: 0 }}>{tag}</div>
              </div>
            ))}
            <div style={{ paddingLeft: 32, borderLeft: '2px solid #111', marginTop: 48 }}>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#111', lineHeight: 1.6, fontWeight: 500 }}>
                No consumer product in India is built around the guardian model — passive detection on a family member's device, with alerts routed to the person who cares but isn't there.
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 05 — North Star (dark) */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', backgroundColor: '#111', color: '#fff' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', fontWeight: 700, marginBottom: 24 }}>
              05 — NORTH STAR METRIC
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#fff', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
              Not threats<br />blocked.<br />The over-<br />reliance<br />index.
            </div>
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 16 }}>
            <div style={{ fontSize: 'clamp(20px, 2vw, 26px)', color: '#fff', lineHeight: 1.5, fontWeight: 500 }}>
              The easiest metric for Lucid would have been threats blocked. Visible, countable, dashboard-friendly. It's also the wrong metric.
            </div>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#aaa', lineHeight: 1.6 }}>
              A family with 147 threats blocked that stops having digital safety conversations because "Lucid handles it" has net-negative safety outcomes. The product's job is to make families genuinely safer, not to make them feel safer. Those are different outcomes.
            </div>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#aaa', lineHeight: 1.6 }}>
              <strong style={{ color: '#fff' }}>The North Star is the over-reliance index</strong> — tracking guardians who disengage from active vigilance after installing Lucid. If Arjun stops talking to his mother about what she shares online because he trusts the app to catch everything, the product has failed at its actual job. I instrument for that failure mode, not against it.
            </div>
            <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', marginTop: 20 }}>
              {[
                { num: '91%', label: 'Detection accuracy on synthetic media' },
                { num: '<2s', label: 'On-device processing time per frame' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>{num}</div>
                  <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 06 — GTM */}
      <motion.section
        {...fadeUp}
        style={{ padding: '160px clamp(20px, 4vw, 60px)', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}
      >
        <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 32 }}>
          06 — GO-TO-MARKET
        </div>
        <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#111', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 60 }}>
          The guardian is the buyer. The family is the product.
        </div>
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Target persona</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Urban Indian professional, 25–40, with at least one family member who is digitally active but not digitally literate. They've seen a WhatsApp forward they couldn't verify. They've worried about a parent clicking a suspicious link. They are not the person at risk — they are the person who cares about the person at risk.</div>
          </div>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Distribution</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Guardian communities first. WhatsApp family group admins, parenting forums, elder care networks. Not tech Twitter. The product sells itself when one guardian tells another — "I installed this for my mother." Referral is the natural motion because the anxiety is shared.</div>
          </div>
          <div style={{ padding: '40px', backgroundColor: '#f9f9f9', marginTop: 40, borderLeft: '4px solid #111' }}>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The upgrade moment</div>
            <div style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: '#111', lineHeight: 1.5, fontWeight: 500 }}>Freemium: free for one protected device, paid for family coverage. The upgrade moment is when Arjun wants to add his mother and his partner. That's when protection becomes a family decision — and that's when he pays.</div>
          </div>
        </div>
      </motion.section>

      {/* Next Project Footer */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ borderTop: '1px solid #eaeaea', marginTop: 80 }}
      >
        <Link
          to="/projects/specter"
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '120px clamp(20px, 4vw, 60px)', textAlign: 'center', transition: 'background-color 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', fontWeight: 700, marginBottom: 24 }}>
            NEXT PROJECT
          </div>
          <div style={{ fontSize: 'clamp(60px, 8vw, 120px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>
            SPECTER.
          </div>
        </Link>
      </motion.section>

    </div>
  )
}

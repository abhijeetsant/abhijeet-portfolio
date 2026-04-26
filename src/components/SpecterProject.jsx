import { useEffect, useState } from 'react'
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

export default function SpecterProject() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, []);

  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', fontFamily: 'Geist, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '32px clamp(20px, 4vw, 60px)',
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#111111', fontSize: 20, fontWeight: 800, letterSpacing: '-0.04em' }}>
          A.Sant
        </Link>
        <div style={{ display: 'flex', gap: isMobile ? 12 : 32, fontSize: isMobile ? 11 : 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#111111', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/#work" style={{ textDecoration: 'none', color: 'inherit' }}>WORK</a>
          <a href="/#about" style={{ textDecoration: 'none', color: 'inherit' }}>ABOUT</a>
          <a href="/#thoughts" style={{ textDecoration: 'none', color: 'inherit' }}>THOUGHTS</a>
          <a href="/#contact" style={{ textDecoration: 'none', color: 'inherit' }}>MAIL</a>
          <a href="https://www.linkedin.com/in/abhijeetsant05/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>LI</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px clamp(20px, 4vw, 60px) 120px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0 }} style={{ fontSize: 18, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
          PROJECT SPECTER
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} style={{ fontSize: isMobile ? 'clamp(44px, 8vw, 96px)' : 'clamp(64px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.05, color: '#111111', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
          Synthetic User<br />Research
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#777', fontWeight: 400, marginBottom: 48 }}>
          Real complaints, AI personas, honest answers.
        </motion.div>
        <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }} style={{ fontSize: 16, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 80 }}>
          MARCH 2026
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }} style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, lineHeight: 1.35, color: '#222', maxWidth: 960, marginBottom: 100, letterSpacing: '-0.02em' }}>
          — Stated preferences lie. The signal lives in the one-star reviews, the support tickets, the Reddit threads at 2am where users say exactly what they think. Specter turns those complaints into something you can actually talk to.
        </motion.p>
        <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }} style={{ display: 'flex', gap: 60, flexWrap: 'wrap', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>TYPE</span>
            <span style={{ color: '#111', fontWeight: 500 }}>PORTFOLIO TOOL · LIVE DEMO</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>STACK</span>
            <span style={{ color: '#111', fontWeight: 500 }}>REACT · GEMINI 2.5 FLASH · VERCEL</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>DEMO</span>
            <span style={{ color: '#111', fontWeight: 500 }}>LIVE IN THIS PORTFOLIO</span>
          </div>
        </motion.div>
      </section>

      {/* Full-width image */}
      <section style={{ width: '100%', overflow: 'hidden', padding: '0 clamp(20px, 4vw, 60px)', display: 'flex', justifyContent: 'center' }}>
        <motion.div
          {...fadeUp}
          style={{ width: '100%', maxWidth: 1400, aspectRatio: '16/9', backgroundColor: '#f0f0f0', borderRadius: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}
        >
          <img src="/specter-hero.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} alt="Specter" />
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
            The research tool you use in the 10 minutes before you decide whether the research is worth doing.
          </div>
        </div>
        <div style={{ flex: '1.5 1 500px' }}>
          <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#333', lineHeight: 1.5, fontWeight: 400, marginBottom: 60 }}>
            PMs who relied on surveys made decisions based on what users said. PMs who read the raw complaint data made decisions based on what users felt. The second group was consistently better calibrated. The process was just manual and non-reproducible.
          </div>
          <div style={{ borderLeft: '1px solid #eaeaea', paddingLeft: 32 }}>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: '#888', lineHeight: 1.7, fontWeight: 400 }}>
              Specter is the productisation of that second approach. Complaint data is the raw material. AI personas are the interface. The interview is the method. Any PM. 10 minutes. Real signal.
            </div>
          </div>
        </div>
      </motion.section>

      {/* The Mechanic — 4-column */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff', borderRadius: 4, overflow: 'hidden', width: '100%' }}>
          {[
            { num: '1', title: 'SELECT', text: "Choose Zomato, Slack, or ChatGPT. Each product has a corpus of real user complaints — App Store reviews, Reddit threads, support forum posts — pre-loaded into Specter's persona engine." },
            { num: '2', title: 'CHOOSE', text: "Pick 3 or 4 synthetic personas. Each ghost user is built from a distinct complaint cluster — the price-sensitive power user, the churned enterprise customer, the confused first-timer." },
            { num: '3', title: 'INTERVIEW', text: "Ask any question you'd ask in a real user interview. Ghost users respond in character — with the frustrations, vocabulary, and emotional tenor of the complaints they were built from. No performed helpfulness." },
            { num: '4', title: 'EXTRACT', text: "Ghost users are AI personas, not real people. Insights are directional, not definitive. But four synthetic Zomato users who independently surface the same pricing complaint is a signal worth investigating." },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              {...fadeUp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              style={{ flex: '1 1 0', minWidth: 260, display: 'flex', flexDirection: 'column', padding: '60px 40px', backgroundColor: '#fff', position: 'relative', boxShadow: '-12px 0 24px -12px rgba(0,0,0,0.1)', zIndex: i }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-start', marginBottom: 24 }}>
                  <div style={{ fontSize: 'clamp(80px, 8vw, 120px)', fontWeight: 800, color: '#111', lineHeight: 0.8, letterSpacing: '-0.05em' }}>
                    {step.num}
                  </div>
                  <div style={{ width: '100%', height: 3, backgroundColor: '#111', marginTop: 16 }} />
                </div>
                <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#111' }}>
                  {step.title}
                </div>
              </div>
              <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: '#555', lineHeight: 1.6, fontWeight: 400 }}>
                {step.text}
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
            The insight came from watching PMs do research the wrong way.
          </div>
          <img src="/specter-pdiscovery.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} alt="Specter problem discovery" />
        </div>
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#444', lineHeight: 1.6, fontWeight: 400 }}>
            <strong>The pattern across six years:</strong> PMs who relied on surveys and NPS scores made decisions based on what users said. PMs who read the raw complaint data — the reviews, the tickets, the forums — made decisions based on what users did and felt. The second group was consistently better calibrated.
          </div>
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#666', lineHeight: 1.6, fontWeight: 400 }}>
            But reading App Store reviews before every planning cycle is manual, inconsistent, and non-reproducible. It lives in someone's browser history. It doesn't scale. Specter makes the process accessible to any PM in 10 minutes instead of 10 hours.
          </div>
          <div style={{ paddingLeft: 32, borderLeft: '2px solid #111', marginTop: 16 }}>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#111', lineHeight: 1.6, fontWeight: 500 }}>
              <strong>The productisation insight:</strong> complaint data is the raw material. AI personas are the interface. The interview is the research method. The goal is not to replace real user research — it is to make the signal from complaint data accessible.
            </div>
          </div>
        </div>
      </motion.section>

      {/* 02 — Ruthless Prioritization */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto' }}
      >
        <div style={{ display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
              02 — RUTHLESS PRIORITIZATION
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Four things deliberately left out of v1.
            </div>
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 60 }}>
            {[
              { title: 'Real user data ingestion — out of scope.', text: "Specter v1 uses pre-loaded complaint corpora for Zomato, Slack, and ChatGPT. Custom product ingestion — paste your own App Store reviews, upload your support tickets — is v2. Shipping with three products validates the mechanic before building the pipeline." },
              { title: 'Affinity mapping and insight synthesis — out of scope.', text: "Ghost user interviews generate raw qualitative data. Specter v1 doesn't synthesize across interviews or generate insight reports. That's the research analyst layer — valuable, but not the core mechanic to validate first." },
              { title: 'Persistent sessions and saved interviews — out of scope.', text: "Interviews don't save between sessions. No account, no history, no export. The friction of rebuilding a session is acceptable for v1 — validating that PMs find the interview itself valuable comes before building the save layer." },
              { title: 'Voice interview mode — out of scope.', text: "Spoken interviews with ghost users would be a significantly more visceral experience. Also significantly more complex to build and more likely to fail in a portfolio demo context. Text first. Voice is v3." },
            ].map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-60px', top: -16, fontSize: 64, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.05em', zIndex: -1 }}>0{idx + 1}</div>
                <div style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 700, color: '#111', marginBottom: 16 }}>{item.title}</div>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#666', lineHeight: 1.6 }}>{item.text}</div>
              </div>
            ))}
            <div style={{ padding: '40px', backgroundColor: '#f9f9f9', marginTop: 20 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 16 }}>THE MLP</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#333', lineHeight: 1.5, fontWeight: 500 }}>
                One complete interview session. Product selected → ghost users summoned → questions asked → signal extracted.
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 03 — Technical Bet */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
            03 — THE TECHNICAL BET
          </div>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
          <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 40 }}>
            Gemini 2.5 Flash. Vercel serverless proxy. Free tier.
          </div>
          <img src="/specter-techbet.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} alt="Specter technical bet" />
        </div>
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The stack</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Specter runs entirely on Gemini 2.5 Flash's free tier — 10 requests per minute, 250 per day. For portfolio traffic, this is sufficient. The API key lives in a Vercel serverless function, never exposed client-side. Demo mode uses this proxy; live mode allows users to bring their own Gemini key.</div>
          </div>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The constraint as proof of craft</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>No paid APIs. No database. No backend infrastructure. A PM building a research tool as a portfolio piece should be able to ship it to Vercel for free and keep it running indefinitely. Doing more with less is the PM instinct, not just the engineering one.</div>
          </div>
          <div style={{ paddingLeft: 32, borderLeft: '2px solid #111', marginTop: 16 }}>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#111', lineHeight: 1.6, fontWeight: 500 }}>
              The constraint is the proof of craft. A PM who ships a working research tool on a free tier has demonstrated more product judgment than one who over-engineered a never-shipped v1.
            </div>
          </div>
        </div>
      </motion.section>

      {/* 04 — GTM */}
      <motion.section
        {...fadeUp}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto' }}
      >
        <div style={{ display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
              04 — GO-TO-MARKET
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 40 }}>
              The target user is already doing this manually. Specter makes it 10x faster.
            </div>
            <img src="/specter-gtm.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} alt="Specter GTM" />
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Target persona</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>PM at a Series A–C company, 2–6 years experience, responsible for their own discovery and research. No dedicated UX research team. They read App Store reviews before quarterly planning. They have a folder of saved Reddit threads. They are doing manual synthetic research already — they just don't call it that.</div>
            </div>
            <div>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Distribution</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>PM communities first. Lenny's Slack, Mind the Product, IndianPM community. The hook is a live demo — "Interview a frustrated Zomato user right now." The product sells itself in 90 seconds. No explainer video needed. The experience is the pitch.</div>
            </div>
            <div style={{ paddingLeft: 32, borderLeft: '2px solid #111', marginTop: 16 }}>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#111', lineHeight: 1.6, fontWeight: 500 }}>
                The hook: "You're evaluated on your decisions every day. Nobody trains you to make better ones." Every working PM who reads it feels a small discomfort — and that discomfort is the click.
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
              Interview<br />Completion<br />Rate.
            </div>
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 16 }}>
            <div style={{ fontSize: 'clamp(20px, 2vw, 26px)', color: '#fff', lineHeight: 1.5, fontWeight: 500 }}>
              Did the PM get a signal worth acting on?
            </div>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#aaa', lineHeight: 1.6 }}>
              <strong style={{ color: '#fff' }}>Why this metric:</strong> A PM who completes a full interview session with 3–4 ghost users and asks at least 5 questions has extracted a directional signal. That's the North Star: full session completion with meaningful depth. Shallow sessions — one question, one answer, exit — indicate the mechanic isn't compelling enough to sustain a real research workflow.
            </div>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#aaa', lineHeight: 1.6 }}>
              <strong style={{ color: '#fff' }}>The counter-metric:</strong> false confidence. A PM who treats Specter's synthetic insights as definitive rather than directional. Ghost users are not real people. The product succeeds when PMs use Specter to sharpen their hypotheses before real research, not instead of it.
            </div>
            <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', marginTop: 20 }}>
              {[
                { num: '3–4', label: 'Ghost users per session' },
                { num: '10min', label: 'Average session to first signal' },
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

      {/* 06 — Business Horizon */}
      <motion.section
        {...fadeUp}
        style={{ padding: '160px clamp(20px, 4vw, 60px)', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}
      >
        <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 32 }}>
          06 — BUSINESS HORIZON
        </div>
        <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#111', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 60 }}>
          The research tool stack has a missing layer. Specter is it.
        </div>
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The gap</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>The existing PM research stack: Dovetail for synthesis, Maze for usability testing, Hotjar for behavioral analytics. Nobody owns the pre-research layer — the moment before you know what to test. Specter sits at that moment. It's the tool you use when you have a hunch but not a hypothesis.</div>
          </div>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The commercial path</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>B2B SaaS targeting PMs at product-led companies. Freemium with pre-loaded demo products. Paid tier unlocks custom product ingestion — paste your own complaint data, generate personas from your users. The upgrade moment is when a PM wants to interview their own users, not Zomato's. That's when Specter becomes indispensable.</div>
          </div>
          <div style={{ padding: '40px', backgroundColor: '#f9f9f9', marginTop: 40, borderLeft: '4px solid #111' }}>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>THE INSIGHT THAT SCALES</div>
            <div style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: '#111', lineHeight: 1.5, fontWeight: 500 }}>Specter is not a replacement for user research. It's what you do in the 10 minutes before you decide whether the research is worth doing.</div>
          </div>
        </div>
      </motion.section>

      {/* Back to portfolio footer */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ marginTop: 80 }}
      >
        <Link
          to="/"
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '120px clamp(20px, 4vw, 60px)', textAlign: 'center', transition: 'background-color 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', fontWeight: 700, marginBottom: 24 }}>
            BACK TO PORTFOLIO
          </div>
          <div style={{ fontSize: 'clamp(60px, 8vw, 120px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>
            ABHIJEET SANT.
          </div>
        </Link>
      </motion.section>

    </div>
  )
}

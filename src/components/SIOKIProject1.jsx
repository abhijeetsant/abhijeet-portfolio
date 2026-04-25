import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export default function SIOKIProject1() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div style={{ background: '#ffffff', color: '#111111', minHeight: '100vh', fontFamily: 'Geist, sans-serif' }}>
      
      {/* Nav exactly like screenshot */}
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
          <a href="https://twitter.com/abhijeetsant05" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>TW</a>
          <a href="https://www.linkedin.com/in/abhijeetsant05/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>LI</a>
        </div>
      </nav>

      {/* Hero Section matching the screenshot perfectly */}
      <section style={{ padding: '80px clamp(20px, 4vw, 60px) 120px', maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Top Label */}
        <div style={{ fontSize: 18, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
          PROJECT SIOKI
        </div>
        
        {/* Title */}
        <h1 style={{ fontSize: 'clamp(64px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.05, color: '#111111', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
          Ship It or Kill It
        </h1>
        
        {/* Subtitle */}
        <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#777', fontWeight: 400, marginBottom: 48 }}>
          PM judgment training through real product decisions
        </div>
        
        {/* Divider */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />
        
        {/* Date */}
        <div style={{ fontSize: 16, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 80 }}>
          MARCH 2026
        </div>
        
        {/* Large Paragraph */}
        <p style={{ 
          fontSize: 'clamp(28px, 4vw, 40px)', 
          fontWeight: 600, 
          lineHeight: 1.35, 
          color: '#222', 
          maxWidth: 960, 
          marginBottom: 100, 
          letterSpacing: '-0.02em' 
        }}>
          — PMs are evaluated on their decisions every day. Nobody trains them to make better ones. We built SIOKI as a simulator for product management judgment, anonymized for pure signal and functional learning.
        </p>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />

        {/* Meta Labels */}
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>ROLE</span>
            <span style={{ color: '#111', fontWeight: 500 }}>SOLOPRENEUR, PRODUCT MANAGER, BUILDER AND DESIGNER</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>STACK</span>
            <span style={{ color: '#111', fontWeight: 500 }}>HTML/CSS, JS, REACT, FIGMA, CLAUDE DESIGN, CLAUDE CODE</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ color: '#999' }}>LIVE</span>
            <a href="https://sioki.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#111', fontWeight: 500, textDecoration: 'none' }}>
              SIOKI.VERCEL.APP
            </a>
          </div>
        </div>

      </section>
      
      {/* SIOKI Demo Video / Trailer */}
      <section style={{ width: '100%', overflow: 'hidden', padding: '0 clamp(20px, 4vw, 60px)', display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ 
            width: '100%', 
            maxWidth: 1400, 
            aspectRatio: '16/9', 
            backgroundColor: '#050505', 
            borderRadius: 16, 
            overflow: 'hidden', 
            position: 'relative',
            cursor: isVideoPlaying ? 'default' : 'pointer',
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)'
          }}
          onClick={() => !isVideoPlaying && setIsVideoPlaying(true)}
        >
          {!isVideoPlaying ? (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="https://ph-files.imgix.net/dc77d84a-0a2b-4eb5-91ed-1065a175ae5c.png" 
                alt="SIOKI Dashboard" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'opacity 0.3s ease' }} 
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
              />
              {/* Glassmorphic Play Button */}
              <div style={{ 
                position: 'absolute', 
                width: 80, 
                height: 80, 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                backdropFilter: 'blur(12px)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                pointerEvents: 'none'
              }}>
                <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid #fff', marginLeft: 6 }} />
              </div>
            </div>
          ) : (
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/xpKRFmErpY4?autoplay=1&rel=0&showinfo=0&modestbranding=1"
              title="SIOKI Project Demo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          )}
        </motion.div>
      </section>

      {/* Project Overview matching the screenshot */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '120px clamp(20px, 4vw, 60px) 120px', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}
      >
        {/* Left Column */}
        <div style={{ flex: '1 1 350px' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 500, marginBottom: 16 }}>
            PROJECT OVERVIEW
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#eaeaea', marginBottom: 24 }} />
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 400, color: '#888', fontStyle: 'italic', lineHeight: 1.6 }}>
            Stated preferences lie. Watching how someone decides across real cases reveals actual PM identity better than any self-assessment.
          </div>
        </div>
        
        {/* Right Column */}
        <div style={{ flex: '1.5 1 500px' }}>
          <div style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#333', lineHeight: 1.5, fontWeight: 400, marginBottom: 60 }}>
            Every PM I know has been in a room where their call got challenged and they couldn't fully defend it. Decision-making is the core of the job — and the one thing nobody actually trains.
          </div>
          
          <div style={{ borderLeft: '1px solid #eaeaea', paddingLeft: 32 }}>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: '#888', lineHeight: 1.7, fontWeight: 400 }}>
              Frameworks for prioritization, sure. Frameworks for product strategy, yes. But the moment of judgment itself — the call you make under pressure with incomplete data — gets treated as a personality trait, not a skill.
            </div>
          </div>
        </div>
      </motion.section>

      {/* THE MECHANIC - 4 Column Layout */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff', borderRadius: 4, overflow: 'hidden', width: '100%' }}>
          {[
            { num: '1', title: 'CONTEXT', text: "A real product decision from history, anonymized so you can't Google it. The moment of choice." },
            { num: '2', title: 'CALL', text: "Ship It or Kill It. One button. No going back. A forced commitment." },
            { num: '3', title: 'REASON', text: "Pick what drove you: Data, Instinct, Risk, or Conviction. This reveals the true signal." },
            { num: '4', title: 'REALITY', text: "History reveals itself. Sometimes you were right. Sometimes the company was wrong." }
          ].map((step, i) => (
            <motion.div 
              key={step.num} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ 
                flex: '1 1 0', 
                minWidth: 260,
                display: 'flex',
                flexDirection: 'column', 
                padding: '60px 40px',
                backgroundColor: '#fff',
                position: 'relative',
                boxShadow: '-12px 0 24px -12px rgba(0,0,0,0.1)', 
                zIndex: i
              }}
            >
              {/* Top Section: Stacked Number, Line, and Title */}
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 24 }}>
                {/* Number wrapper with dynamic underline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-start', marginBottom: 24 }}>
                  <div style={{ fontSize: 'clamp(80px, 8vw, 120px)', fontWeight: 800, color: '#111', lineHeight: 0.8, letterSpacing: '-0.05em' }}>
                    {step.num}
                  </div>
                  {/* Underline filling exactly the number's width */}
                  <div style={{ width: '100%', height: 3, backgroundColor: '#111', marginTop: 16 }} />
                </div>
                
                {/* Increased Title Size, stacked below the number */}
                <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#111' }}>
                  {step.title}
                </div>
              </div>

              {/* Bottom Row: Text taking full width */}
              <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: '#555', lineHeight: 1.6, fontWeight: 400 }}>
                {step.text}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PROBLEM DISCOVERY */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
            01 — PROBLEM DISCOVERY
          </div>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
          <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 40 }}>
            Nobody could define judgment. Nobody trained it. Everyone evaluated for it.
          </div>
          {/* IMAGE BLOCK */}
          <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase' }}>[ SIOKI IMAGE 1 ]</div>
          </div>
        </div>
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#444', lineHeight: 1.6, fontWeight: 400 }}>
            <strong>The moment:</strong> Six years in US tech. Every performance review, every promotion conversation, every leadership meeting — the question underneath everything was always the same: does this person have good judgment? 
          </div>
          <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#666', lineHeight: 1.6, fontWeight: 400 }}>
            I read five books trying to understand why. Mayank Mittal in <em>The Art of Building Great Products</em> says PMs must "combine intuition with proven methodology." Rick Snyder in <em>Decisive Intuition</em> calls trained gut instinct "the great differentiator." Annie Duke in <em>Thinking in Bets</em> shows that the best decisions look wrong half the time — because outcomes and quality of judgment are not the same thing.
            <br/><br/>
            Every book said intuition matters. None of them gave PMs a place to train it.
          </div>
          <div style={{ paddingLeft: 32, borderLeft: '2px solid #111', marginTop: 16 }}>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#111', lineHeight: 1.6, fontWeight: 500 }}>
              <strong>The validation:</strong> I described the concept to a fellow PM before writing a line of code. Her response: "I need this. I don't just want to sharpen my decisions — I want to know what kind of decision maker I actually am." That second part — the identity question — became the archetype reveal. One conversation unlocked the product's second purpose.
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: RUTHLESS PRIORITIZATION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', borderTop: '1px solid #eaeaea' }}
      >
        <div style={{ display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
              02 — RUTHLESS PRIORITIZATION
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Three features explicitly killed before v1 shipped.
            </div>
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 60 }}>
            {[
              {
                title: "User authentication — killed.",
                text: "Login adds friction at the exact moment users need to feel the product's value. SIOKI's core loop — case, call, reason, reveal — works without an account. Killed in week 1. If users want to save their archetype, they screenshot it. That's the share mechanic for free."
              },
              {
                title: "Global leaderboard — killed.",
                text: "The leaderboard idea surfaced early. Competitive PMs, social proof, virality potential. Killed because it optimized for the wrong behavior: getting cases 'right' instead of recognizing your own patterns. A PM who games a leaderboard learns nothing about their judgment. The leaderboard would have made SIOKI a trivia game."
              },
              {
                title: "React migration mid-build — killed.",
                text: "Week 2, I attempted converting the codebase from static HTML to React for 'scalability.' Lost a full day to base64 image handling issues. Killed the migration and shipped vanilla HTML. The product experience is the value — not the stack. This was the hardest cut because it felt like a technical retreat. It was actually the right product decision."
              }
            ].map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-60px', top: -16, fontSize: 64, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.05em', zIndex: -1 }}>0{idx+1}</div>
                <div style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 700, color: '#111', marginBottom: 16 }}>{item.title}</div>
                <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#666', lineHeight: 1.6 }}>{item.text}</div>
              </div>
            ))}
            
            <div style={{ padding: '40px', backgroundColor: '#f9f9f9', marginTop: 20 }}>
              <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 16 }}>THE MLP BAR</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#333', lineHeight: 1.5, fontWeight: 500 }}>
                One complete loop. Case loads → call made → reasoning picked → history revealed → archetype assigned. Everything else is v2.
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: GO-TO-MARKET */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', maxWidth: 1200, margin: '0 auto', borderTop: '1px solid #eaeaea' }}
      >
        <div style={{ display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 24 }}>
              03 — GO-TO-MARKET
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#111', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#111', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 40 }}>
              The GTM strategy was researched and documented before a single outreach message was sent.
            </div>
            {/* IMAGE BLOCK 2 */}
            <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
              <div style={{ fontSize: 12, letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase' }}>[ SIOKI IMAGE 2 ]</div>
            </div>
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Target persona</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Working PM, 2–5 years in, good enough at the job to know what they don't know. They've been in a room where their call got challenged and couldn't fully defend it. They read Lenny's Newsletter. They have opinions about product decisions but no structured way to stress-test those opinions.</div>
            </div>
            <div>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The hook</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>"You're evaluated on your decisions every day. Nobody trains you to make better ones." This is a provocation that is also true. Every working PM who reads it feels a small discomfort — and that discomfort is the click.</div>
            </div>
            <div>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Distribution strategy</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>LinkedIn content-first. Three posts in the 13 days before launch — not promotional, content-led. Posted the Netflix 5-star ratings case as a live debate: "Netflix had data showing star ratings were corrupting their algorithm. Would you have killed a feature users said they loved?" Let PMs argue in comments, then revealed what Netflix actually did 24 hours later. The product experienced before it launched.</div>
            </div>
            <div>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>Launch</div>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Product Hunt, April 14, 2026. Target: 200+ upvotes, 20% comment ratio. Actual: early days. The GTM strategy was researched and documented before a single outreach message was sent — not as a template, as a product decision.</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: NORTH STAR METRIC */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '120px clamp(20px, 4vw, 60px)', backgroundColor: '#111', color: '#fff' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(60px, 10vw, 140px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', fontWeight: 700, marginBottom: 24 }}>
              04 — NORTH STAR METRIC
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: '#fff', marginBottom: 24 }} />
            <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
              Quiz<br/>Completion<br/>Rate.
            </div>
          </div>
          <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 16 }}>
            <div style={{ fontSize: 'clamp(20px, 2vw, 26px)', color: '#fff', lineHeight: 1.5, fontWeight: 500 }}>
              The percentage of users who start SIOKI and reach the archetype reveal screen.
            </div>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#aaa', lineHeight: 1.6 }}>
              <strong>Why this metric:</strong> A PM who completes all 6 cases has experienced the full value proposition. Drop-off before case 3 means the mechanic isn't holding. Drop-off at the reveal means the archetype payoff didn't land. Completion is the only metric that captures whether SIOKI did what it was designed to do.
            </div>
            <div style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: '#aaa', lineHeight: 1.6 }}>
              <strong>What v1 didn't instrument:</strong> Drop-off by case number. Time spent per case. Return visit rate. These are v2 instrumentation priorities — not because they weren't important, but because shipping a working product with one tracked metric beats shipping a perfectly instrumented product two weeks late.
            </div>
            <div style={{ paddingLeft: 32, borderLeft: '2px solid #fff', marginTop: 20 }}>
              <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#fff', lineHeight: 1.6, fontWeight: 500 }}>
                The honest read: SIOKI v1 shipped to validate the mechanic, not to optimize it. The North Star defines what optimization looks like when the time comes.
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 7: BUSINESS HORIZON */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '160px clamp(20px, 4vw, 60px)', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}
      >
        <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 700, marginBottom: 32 }}>
          05 — BUSINESS HORIZON
        </div>
        <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#111', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 60 }}>
          SIOKI is not a B2B SaaS play. It's a consumer product for working PMs — the category nobody has built for seriously.
        </div>
        
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The opportunity</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Duolingo built a $6B company training language intuition through daily repetition. Nobody has done this for professional judgment. PM decision-making is a $2B+ training market (Reforge, Maven, Lenny's) that teaches frameworks — not the judgment that applies them.</div>
          </div>
          <div>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The v2 vision</div>
            <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#555', lineHeight: 1.6 }}>Expand to 30+ cases across 6 planets (the original SIOKI architecture). Add a daily decision — one case per day, streak mechanic, archetype evolves over time. The long-term product is a judgment training streak, not a one-time quiz. The business model is freemium: free for first 6 cases, paid subscription for the full case library and archetype tracking over time.</div>
          </div>
          <div style={{ padding: '40px', backgroundColor: '#f9f9f9', marginTop: 40, borderLeft: '4px solid #111' }}>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#111', marginBottom: 12 }}>The bigger bet</div>
            <div style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: '#111', lineHeight: 1.5, fontWeight: 500 }}>SIOKI proves that the most valuable thing a PM tool can do is hold up a mirror — not give answers, but reveal patterns. That insight scales beyond PMs. But that's not the next thing to build. The next thing is getting working PMs to come back tomorrow.</div>
          </div>
        </div>
      </motion.section>

      {/* NEXT PROJECT FOOTER */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ borderTop: '1px solid #eaeaea', marginTop: 80 }}
      >
        <Link 
          to="/projects/lucid" 
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '120px clamp(20px, 4vw, 60px)', textAlign: 'center', transition: 'background-color 0.4s ease' }} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', fontWeight: 700, marginBottom: 24 }}>
            NEXT PROJECT
          </div>
          <div style={{ fontSize: 'clamp(60px, 8vw, 120px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>
            LUCID.
          </div>
        </Link>
      </motion.section>

    </div>
  )
}

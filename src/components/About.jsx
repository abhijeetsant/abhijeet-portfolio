import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
  })
}

const LinkedInIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const SubstackIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
  </svg>
)

const MediumIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
)

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/abhijeetsant', Icon: LinkedInIcon },
  { label: 'GitHub', href: 'https://github.com/abhijeetsant', Icon: GitHubIcon },
  { label: 'Substack', href: 'https://secondfurther.substack.com', Icon: SubstackIcon },
  { label: 'Medium', href: 'https://medium.com/@abhijeetsant', Icon: MediumIcon },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={ref}
      id="about"
      style={{
        background: 'var(--bg-dark)',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        gap: 'clamp(20px, 4vw, 80px)',
        padding: '0 clamp(20px, 6vw, 80px)'
      }}
    >
      {/* Sticky photo */}
      <div style={{
        flexShrink: 0,
        marginLeft: 0,
        perspective: '10px',
        width: '100%',
        maxWidth: 460,
        height: 700,
        borderRadius: 16,

      }}>
        <motion.img

          src="/about.jpg"
          alt="Abhijeet Sant"
          style={{
            width: '100%',
            maxWidth: 420,
            height: 620,
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'grayscale(100%)',
            opacity: 0.85,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            transform: 'translateZ(-2px) scale(1.3)',
            y
          }}
        />
      </div>

      {/* Scrolling content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        paddingLeft: '80px',
      }}>

        <motion.p
          initial="hidden"
          whileInView="show"
          variants={rise}
          custom={0.1}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            fontFamily: 'Kaisei Tokumin, serif',
            fontSize: '28px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.4)',
            margin: 0
          }}
        >
          I learned to think in systems, to understand users deeply, to take complexity and turn it into{' '}
          <strong style={{ color: 'var(--white-hi)', fontWeight: 700 }}>
            decisions that move products forward.
          </strong>
          {' '}The ceiling was not loud — it was the accumulation of small realizations that ownership would always be limited.
        </motion.p>

        <motion.p
          initial="hidden"
          whileInView="show"
          variants={rise}
          custom={0.2}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            fontFamily: 'Kaisei Tokumin, serif',
            fontSize: '28px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.4)',
            margin: 0
          }}
        >
          Coming back was not the obvious move. But India was uncertain{' '}
          <strong style={{ color: 'var(--white-hi)', fontWeight: 700 }}>
            in the way open doors are uncertain.
          </strong>
          {' '}I want to shape something, not inherit it.
          {/* read the Full Story */}
          <a
            href="/story.html"
            style={{
              display: 'block',
              fontSize: 15,
              marginTop: 25,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
              textDecoration: 'none'
            }}
          >
            Read the full story →
          </a>
        </motion.p>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        {/* Social icons */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={rise}
          custom={0.4}
          viewport={{ once: true, amount: 0.3 }}
          style={{ display: 'flex', gap: 62, alignItems: 'center' }}
        >
          {SOCIAL.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={label}
              style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--white-hi)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              <Icon />
            </a>
          ))}
        </motion.div>

        {/* Resume */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={rise}
          custom={0.5}
          viewport={{ once: true, amount: 0.3 }}
          style={{ display: 'flex', gap: 32, alignItems: 'center' }}
        >
          <a
            href="/sant_abhijeet.pdf"
            download
            style={{
              fontSize: 17,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--amber)',
              textDecoration: 'none'
            }}
          >
            Resume ↓
          </a>
          
        </motion.div>

      </div>
    </section>
  )
}
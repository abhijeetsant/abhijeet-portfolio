import { motion } from 'motion/react'

const LINES = [
  "I've been doing this work longer than I knew what to call it. Trade finance platforms in the Nordics, workforce intelligence in the US, now building from India — three geographies, one discipline. I document my thinking. I defend my calls. I build in public.",
  "The work speaks. This portfolio is the transcript."
]

export default function ScrollReveal() {
  return (
    <section style={{
      background: 'var(--bg-dark)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 80px'
    }}>
      <p style={{
        fontFamily: 'Kaisei Tokumin, serif',
        fontSize: 'clamp(32px, 3.5vw, 42px)',
        fontWeight: 700,
        lineHeight: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2em',
        margin: 0
      }}>
        {LINES.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.1 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            viewport={{ once: false, amount: 0.8 }}
            style={{ color: 'var(--white-hi)', display: 'block' }}
          >
            {line}
          </motion.span>
        ))}
      </p>
    </section>
  )
}
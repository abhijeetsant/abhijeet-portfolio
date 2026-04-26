import { motion } from 'motion/react'

const LINES = [
  "2026 is a strange year to be a PM. Half the function is being absorbed into AI; the other half is being asked to wield it. What survives is the work nobody can automate yet — judgment under pressure, decisions made before the data lands, the calls that look obvious in hindsight and impossible in the moment. I trained for this part deliberately.",
  "Now I'm building it.",
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
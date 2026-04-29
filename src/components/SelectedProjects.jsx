import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PROJECTS = [
  {
    name: 'Lucid',
    category: 'AI Safety',
    description: 'AI-powered safety layer for Indian families navigating digital misinformation.',
    to: '/projects/lucid',
    color: '#1a1a2e',
  },
  {
    name: 'Specter',
    category: 'RESEARCH TOOL',
    description: 'Synthetic user research agent that simulates target-persona reactions to product concepts.',
    to: '/projects/specter',
    color: '#0f0f0f',
  },
]

export default function SelectedProjects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-light)', padding: '0 0 120px' }}>
      <div style={{ textAlign: 'center', padding: '80px 80px 88px' }}>
        <span style={{ fontFamily: 'Kaisei Tokumin, serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#111111', letterSpacing: 0 }}>
          Selected projects.
        </span>
      </div>
      {PROJECTS.map((project, i) => (
        <ProjectRow key={project.name} project={project} index={i} isLast={i === PROJECTS.length - 1} />
      ))}
    </section>
  )
}

function ProjectRow({ project, index, isLast }) {
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Link to={project.to} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
        alignItems: 'center',
        gap: isMobile ? 24 : 60,
        padding: '48px clamp(24px, 10vw, 250px)',
        borderBottom: isLast ? 'none' : '0.5px solid var(--border-light)',
        textDecoration: 'none',
        cursor: 'pointer',
        background: hovered ? 'rgba(0,0,0,0.02)' : 'transparent',
        transition: 'background 0.3s ease',
      }}
    >
      <div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Geist, sans-serif', fontSize: 17, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 12 }}
            >
              {project.category}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left center' }}
        >
          <div style={{ fontFamily: 'Kaisei Tokumin, serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {project.name}
          </div>
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              style={{ fontFamily: 'Geist, sans-serif', fontSize: 17, lineHeight: 1.7, color: 'var(--text-secondary)', marginTop: 12, maxWidth: 420 }}
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={isMobile ? { height: 200, width: '100%' } : { height: hovered ? 240 : 140, width: hovered ? 380 : 300 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: project.color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(isMobile ? { width: '100%', height: 200 } : {}) }}
      >
        <div style={{ position: 'absolute', inset: 0, background: project.name === 'Lucid' ? `linear-gradient(to bottom, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.9) 100%), url(/lucid-bg.jpeg)` : project.name === 'Specter' ? `linear-gradient(to bottom, rgba(13,13,26,0.3) 0%, rgba(13,13,26,0.9) 100%), url(/specter-hero.jpeg)` : `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(/sioki-bg.png)`, backgroundSize: 'cover', backgroundPosition: project.name === 'Lucid' ? 'center top' : 'center' }} />
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', bottom: 16, right: 16 }}
            >
              <div
                style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff' }}
              >
                →
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    </Link>
  )
}

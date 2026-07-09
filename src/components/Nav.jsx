import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const LINKS = ['About', 'Work', 'Decisions', 'Contact']

export default function Nav() {
  const [isWide, setIsWide] = useState(window.innerWidth >= 768)
  const [menuOpen, setMenuOpen] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = e => {
      setIsWide(e.matches)
      if (e.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const tick = () => {
      const ist = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      const d = new Date(ist)
      const h = String(d.getHours()).padStart(2, '0')
      const m = String(d.getMinutes()).padStart(2, '0')
      const s = String(d.getSeconds()).padStart(2, '0')
      setClock(`${h}:${m}:${s} IST`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: isWide ? '0 48px' : '0 20px',
        height: 56, borderBottom: '0.5px solid var(--border-dark)',
        background: 'rgba(15,15,15,0.85)',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{
          fontFamily: 'Kaisei Tokumin, serif',
          fontSize: isWide ? 30 : 22, fontWeight: 700,
          color: 'var(--white-hi)', letterSpacing: '0.04em'
        }}>
          A.Sant
        </div>

        {isWide && (
          <div style={{
            display: 'flex', gap: 8,
            position: 'absolute', left: '50%', transform: 'translateX(-50%)'
          }}>
            {LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{
                fontSize: 20, color: 'var(--white-mid)', textDecoration: 'none',
                letterSpacing: '0.08em', textTransform: 'uppercase'
              }}>{link}</a>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            fontSize: 11, color: 'var(--white-lo)', letterSpacing: '0.1em',
            fontVariantNumeric: 'tabular-nums',
            display: isWide ? 'block' : 'none'
          }}>
            {clock}
          </div>

          {!isWide && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                background: 'none', border: 'none', padding: 10,
                margin: '-10px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
                color: 'var(--white-hi)'
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {!isWide && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 56, left: 0, right: 0, zIndex: 99,
              background: 'rgba(15,15,15,0.98)', backdropFilter: 'blur(12px)',
              borderBottom: '0.5px solid var(--border-dark)',
              display: 'flex', flexDirection: 'column',
              padding: '8px 20px 20px'
            }}
          >
            {LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 22, color: 'var(--white-hi)', textDecoration: 'none',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  padding: '16px 0', borderBottom: '0.5px solid var(--border-dark)'
                }}
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

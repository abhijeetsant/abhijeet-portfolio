import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function CustomCursor() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return null

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState('default') // 'default' | 'pointer' | 'view-project'

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      const target = e.target

      // Check if inside a view-project tile (walk up the DOM)
      const projectTile = target.closest('[data-cursor="view-project"]')
      if (projectTile) {
        setCursorState('view-project')
        return
      }

      const isPointer = window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'

      setCursorState(isPointer ? 'pointer' : 'default')
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const isViewProject = cursorState === 'view-project'
  const isPointer = cursorState === 'pointer'

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: isViewProject ? 'normal' : 'difference',
      }}
      animate={{
        x: isViewProject ? mousePos.x - 44 : mousePos.x - 8,
        y: isViewProject ? mousePos.y - 44 : mousePos.y - 8,
        width: isViewProject ? 88 : 16,
        height: isViewProject ? 88 : 16,
        backgroundColor: isViewProject ? 'rgba(255,255,255,0.12)' : '#ffffff',
        borderRadius: '50%',
        border: isViewProject ? '1px solid rgba(255,255,255,0.25)' : '0px solid transparent',
        backdropFilter: isViewProject ? 'blur(8px)' : 'none',
        scale: isPointer ? 3 : 1,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.5 }}
    >
      <AnimatePresence>
        {isViewProject && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              fontSize: 9,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffffff',
              fontFamily: 'Geist, sans-serif',
              textAlign: 'center',
              lineHeight: 1.5,
              fontWeight: 500,
              userSelect: 'none',
            }}
          >
            VIEW<br />PROJECT
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

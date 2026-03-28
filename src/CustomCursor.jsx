import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      const target = e.target
      const isSelectable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName === 'A' || 
                          target.tagName === 'BUTTON' ||
                          target.closest('.cursor-none')
      
      setIsPointer(isSelectable)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: mousePos.x - 8,
        y: mousePos.y - 8,
        scale: isPointer ? 4 : 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
    />
  )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const PROJECTS = [
  {
    id: "lucid",
    category: "AI SAFETY · 2026",
    title: "Lucid",
    desc: "A family safety app that detects AI-generated synthetic media on social platforms in real time.",
    image: "/sioki-screen.png",
    href: "#",
  },
  {
    id: "sioki",
    category: "PRODUCT STRATEGY · 2026",
    title: "SIOKI",
    desc: "A PM judgment training simulator with 12 real decisions that shaped the products you use.",
    image: "/sioki-screen.png",
    href: "#",
  },
  {
    id: "signal",
    category: "PERSONAL INTEL · 2025",
    title: "Signal & Cipher",
    desc: "A personal intelligence system built to synthesise market signals — turning noise into clarity.",
    image: null,
    href: "#",
  }
]

function ProjectRow({ project, index, setHoveredProject }) {
  return (
    <motion.a
      href={project.href}
      className="group block py-16 md:py-24 border-b border-black/5 relative overflow-visible cursor-none"
      onMouseEnter={() => setHoveredProject(project)}
      onMouseLeave={() => setHoveredProject(null)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 relative z-10">
        {/* Left: Category & Number */}
        <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] font-bold text-text-secondary uppercase">
          <span>0{index + 1}</span>
          <span className="w-8 h-[1px] bg-black/10"></span>
          <span>{project.category}</span>
        </div>

        {/* Center: Title */}
        <div className="flex-1 md:text-center">
          <h3 className="font-display text-4xl md:text-7xl font-bold tracking-tighter group-hover:text-accent transition-colors duration-500">
            {project.title}
          </h3>
        </div>

        {/* Right: Desc / CTA */}
        <div className="flex flex-col items-end gap-2 text-right">
          <p className="font-body text-[11px] font-medium text-text-secondary uppercase tracking-widest hidden md:block">
            EXPLORE PROJECT
          </p>
          <div className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
            ↗
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default function SelectedProjects() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="bg-bg py-24 px-8 md:px-16"
    >
      {/* List */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <ProjectRow 
            key={project.id} 
            project={project} 
            index={i} 
            setHoveredProject={setHoveredProject} 
          />
        ))}
      </div>

      {/* Floating Thumbnail Reveal */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              x: mousePos.x + 20, 
              y: mousePos.y - 120 
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="fixed pointer-events-none z-[100] w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/5"
          >
            {hoveredProject.image ? (
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-bg-secondary text-text-secondary font-display text-4xl font-bold opacity-20">
                ?
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}


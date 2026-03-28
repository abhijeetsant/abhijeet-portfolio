import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const CONTENT = [
  {
    num: "01",
    label: "CEILING_ANALYSIS",
    text: "The US gave me real skills. I learned to think in systems, to understand users deeply, to take complexity and turn it into decisions that actually move products forward. That sharpness — how to prioritize, how to align, how to build with purpose — I carry that everywhere."
  },
  {
    num: "02",
    label: "MARKET_THESIS",
    text: "But skill without room to use it fully is just potential sitting in a box. The ceiling wasn't loud. It was the accumulation of small realizations — that ownership would always be limited, that the most important rooms had a different kind of entry requirement."
  },
  {
    num: "03",
    label: "VELOCITY_WINDOW",
    text: "Coming back to India was not the obvious move. It was not the comfortable move. The ecosystem has crossed a real threshold — capital is serious, founders are sharp, and a generation of builders is solving hard problems without waiting for Western validation."
  },
  {
    num: "04",
    label: "CAREER_BET",
    text: "There is a window in every career where you are at your most dangerous — experienced enough to move fast, hungry enough to still absorb everything around you. I'm in that window right now, and I'm using it with full attention. I chose the chance."
  }
]

function ScrollSection({ item, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  })

  // Fade from light grey to deep charcoal
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 1, 0.15])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="py-32 md:py-48 flex flex-col gap-8"
    >
      <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] font-bold text-accent uppercase">
        <span>{item.num}</span>
        <span className="w-8 h-[1px] bg-accent/20"></span>
        <span className="text-text-secondary opacity-60">{item.label}</span>
      </div>

      <p className="font-display text-2xl md:text-5xl font-bold tracking-tight leading-[1.15] text-text-primary">
        {item.text}
      </p>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section className="bg-bg grid grid-cols-1 md:grid-cols-[40%_60%] border-t border-black/5">
      
      {/* Left: Sticky Image Container */}
      <div className="hidden md:block relative h-screen sticky top-0 border-right border-black/5 bg-bg-secondary/30">
        <div className="absolute inset-0 p-12 flex flex-col justify-between">
          <div className="w-full aspect-[3/4] overflow-hidden rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src="/abhijeet.jpeg" 
              alt="Abhijeet Sant" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-xl font-bold">ABHIJEET SANT</h3>
            <p className="text-[10px] tracking-widest text-text-secondary font-bold uppercase">PRODUCT MANAGER · MUMBAI, IN</p>
          </div>
        </div>
      </div>

      {/* Right: Scrollable Content */}
      <div className="px-8 md:px-24 py-24">
        {/* Header Label */}
        <div className="flex items-center gap-4 mb-32 text-[10px] tracking-[0.2em] font-medium text-text-secondary uppercase">
          <span>02 / IDENTITY</span>
          <span className="w-12 h-[1px] bg-black/10"></span>
          <span>THE STORY SO FAR</span>
        </div>

        {/* Narrative Flow */}
        <div className="flex flex-col">
          {CONTENT.map((item, index) => (
            <ScrollSection key={item.num} item={item} index={index} />
          ))}
        </div>

        {/* Footer Link / CTA */}
        <div className="mt-32 pt-12 border-t border-black/5">
          <a 
            href="/sant_abhijeet.pdf" 
            className="text-xs font-bold tracking-widest text-text-primary border-b border-black/20 pb-1 hover:text-accent hover:border-accent transition-colors cursor-none"
          >
            READ FULL RESUME (PDF) ↓
          </a>
        </div>
      </div>
    </section>
  )
}


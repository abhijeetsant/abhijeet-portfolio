import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FullStory = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal lines as they enter viewport
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        opacity: 0.2,
        stagger: 0.1,
      });

      // Animate the horizontal rules (dividers)
      gsap.from(".hr-line", {
        scrollTrigger: {
          trigger: ".hr-line",
          start: "top 90%",
        },
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] text-[#efefef] px-6 md:px-20 py-24">
      {/* SECTION 01: THE CEILING */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-40">
        <div className="md:col-span-4 sticky top-24 h-fit">
          <span className="font-mono text-xs uppercase tracking-widest text-[#cfa15a]">01 / The Realization</span>
          <h2 className="mt-6 text-4xl font-light leading-tight font-serif italic">
            The US was good. <br /> The ceiling was real. [cite: 6]
          </h2>
        </div>
        <div className="md:col-start-6 md:col-span-7 space-y-12 text-xl md:text-2xl leading-relaxed opacity-90">
          <p className="reveal-text">
            I learned to think in systems, to understand users deeply, and to turn complexity into decisions that move products forward. [cite: 8]
          </p>
          <p className="reveal-text">
            But skill without room to use it fully is just potential sitting in a box. [cite: 10] The ceiling wasn't loud—it was the accumulation of small realizations that ownership would always be limited. [cite: 11, 12]
          </p>
        </div>
      </div>

      <div className="hr-line h-[1px] w-full bg-white/10 mb-40" />

      {/* SECTION 02: THE OPEN DOOR */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-40">
        <div className="md:col-span-4 sticky top-24 h-fit">
          <span className="font-mono text-xs uppercase tracking-widest text-[#cfa15a]">02 / The Pivot</span>
          <h2 className="mt-6 text-4xl font-light leading-tight font-serif italic">
            Uncertain in the way <br /> open doors are. [cite: 31]
          </h2>
        </div>
        <div className="md:col-start-6 md:col-span-7 space-y-12 text-xl md:text-2xl leading-relaxed opacity-90">
          <p className="reveal-text">
            Coming back to India was not the obvious move. [cite: 24] But here, a generation of builders is solving hard problems without waiting for Western validation. [cite: 32]
          </p>
          <p className="reveal-text">
            I'm in a window where I am experienced enough to move fast, yet hungry enough to absorb everything. [cite: 37] I want to shape something that matters, not inherit someone else's finished story. [cite: 46]
          </p>
        </div>
      </div>

      {/* BIG STATEMENT FOOTER */}
      <div className="flex flex-col items-center justify-center py-20 border-t border-white/10">
        <h3 className="text-[15vw] font-serif uppercase tracking-tighter leading-none opacity-5 select-none">SHAPE</h3>
        <div className="mt-[-5vw] text-center">
          <p className="text-lg italic font-light max-w-md mx-auto mb-8">
            "Staying hopeful inside a system that isn't designed for you to win isn't resilience. It's just delayed clarity." [cite: 21]
          </p>
          <div className="flex justify-center gap-10 font-mono text-xs uppercase tracking-widest">
             <a href="/resume.pdf" className="hover:text-[#cfa15a] transition-colors">Resume ↓</a>
             <a href="https://substack.com" className="hover:text-[#cfa15a] transition-colors">SecondFurther →</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullStory;
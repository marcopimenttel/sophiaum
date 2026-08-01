import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { EVENT_CONFIG, HERO_IMAGES } from '../../config/event'
import { useMemo } from 'react'

export function Hero() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 8,
        opacity: Math.random() * 0.5 + 0.3,
      })),
    []
  )

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGES[0]}
          alt={`Foto de ${EVENT_CONFIG.name}`}
          className="w-full h-full object-cover object-top md:object-[center_20%]"
        />
      </motion.div>

      <div className="absolute inset-0 overlay-gradient-red" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: '-10px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 section-container flex flex-col items-center text-center pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-accent-400 mb-4"
        >
          <Sparkles size={24} className="mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/90 font-display italic text-base sm:text-xl tracking-wide mb-2"
        >
          Você está convidado(a) para celebrar os
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-baseline justify-center gap-2"
        >
          <span className="text-shimmer font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-wider">
            15
          </span>
          <span className="text-shimmer font-display text-2xl sm:text-4xl md:text-5xl font-light italic">
            anos
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="my-5 h-px w-28 sm:w-40 bg-gradient-to-r from-transparent via-accent-400 to-transparent"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-script text-4xl sm:text-6xl md:text-7xl text-white drop-shadow-2xl leading-tight"
        >
          {EVENT_CONFIG.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-white/70 text-xs sm:text-sm font-[Poppins] font-light mt-5 tracking-[0.15em] uppercase max-w-md"
        >
          Com os pais {EVENT_CONFIG.parents}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 scroll-indicator z-20"
      >
        <ChevronDown size={28} className="text-white/60" />
      </motion.div>
    </section>
  )
}

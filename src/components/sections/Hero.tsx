import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { EVENT_CONFIG, HERO_IMAGES } from '../../config/event'
import { useMemo } from 'react'

export function Hero() {
  // Gera partículas douradas aleatórias
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24"
    >
      {/* Background image */}
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 overlay-gradient-red" />

      {/* Golden particles */}
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

      {/* Content */}
      <div className="relative z-20 text-center section-container flex flex-col items-center px-4 pt-8 pb-20">
        {/* Top spark */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-accent-400 mb-4 sm:mb-5"
        >
          <Sparkles size={28} className="mx-auto" />
        </motion.div>

        {/* "Você está convidado(a)" */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/90 font-display italic text-base sm:text-xl md:text-2xl tracking-wide mb-3 px-2"
        >
          Você está convidado(a) para celebrar os
        </motion.p>

        {/* "15 anos" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-2 flex items-baseline justify-center gap-2"
        >
          <span className="text-shimmer font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-wider">
            15
          </span>
          <span className="text-shimmer font-display text-2xl sm:text-4xl md:text-5xl font-light italic">
            anos
          </span>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto my-5 sm:my-6 h-[1px] w-32 md:w-48 bg-gradient-to-r from-transparent via-accent-400 to-transparent"
        />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl leading-tight px-2"
        >
          {EVENT_CONFIG.name}
        </motion.h1>

        {/* Parents' names */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-white/70 text-xs sm:text-sm font-[Poppins] font-light mt-5 sm:mt-6 tracking-wider uppercase px-4"
        >
          Com os pais {EVENT_CONFIG.parents}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator z-20"
      >
        <ChevronDown size={32} className="text-white/60" />
      </motion.div>
    </section>
  )
}

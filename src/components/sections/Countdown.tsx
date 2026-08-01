import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { EVENT_CONFIG, HERO_IMAGES } from '../../config/event'
import { ScrollReveal } from '../ui/ScrollReveal'

interface CountdownCardProps {
  value: number
  label: string
  index: number
}

function CountdownCard({ value, label, index }: CountdownCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-3xl p-5 sm:p-7 md:p-8 text-center flex-1 max-w-[160px] border border-white/25 shadow-2xl backdrop-blur-2xl"
    >
      <motion.span
        key={value}
        initial={{ scale: 1.25, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="block font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="block mt-2 text-xs sm:text-sm text-accent-300 font-[Poppins] font-bold uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  )
}

export function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(EVENT_CONFIG.date)

  return (
    <section
      id="countdown"
      className="relative py-24 md:py-36 overflow-hidden bg-neutral-950"
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={HERO_IMAGES[1]}
          alt=""
          className="w-full h-full object-cover blur-md opacity-35 scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-neutral-950/80" />
      </div>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <p className="text-center text-accent-400 font-[Poppins] font-bold text-sm sm:text-base uppercase tracking-[0.35em] mb-8">
            {isExpired ? 'O grande dia chegou!' : 'Contagem Regressiva'}
          </p>
        </ScrollReveal>

        {!isExpired && (
          <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
            <CountdownCard value={days} label="Dias" index={0} />
            <CountdownCard value={hours} label="Horas" index={1} />
            <CountdownCard value={minutes} label="Minutos" index={2} />
            <CountdownCard value={seconds} label="Segundos" index={3} />
          </div>
        )}

        {isExpired && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center font-script text-5xl text-accent-400 mt-4"
          >
            É hoje! ✨
          </motion.p>
        )}

        <ScrollReveal delay={0.3}>
          <p className="text-center text-white/80 font-[Poppins] text-base sm:text-lg mt-10 tracking-wide font-light">
            {new Date(EVENT_CONFIG.date).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

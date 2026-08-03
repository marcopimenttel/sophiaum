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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="glass rounded-2xl px-2 py-5 sm:px-4 sm:py-7 text-center border border-white/20"
    >
      <motion.span
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="block font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="block mt-3 sm:mt-3.5 text-[10px] sm:text-xs text-accent-300 font-[Poppins] font-semibold uppercase tracking-[0.14em]">
        {label}
      </span>
    </motion.div>
  )
}

export function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(EVENT_CONFIG.date)

  return (
    <section id="countdown" className="relative page-section overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={HERO_IMAGES[1]}
          alt=""
          className="w-full h-full object-cover blur-md opacity-35 scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-neutral-950/80" />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center text-center gap-10 sm:gap-12">
        <ScrollReveal>
          <p className="text-accent-400 font-[Poppins] font-semibold text-xs sm:text-sm uppercase tracking-[0.28em]">
            {isExpired ? 'O grande dia chegou!' : 'Contagem Regressiva'}
          </p>
        </ScrollReveal>

        {!isExpired && (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-xl mx-auto">
            <CountdownCard value={days} label="Dias" index={0} />
            <CountdownCard value={hours} label="Horas" index={1} />
            <CountdownCard value={minutes} label="Minutos" index={2} />
            <CountdownCard value={seconds} label="Segundos" index={3} />
          </div>
        )}

        {isExpired && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-script text-5xl text-accent-400"
          >
            É hoje!
          </motion.p>
        )}

        <ScrollReveal delay={0.25}>
          <p className="text-white/75 font-[Poppins] text-sm sm:text-base tracking-wide font-light capitalize">
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

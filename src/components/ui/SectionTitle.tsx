import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  subtitle?: string
  light?: boolean
  className?: string
}

export function SectionTitle({ children, subtitle, light = false, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex flex-col items-center justify-center text-center w-full mb-12 sm:mb-16 md:mb-20 ${className}`}
    >
      {/* Script Title */}
      <h2
        className={`font-script text-5xl sm:text-6xl md:text-7xl leading-tight ${
          light ? 'text-white' : 'text-neutral-900'
        }`}
      >
        {children}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-2 font-display italic text-base sm:text-lg md:text-xl max-w-lg mx-auto ${
            light ? 'text-neutral-300' : 'text-neutral-500'
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Animated Golden Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 h-[2px] w-24 sm:w-32 bg-gradient-to-r from-transparent via-accent-500 to-transparent"
      />
    </motion.div>
  )
}

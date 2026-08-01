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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`flex flex-col items-center text-center w-full mb-8 sm:mb-10 md:mb-12 ${className}`}
    >
      <h2
        className={`font-script text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.15] ${
          light ? 'text-white' : 'text-neutral-900'
        }`}
      >
        {children}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 sm:mt-4 font-display italic text-sm sm:text-base max-w-lg leading-relaxed ${
            light ? 'text-neutral-300' : 'text-neutral-500'
          }`}
        >
          {subtitle}
        </p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-5 h-0.5 w-16 sm:w-24 bg-gradient-to-r from-transparent via-accent-500 to-transparent"
      />
    </motion.div>
  )
}

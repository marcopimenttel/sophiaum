import { motion } from 'framer-motion'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'whatsapp' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
  icon?: ReactNode
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white shadow-xl shadow-primary-700/30 hover:shadow-2xl hover:shadow-primary-700/40 hover:from-primary-700 hover:to-primary-900 border border-primary-500/30',
  outline:
    'border-2 border-primary-600/50 text-primary-700 bg-white/90 backdrop-blur-md hover:bg-primary-50 hover:border-primary-600 shadow-md hover:shadow-lg',
  whatsapp:
    'bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-700 text-white shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40 hover:from-emerald-600 hover:to-emerald-800 border border-emerald-400/40',
  ghost:
    'text-neutral-700 hover:bg-neutral-200/60 hover:text-neutral-900',
  danger:
    'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-600/30 hover:from-red-700 hover:to-red-800 border border-red-500/30',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-5 py-3 text-xs sm:text-sm font-semibold rounded-2xl min-h-[44px]',
  md: 'px-7 py-4 text-sm sm:text-base font-semibold rounded-2xl min-h-[52px]',
  lg: 'px-9 py-4.5 text-base sm:text-lg font-semibold rounded-2xl min-h-[58px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  icon,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`
        inline-flex items-center justify-center gap-3
        font-medium font-[Poppins] tracking-wide text-center
        transition-all duration-300 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0 text-xl">{icon}</span>
      ) : null}
      <span className="whitespace-nowrap">{children}</span>
    </motion.button>
  )
}

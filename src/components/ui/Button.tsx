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
    'bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg shadow-primary-700/25 hover:from-primary-700 hover:to-primary-900 border border-primary-500/20',
  outline:
    'border border-primary-600/40 text-primary-700 bg-white hover:bg-primary-50 hover:border-primary-600 shadow-sm',
  whatsapp:
    'bg-gradient-to-r from-emerald-500 to-green-700 text-white shadow-lg shadow-emerald-600/25 hover:from-emerald-600 hover:to-emerald-800 border border-emerald-400/30',
  ghost: 'text-neutral-700 hover:bg-neutral-100',
  danger:
    'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25 hover:from-red-700 hover:to-red-800 border border-red-500/20',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2.5 text-sm min-h-[40px] rounded-xl gap-2',
  md: 'px-5 py-3 text-sm sm:text-[15px] min-h-[48px] rounded-xl gap-2.5',
  lg: 'px-6 py-3.5 text-[15px] sm:text-base min-h-[52px] rounded-xl gap-2.5',
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
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        inline-flex items-center justify-center
        font-semibold font-[Poppins] tracking-wide text-center
        transition-colors duration-200 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0 flex items-center justify-center [&_svg]:size-5">{icon}</span>
      ) : null}
      <span className="leading-none">{children}</span>
    </motion.button>
  )
}

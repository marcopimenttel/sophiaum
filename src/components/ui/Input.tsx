import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  variant?: 'light' | 'dark'
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  variant?: 'light' | 'dark'
}

export function Input({ label, error, id, variant = 'light', className = '', ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-')
  const isDark = variant === 'dark'

  return (
    <div className="w-full text-left">
      <label
        htmlFor={inputId}
        className={`block text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2.5 font-[Poppins] ${
          isDark ? 'text-neutral-200' : 'text-neutral-700'
        }`}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl text-base font-[Poppins] min-h-[52px] sm:min-h-[56px]
          transition-all duration-300 shadow-md
          ${
            isDark
              ? 'bg-neutral-900/90 border-2 border-neutral-700 text-white placeholder:text-neutral-500 focus:bg-neutral-900 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20'
              : 'bg-white border-2 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
          }
          focus:outline-none
          ${error ? (isDark ? 'border-red-400 ring-4 ring-red-400/20' : 'border-red-500 ring-4 ring-red-100') : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-xs sm:text-sm text-red-400 font-[Poppins] font-medium flex items-center gap-1.5">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  )
}

export function TextArea({ label, error, id, variant = 'light', className = '', ...props }: TextAreaProps) {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-')
  const isDark = variant === 'dark'

  return (
    <div className="w-full text-left">
      <label
        htmlFor={inputId}
        className={`block text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2.5 font-[Poppins] ${
          isDark ? 'text-neutral-200' : 'text-neutral-700'
        }`}
      >
        {label}
      </label>
      <textarea
        id={inputId}
        rows={3}
        className={`
          w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl text-base font-[Poppins] resize-none
          transition-all duration-300 shadow-md
          ${
            isDark
              ? 'bg-neutral-900/90 border-2 border-neutral-700 text-white placeholder:text-neutral-500 focus:bg-neutral-900 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20'
              : 'bg-white border-2 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
          }
          focus:outline-none
          ${error ? (isDark ? 'border-red-400 ring-4 ring-red-400/20' : 'border-red-500 ring-4 ring-red-100') : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-xs sm:text-sm text-red-400 font-[Poppins] font-medium flex items-center gap-1.5">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  )
}

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

const fieldBase =
  'w-full rounded-xl text-[15px] sm:text-base font-[Poppins] transition-all duration-200 focus:outline-none'

export function Input({ label, error, id, variant = 'light', className = '', ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-')
  const isDark = variant === 'dark'

  return (
    <div className="w-full text-left">
      <label
        htmlFor={inputId}
        className={`block text-xs font-semibold uppercase tracking-[0.12em] mb-3 font-[Poppins] ${
          isDark ? 'text-neutral-300' : 'text-neutral-600'
        }`}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          ${fieldBase}
          px-4 sm:px-5 py-4 min-h-[52px] sm:min-h-[56px]
          ${
            isDark
              ? 'bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/25'
              : 'bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
          }
          ${error ? (isDark ? 'border-red-400 focus:ring-red-400/20' : 'border-red-500 focus:ring-red-100') : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className={`mt-2 text-xs font-[Poppins] font-medium ${isDark ? 'text-red-300' : 'text-red-600'}`}>
          {error}
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
        className={`block text-xs font-semibold uppercase tracking-[0.12em] mb-3 font-[Poppins] ${
          isDark ? 'text-neutral-300' : 'text-neutral-600'
        }`}
      >
        {label}
      </label>
      <textarea
        id={inputId}
        rows={3}
        className={`
          ${fieldBase}
          px-4 sm:px-5 py-4 resize-none
          ${
            isDark
              ? 'bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/25'
              : 'bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
          }
          ${error ? (isDark ? 'border-red-400 focus:ring-red-400/20' : 'border-red-500 focus:ring-red-100') : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className={`mt-2 text-xs font-[Poppins] font-medium ${isDark ? 'text-red-300' : 'text-red-600'}`}>
          {error}
        </p>
      )}
    </div>
  )
}

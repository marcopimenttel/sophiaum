import { Heart, Sparkles } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { EVENT_CONFIG } from '../../config/event'

export function Footer() {
  return (
    <footer className="pt-12 pb-10 bg-neutral-950 text-white text-center border-t border-neutral-900">
      <div className="section-container flex flex-col items-center">
        <ScrollReveal className="w-full flex flex-col items-center">
          <div className="flex justify-center items-center gap-2 text-accent-400 mb-4">
            <Sparkles size={14} />
            <Sparkles size={18} />
            <Sparkles size={14} />
          </div>

          <p className="font-script text-3xl sm:text-4xl text-white mb-2">
            Esperamos você!
          </p>

          <p className="text-neutral-400 font-[Poppins] text-sm">
            Com muito carinho,{' '}
            <span className="text-white font-medium">{EVENT_CONFIG.parents}</span>
          </p>

          <div className="my-6 h-px w-20 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

          <p className="text-neutral-500 font-[Poppins] text-xs flex flex-wrap items-center justify-center gap-1.5">
            <span>Feito com</span>
            <Heart size={12} className="text-primary-500 fill-primary-500 shrink-0" />
            <span>para os 15 anos de</span>
            <span className="text-neutral-300 font-medium">{EVENT_CONFIG.name}</span>
          </p>
        </ScrollReveal>
      </div>
    </footer>
  )
}

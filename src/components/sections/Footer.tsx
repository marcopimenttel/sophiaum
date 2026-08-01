import { Heart, Sparkles } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { EVENT_CONFIG } from '../../config/event'

export function Footer() {
  return (
    <footer className="py-16 bg-neutral-950 text-white text-center border-t border-neutral-900">
      <div className="section-container">
        <ScrollReveal>
          {/* Sparkles */}
          <div className="flex justify-center items-center gap-2 text-accent-400 mb-4">
            <Sparkles size={16} />
            <Sparkles size={20} />
            <Sparkles size={16} />
          </div>

          {/* Farewell message */}
          <p className="font-script text-4xl sm:text-5xl text-white mb-2">
            Esperamos você!
          </p>

          <p className="text-neutral-400 font-[Poppins] text-sm sm:text-base">
            Com muito carinho, <span className="text-white font-medium">{EVENT_CONFIG.parents}</span>
          </p>

          {/* Divider */}
          <div className="mx-auto my-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

          {/* Footer credit */}
          <p className="text-neutral-500 font-[Poppins] text-xs flex items-center justify-center gap-1.5">
            <span>Feito com</span>
            <Heart size={14} className="text-primary-500 fill-primary-500 shrink-0" />
            <span>para os 15 anos de</span>
            <span className="text-neutral-300 font-medium">{EVENT_CONFIG.name}</span>
          </p>
        </ScrollReveal>
      </div>
    </footer>
  )
}

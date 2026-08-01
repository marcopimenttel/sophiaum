import { Heart, Sparkles } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'
import { EVENT_CONFIG } from '../../config/event'

export function Footer() {
  return (
    <footer className="pt-14 sm:pt-16 pb-10 sm:pb-12 bg-neutral-950 text-white text-center border-t border-neutral-900">
      <div className="section-container flex flex-col items-center">
        <ScrollReveal className="w-full flex flex-col items-center">
          <div className="flex justify-center items-center gap-2 text-accent-400 mb-5">
            <Sparkles size={16} />
            <Sparkles size={20} />
            <Sparkles size={16} />
          </div>

          <p className="font-script text-3xl sm:text-4xl md:text-5xl text-white mb-3 px-4">
            Esperamos você!
          </p>

          <p className="text-neutral-400 font-[Poppins] text-sm sm:text-base px-4">
            Com muito carinho,{' '}
            <span className="text-white font-medium">{EVENT_CONFIG.parents}</span>
          </p>

          <div className="mx-auto my-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

          <p className="text-neutral-500 font-[Poppins] text-xs flex flex-wrap items-center justify-center gap-1.5 px-4">
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

import { ScrollReveal } from '../ui/ScrollReveal'
import { EVENT_CONFIG } from '../../config/event'
import { Sparkles, Crown } from 'lucide-react'

export function DressCode() {
  return (
    <section id="dress-code" className="page-section bg-neutral-950 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="section-container flex flex-col items-center text-center relative z-10">
        <ScrollReveal className="w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-accent-500/15 border border-accent-500/30 text-accent-300 text-[11px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] font-[Poppins] font-bold mb-6 sm:mb-8 shadow-xl">
            <Sparkles size={16} className="shrink-0" />
            <span>Traje Recomendado</span>
          </div>

          <h3 className="text-neutral-400 font-[Poppins] text-[11px] sm:text-sm uppercase tracking-[0.3em] mb-6 sm:mb-8">
            Dress Code
          </h3>

          <div className="inline-flex items-center justify-center gap-4 sm:gap-5 px-8 py-6 sm:px-14 sm:py-8 rounded-2xl sm:rounded-3xl glass-dark border border-white/20 shadow-2xl backdrop-blur-2xl max-w-lg mx-auto w-full sm:w-auto">
            <Crown size={32} className="text-accent-400 shrink-0" />
            <span className="font-display text-2xl sm:text-4xl md:text-5xl text-white font-semibold tracking-wide italic">
              {EVENT_CONFIG.dressCode}
            </span>
          </div>

          <p className="text-neutral-300 font-[Poppins] text-sm sm:text-base md:text-lg mt-6 sm:mt-8 tracking-wide max-w-md mx-auto leading-relaxed px-4">
            Venha elegante para celebrar este momento inesquecível conosco ✨
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

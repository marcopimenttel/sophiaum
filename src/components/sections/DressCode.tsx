import { ScrollReveal } from '../ui/ScrollReveal'
import { EVENT_CONFIG } from '../../config/event'
import { Sparkles, Crown } from 'lucide-react'

export function DressCode() {
  return (
    <section id="dress-code" className="py-24 sm:py-32 md:py-40 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="section-container flex flex-col items-center text-center relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-accent-500/15 border border-accent-500/30 text-accent-300 text-xs sm:text-sm uppercase tracking-[0.25em] font-[Poppins] font-bold mb-8 shadow-xl">
            <Sparkles size={18} />
            <span>Traje Recomendado</span>
          </div>

          <h3 className="text-neutral-400 font-[Poppins] text-xs sm:text-sm uppercase tracking-[0.35em] mb-8">
            Dress Code
          </h3>

          <div className="inline-flex items-center justify-center gap-5 px-10 py-7 sm:px-16 sm:py-9 rounded-3xl glass-dark border border-white/20 shadow-2xl backdrop-blur-2xl max-w-lg mx-auto">
            <Crown size={36} className="text-accent-400 shrink-0" />
            <span className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-semibold tracking-wide italic">
              {EVENT_CONFIG.dressCode}
            </span>
          </div>

          <p className="text-neutral-300 font-[Poppins] text-base sm:text-lg md:text-xl mt-8 tracking-wide max-w-lg mx-auto leading-relaxed">
            Venha elegante para celebrar este momento inesquecível conosco ✨
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

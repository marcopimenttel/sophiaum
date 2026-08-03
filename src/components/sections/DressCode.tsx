import { ScrollReveal } from '../ui/ScrollReveal'
import { EVENT_CONFIG } from '../../config/event'
import { Sparkles, Crown } from 'lucide-react'

export function DressCode() {
  return (
    <section id="dress-code" className="page-section bg-neutral-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-primary-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center text-center">
        <ScrollReveal className="w-full max-w-md flex flex-col items-center gap-6 sm:gap-7">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent-500/10 border border-accent-500/25 text-accent-300 text-[11px] uppercase tracking-[0.2em] font-[Poppins] font-semibold">
            <Sparkles size={14} className="shrink-0" />
            <span>Traje Recomendado</span>
          </div>

          <h3 className="text-neutral-400 font-[Poppins] text-xs uppercase tracking-[0.28em]">
            Dress Code
          </h3>

          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 px-7 py-6 sm:px-12 sm:py-8 rounded-2xl glass-dark border border-white/15 w-full">
            <Crown size={28} className="text-accent-400 shrink-0" />
            <span className="font-display text-2xl sm:text-4xl text-white font-semibold tracking-wide italic">
              {EVENT_CONFIG.dressCode}
            </span>
          </div>

          <p className="text-neutral-300 font-[Poppins] text-sm sm:text-base leading-relaxed max-w-sm">
            Venha elegante para celebrar este momento inesquecível conosco
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { SectionTitle } from '../ui/SectionTitle'
import { ScrollReveal } from '../ui/ScrollReveal'
import { Shirt, Footprints, Sparkles, Gem, ShoppingBag, BookOpen, Palette, AlertCircle } from 'lucide-react'
import type { ComponentType } from 'react'

interface GiftItem {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
  details?: string
  stores?: string
  note?: string
}

const GIFTS_WITH_LUCIDE: GiftItem[] = [
  {
    icon: Shirt,
    title: 'Roupas',
    details: 'Tam. PP | 34 | 16',
    stores: 'Youcom, Riachuelo e etc',
  },
  {
    icon: Footprints,
    title: 'Sapatos',
    details: 'Tam. 35/36',
    stores: 'Ana Capri, Schutz, Via Uno e etc',
  },
  {
    icon: Sparkles,
    title: 'Perfumes',
    details: 'Fragrâncias doces',
    stores: 'O Boticário, Top Internacional e etc',
  },
  {
    icon: Gem,
    title: 'Joias',
    details: 'Ouro ou prata 925 banhada a ouro',
    stores: 'Vivara e joalherias especializadas',
    note: 'Alergia a bijuterias',
  },
  {
    icon: ShoppingBag,
    title: 'Bolsas',
    details: 'Modelos variados',
    stores: 'Lojas especializadas',
  },
  {
    icon: BookOpen,
    title: 'Kindle',
    details: 'Leitor digital',
    stores: 'Amazon',
  },
  {
    icon: Palette,
    title: 'Maquiagem',
    details: 'Produtos de beleza',
    stores: 'Quem Disse, Berenice?',
  },
]

export function GiftSuggestions() {
  return (
    <section id="gifts" className="py-24 sm:py-32 md:py-40 bg-white">
      <div className="section-container flex flex-col items-center">
        <SectionTitle subtitle="Caso queira presentear a aniversariante">
          Sugestões de Presente
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full max-w-6xl">
          {GIFTS_WITH_LUCIDE.map((gift, index) => {
            const Icon = gift.icon
            return (
              <ScrollReveal key={gift.title} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full p-8 rounded-3xl bg-neutral-50/90 border border-neutral-200/80 hover:border-primary-400 hover:shadow-2xl hover:shadow-primary-600/15 transition-all duration-300 flex flex-col justify-between items-center text-center group"
                >
                  <div className="flex flex-col items-center w-full">
                    <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 border border-primary-200/60 flex items-center justify-center mb-6 group-hover:from-primary-600 group-hover:to-primary-700 transition-colors duration-300 shadow-sm shrink-0">
                      <Icon size={30} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="font-[Poppins] font-bold text-xl text-neutral-900 mb-2">
                      {gift.title}
                    </h3>

                    {gift.details && (
                      <p className="text-sm text-neutral-500 font-[Poppins] leading-relaxed">
                        {gift.details}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-neutral-200/60 w-full">
                    {gift.stores && (
                      <p className="text-xs sm:text-sm text-primary-700 font-[Poppins] font-semibold">
                        {gift.stores}
                      </p>
                    )}
                    {gift.note && (
                      <p className="text-xs text-amber-700 font-[Poppins] font-medium flex items-center justify-center gap-1.5 mt-2.5 bg-amber-50 py-2 px-3 rounded-xl border border-amber-200/70">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{gift.note}</span>
                      </p>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

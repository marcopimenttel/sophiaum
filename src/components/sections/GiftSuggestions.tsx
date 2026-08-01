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
    <section id="gifts" className="page-section bg-white">
      <div className="section-container">
        <SectionTitle subtitle="Caso queira presentear a aniversariante">
          Sugestões de Presente
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GIFTS_WITH_LUCIDE.map((gift, index) => {
            const Icon = gift.icon
            return (
              <ScrollReveal key={gift.title} delay={index * 0.04} className="h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full min-h-[220px] p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 flex items-center justify-center mb-4 group-hover:from-primary-600 group-hover:to-primary-700 transition-colors duration-300">
                    <Icon size={22} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="font-[Poppins] font-semibold text-base sm:text-lg text-neutral-900 mb-1.5">
                    {gift.title}
                  </h3>

                  {gift.details && (
                    <p className="text-sm text-neutral-500 font-[Poppins] leading-relaxed flex-1">
                      {gift.details}
                    </p>
                  )}

                  <div className="mt-4 pt-4 border-t border-neutral-200 w-full space-y-2">
                    {gift.stores && (
                      <p className="text-xs text-primary-700 font-[Poppins] font-semibold leading-snug">
                        {gift.stores}
                      </p>
                    )}
                    {gift.note && (
                      <p className="text-xs text-amber-800 font-[Poppins] font-medium inline-flex items-center justify-center gap-1.5 bg-amber-50 py-1.5 px-2.5 rounded-lg border border-amber-200">
                        <AlertCircle size={12} className="shrink-0" />
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

import { motion } from 'framer-motion'
import { SectionTitle } from '../ui/SectionTitle'
import { ScrollReveal } from '../ui/ScrollReveal'
import { Shirt, Footprints, Sparkles, Gem, ShoppingBag, BookOpen, Palette, AlertCircle } from 'lucide-react'
import type { ComponentType } from 'react'

interface BrandLogo {
  src: string
  alt: string
  /** Logos com fundo escuro no arquivo */
  darkBg?: boolean
}

interface GiftItem {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
  details?: string
  brands: BrandLogo[]
  brandFallback?: string
  note?: string
}

const GIFTS: GiftItem[] = [
  {
    icon: Shirt,
    title: 'Roupas',
    details: 'Tam. PP | 34 | 16',
    brands: [
      { src: '/images/brands/youcom.png', alt: 'Youcom' },
      { src: '/images/brands/santa-lolla.png', alt: 'Santa Lolla' },
    ],
  },
  {
    icon: Footprints,
    title: 'Sapatos',
    details: 'Tam. 35/36',
    brands: [
      { src: '/images/brands/ana-capri.png', alt: 'Ana Capri', darkBg: true },
      { src: '/images/brands/vizzano.png', alt: 'Vizzano' },
    ],
  },
  {
    icon: Sparkles,
    title: 'Perfumes',
    details: 'Fragrâncias doces',
    brands: [
      { src: '/images/brands/o-boticario.svg', alt: 'O Boticário' },
      { src: '/images/brands/top-internacional.png', alt: 'Top Internacional' },
    ],
  },
  {
    icon: Gem,
    title: 'Joias',
    details: 'Ouro ou prata 925 banhada a ouro',
    brands: [
      { src: '/images/brands/vivara.png', alt: 'Vivara' },
      { src: '/images/brands/morana.webp', alt: 'Morana' },
    ],
    note: 'Alergia a bijuterias',
  },
  {
    icon: ShoppingBag,
    title: 'Bolsas',
    details: 'Modelos variados',
    brands: [{ src: '/images/brands/santa-lolla.png', alt: 'Santa Lolla' }],
  },
  {
    icon: BookOpen,
    title: 'Kindle',
    details: 'Leitor digital',
    brands: [],
    brandFallback: 'Amazon',
  },
  {
    icon: Palette,
    title: 'Maquiagem',
    details: 'Produtos de beleza',
    brands: [
      { src: '/images/brands/mac.png', alt: 'MAC', darkBg: true },
      { src: '/images/brands/quem-disse-berenice.png', alt: 'quem disse, berenice?', darkBg: true },
    ],
  },
]

function BrandMark({ brand }: { brand: BrandLogo }) {
  return (
    <div
      className={`
        h-11 min-w-[92px] max-w-[120px] px-3 rounded-xl
        flex items-center justify-center
        ${brand.darkBg ? 'bg-neutral-950' : 'bg-white border border-neutral-200/80 shadow-sm'}
      `}
      title={brand.alt}
    >
      <img
        src={brand.src}
        alt={brand.alt}
        loading="lazy"
        className="max-h-6 w-auto max-w-full object-contain"
      />
    </div>
  )
}

export function GiftSuggestions() {
  return (
    <section id="gifts" className="page-section bg-neutral-50/80">
      <div className="section-container">
        <SectionTitle subtitle="Caso queira presentear a aniversariante">
          Sugestões de Presente
        </SectionTitle>

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {GIFTS.map((gift, index) => {
            const Icon = gift.icon
            return (
              <ScrollReveal
                key={gift.title}
                delay={index * 0.04}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[320px]"
              >
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="h-full min-h-[280px] px-6 pt-8 pb-6 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_8px_30px_rgba(28,25,23,0.04)] hover:border-primary-200 hover:shadow-[0_12px_36px_rgba(220,38,38,0.08)] transition-colors duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100/80 flex items-center justify-center mb-5 shadow-sm">
                    <Icon size={24} className="text-primary-600" />
                  </div>

                  <h3 className="font-[Poppins] font-semibold text-lg text-neutral-900 mb-2">
                    {gift.title}
                  </h3>

                  {gift.details && (
                    <p className="text-sm text-neutral-500 font-[Poppins] leading-relaxed px-1 mb-auto">
                      {gift.details}
                    </p>
                  )}

                  <div className="mt-6 pt-5 border-t border-neutral-100 w-full flex flex-col items-center gap-3">
                    <p className="text-[10px] font-[Poppins] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Onde encontrar
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      {gift.brands.map((brand) => (
                        <BrandMark key={brand.alt} brand={brand} />
                      ))}
                      {gift.brandFallback && (
                        <span className="h-11 min-w-[92px] px-4 rounded-xl border border-neutral-200 bg-white shadow-sm inline-flex items-center justify-center text-xs font-[Poppins] font-semibold tracking-wide text-neutral-700">
                          {gift.brandFallback}
                        </span>
                      )}
                    </div>

                    {gift.note && (
                      <p className="mt-1 text-xs text-amber-800 font-[Poppins] font-medium inline-flex items-center justify-center gap-1.5 bg-amber-50 py-2 px-3 rounded-xl border border-amber-200/80">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{gift.note}</span>
                      </p>
                    )}
                  </div>
                </motion.article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

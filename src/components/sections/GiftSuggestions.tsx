import { motion } from 'framer-motion'
import { SectionTitle } from '../ui/SectionTitle'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AlertCircle } from 'lucide-react'

interface BrandLogo {
  src: string
  alt: string
}

interface GiftItem {
  title: string
  details?: string
  brands: BrandLogo[]
  brandFallback?: string
  note?: string
}

const GIFTS: GiftItem[] = [
  {
    title: 'Roupas',
    details: 'Tam. PP | 34 | 16',
    brands: [
      { src: '/images/brands/youcom.png', alt: 'Youcom' },
      { src: '/images/brands/santa-lolla.png', alt: 'Santa Lolla' },
    ],
  },
  {
    title: 'Sapatos',
    details: 'Tam. 35/36',
    brands: [
      { src: '/images/brands/ana-capri.png', alt: 'Ana Capri' },
      { src: '/images/brands/vizzano.png', alt: 'Vizzano' },
    ],
  },
  {
    title: 'Perfumes',
    details: 'Fragrâncias doces',
    brands: [
      { src: '/images/brands/o-boticario.svg', alt: 'O Boticário' },
      { src: '/images/brands/top-internacional.png', alt: 'Top Internacional' },
    ],
  },
  {
    title: 'Joias',
    details: 'Ouro ou prata 925 banhada a ouro',
    brands: [
      { src: '/images/brands/vivara.png', alt: 'Vivara' },
      { src: '/images/brands/morana.webp', alt: 'Morana' },
    ],
    note: 'Alergia a bijuterias',
  },
  {
    title: 'Bolsas',
    details: 'Modelos variados',
    brands: [{ src: '/images/brands/santa-lolla.png', alt: 'Santa Lolla' }],
  },
  {
    title: 'Kindle',
    details: 'Leitor digital',
    brands: [],
    brandFallback: 'Amazon',
  },
  {
    title: 'Maquiagem',
    details: 'Produtos de beleza',
    brands: [
      { src: '/images/brands/mac.png', alt: 'MAC' },
      { src: '/images/brands/quem-disse-berenice.png', alt: 'quem disse, berenice?' },
    ],
  },
]

function BrandMark({ brand }: { brand: BrandLogo }) {
  return (
    <div
      className="w-full h-14 px-4 flex items-center justify-center"
      title={brand.alt}
    >
      <img
        src={brand.src}
        alt={brand.alt}
        loading="lazy"
        className="h-10 w-[160px] object-contain"
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
          {GIFTS.map((gift, index) => (
            <ScrollReveal
              key={gift.title}
              delay={index * 0.04}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[320px]"
            >
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="h-full min-h-[240px] px-6 pt-8 pb-7 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_8px_30px_rgba(28,25,23,0.04)] hover:border-primary-200 hover:shadow-[0_12px_36px_rgba(220,38,38,0.08)] transition-colors duration-300 flex flex-col items-center text-center"
              >
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

                  <div className="w-full flex flex-col items-center gap-2">
                    {gift.brands.map((brand) => (
                      <BrandMark key={brand.alt} brand={brand} />
                    ))}
                    {gift.brandFallback && (
                      <div className="w-full h-14 px-4 flex items-center justify-center">
                        <span className="text-sm font-[Poppins] font-semibold tracking-wide text-neutral-700">
                          {gift.brandFallback}
                        </span>
                      </div>
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
          ))}
        </div>
      </div>
    </section>
  )
}

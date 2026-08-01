import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { GALLERY_IMAGES } from '../../config/event'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null
    )
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : null
    )
  }, [])

  return (
    <section id="gallery" className="page-section bg-white overflow-hidden">
      <div className="section-container section-container-wide">
        <SectionTitle subtitle="Momentos especiais inesquecíveis">
          Galeria de Fotos
        </SectionTitle>

        <div className="mt-2 sm:mt-4">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 3500, disableOnInteraction: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 140,
              modifier: 2.2,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="!pb-12 sm:!pb-14 !pt-2"
          >
            {GALLERY_IMAGES.map((src, index) => (
              <SwiperSlide
                key={src}
                className="!w-[240px] sm:!w-[300px] md:!w-[360px]"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer relative group rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/15 border border-neutral-200/60 bg-neutral-100"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={src}
                    alt={`Foto ${index + 1}`}
                    loading="lazy"
                    className="w-full h-[320px] sm:h-[420px] md:h-[480px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay indicator */}
                  <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-800 shadow-lg">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Próxima"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={GALLERY_IMAGES[lightboxIndex]}
              alt={`Foto ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs font-[Poppins] font-medium tracking-widest">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

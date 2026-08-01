import { Calendar, Clock, MapPin, MessageCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionTitle } from '../ui/SectionTitle'
import { EVENT_CONFIG } from '../../config/event'

export function EventDetails() {
  const eventDate = new Date(EVENT_CONFIG.date)

  const formattedDate = eventDate.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedTime = eventDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const whatsappUrl = EVENT_CONFIG.whatsappNumber
    ? `https://wa.me/${EVENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(EVENT_CONFIG.whatsappMessage)}`
    : '#'

  return (
    <section id="event-details" className="py-24 sm:py-32 md:py-40 bg-neutral-50/70 border-y border-neutral-100">
      <div className="section-container flex flex-col items-center">
        <SectionTitle subtitle="Anote em sua agenda para não esquecer">
          Detalhes do Evento
        </SectionTitle>

        {/* 3-Column Grid for Desktop / Stacked for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 w-full max-w-5xl mb-16">
          <ScrollReveal delay={0}>
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xl shadow-neutral-200/50 hover:border-primary-400 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center justify-between">
              <div className="w-16 h-16 rounded-2xl bg-primary-100/90 border border-primary-200 flex items-center justify-center mb-6 shrink-0 shadow-sm">
                <Calendar size={32} className="text-primary-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xs font-bold text-neutral-400 font-[Poppins] uppercase tracking-widest mb-1.5">Data</p>
                <p className="text-neutral-900 font-[Poppins] font-bold text-xl sm:text-2xl">{formattedDate}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xl shadow-neutral-200/50 hover:border-primary-400 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center justify-between">
              <div className="w-16 h-16 rounded-2xl bg-primary-100/90 border border-primary-200 flex items-center justify-center mb-6 shrink-0 shadow-sm">
                <Clock size={32} className="text-primary-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xs font-bold text-neutral-400 font-[Poppins] uppercase tracking-widest mb-1.5">Horário</p>
                <p className="text-neutral-900 font-[Poppins] font-bold text-xl sm:text-2xl">{formattedTime}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-xl shadow-neutral-200/50 hover:border-primary-400 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center justify-between">
              <div className="w-16 h-16 rounded-2xl bg-primary-100/90 border border-primary-200 flex items-center justify-center mb-6 shrink-0 shadow-sm">
                <MapPin size={32} className="text-primary-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xs font-bold text-neutral-400 font-[Poppins] uppercase tracking-widest mb-1.5">Local</p>
                <p className="text-neutral-900 font-[Poppins] font-bold text-xl sm:text-2xl">{EVENT_CONFIG.venue}</p>
                <p className="text-neutral-500 font-[Poppins] text-sm mt-1.5">{EVENT_CONFIG.address}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Action Buttons Box */}
        <ScrollReveal delay={0.3} className="w-full max-w-2xl">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-2xl text-center">
            <h4 className="font-display text-xl sm:text-2xl text-neutral-800 font-semibold mb-6">
              Como Chegar & Confirmar
            </h4>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <Button
                variant="primary"
                size="lg"
                icon={<MapPin size={22} />}
                onClick={() => window.open(EVENT_CONFIG.googleMapsUrl, '_blank')}
                className="w-full sm:w-1/2"
              >
                Ver no Mapa
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle size={22} />}
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="w-full sm:w-1/2"
                disabled={!EVENT_CONFIG.whatsappNumber}
              >
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

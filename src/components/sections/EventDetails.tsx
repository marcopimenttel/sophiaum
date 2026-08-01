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

  const cards = [
    {
      icon: Calendar,
      label: 'Data',
      primary: formattedDate,
    },
    {
      icon: Clock,
      label: 'Horário',
      primary: formattedTime,
    },
    {
      icon: MapPin,
      label: 'Local',
      primary: EVENT_CONFIG.venue,
      secondary: EVENT_CONFIG.address,
    },
  ]

  return (
    <section id="event-details" className="page-section bg-neutral-50/70 border-y border-neutral-100">
      <div className="section-container flex flex-col items-center">
        <SectionTitle subtitle="Anote em sua agenda para não esquecer">
          Detalhes do Evento
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-5xl">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <ScrollReveal key={card.label} delay={index * 0.1} className="h-full">
                <div className="h-full min-h-[200px] sm:min-h-[240px] p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/80 shadow-lg shadow-neutral-200/40 hover:border-primary-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-100/90 border border-primary-200 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon size={28} className="text-primary-600" />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[11px] sm:text-xs font-bold text-neutral-400 font-[Poppins] uppercase tracking-widest mb-2">
                      {card.label}
                    </p>
                    <p className="text-neutral-900 font-[Poppins] font-bold text-lg sm:text-xl md:text-2xl leading-snug">
                      {card.primary}
                    </p>
                    {card.secondary && (
                      <p className="text-neutral-500 font-[Poppins] text-xs sm:text-sm mt-2 leading-relaxed max-w-[16rem]">
                        {card.secondary}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.3} className="w-full max-w-2xl mt-10 sm:mt-12 md:mt-14">
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-xl text-center">
            <h4 className="font-display text-lg sm:text-xl md:text-2xl text-neutral-800 font-semibold mb-6 sm:mb-8">
              Como Chegar & Confirmar
            </h4>
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<MapPin size={20} />}
                onClick={() => window.open(EVENT_CONFIG.googleMapsUrl, '_blank')}
                className="w-full sm:flex-1"
              >
                Ver no Mapa
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle size={20} />}
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="w-full sm:flex-1"
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

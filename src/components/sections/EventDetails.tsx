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
    { icon: Calendar, label: 'Data', primary: formattedDate },
    { icon: Clock, label: 'Horário', primary: formattedTime },
    {
      icon: MapPin,
      label: 'Local',
      primary: EVENT_CONFIG.venue,
      secondary: EVENT_CONFIG.address,
    },
  ]

  return (
    <section id="event-details" className="page-section bg-neutral-50 border-y border-neutral-100">
      <div className="section-container">
        <SectionTitle subtitle="Anote em sua agenda para não esquecer">
          Detalhes do Evento
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <ScrollReveal key={card.label} delay={index * 0.08} className="h-full">
                <div className="surface-card h-full p-6 sm:p-7 flex flex-col items-center text-center justify-center gap-3 min-h-[180px] sm:min-h-[200px]">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <Icon size={22} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-neutral-400 font-[Poppins] uppercase tracking-[0.16em] mb-1.5">
                      {card.label}
                    </p>
                    <p className="text-neutral-900 font-[Poppins] font-semibold text-lg sm:text-xl leading-snug">
                      {card.primary}
                    </p>
                    {card.secondary && (
                      <p className="text-neutral-500 font-[Poppins] text-sm mt-1.5 leading-relaxed">
                        {card.secondary}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.25} className="w-full mt-8 sm:mt-10">
          <div className="surface-card p-6 sm:p-8 text-center max-w-xl mx-auto">
            <h4 className="font-display text-lg sm:text-xl text-neutral-800 font-semibold mb-5">
              Como Chegar & Confirmar
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                icon={<MapPin size={18} />}
                onClick={() => window.open(EVENT_CONFIG.googleMapsUrl, '_blank')}
                className="w-full sm:flex-1"
              >
                Ver no Mapa
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle size={18} />}
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="w-full sm:flex-1"
                disabled={!EVENT_CONFIG.whatsappNumber}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

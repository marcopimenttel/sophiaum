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
    timeZone: 'America/Manaus',
  })

  const formattedTime = eventDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Manaus',
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
      <div className="section-container flex flex-col items-center">
        <SectionTitle
          subtitle="Anote em sua agenda para não esquecer"
          className="mb-10 sm:mb-12"
        >
          Detalhes do Evento
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full max-w-4xl">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <ScrollReveal key={card.label} delay={index * 0.08} className="h-full">
                <div className="surface-card h-full px-6 py-8 sm:px-7 sm:py-9 flex flex-col items-center text-center justify-center gap-4 min-h-[190px]">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                    <Icon size={22} className="text-primary-600" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold text-neutral-400 font-[Poppins] uppercase tracking-[0.16em]">
                      {card.label}
                    </p>
                    <p className="text-neutral-900 font-[Poppins] font-semibold text-lg sm:text-xl leading-snug">
                      {card.primary}
                    </p>
                    {card.secondary && (
                      <p className="text-neutral-500 font-[Poppins] text-sm leading-relaxed">
                        {card.secondary}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.25} className="w-full max-w-md mt-12 sm:mt-14">
          <div className="flex flex-col items-center text-center gap-6">
            <h4 className="font-display text-lg sm:text-xl text-neutral-800 font-semibold">
              Como Chegar & Confirmar
            </h4>

            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4 w-full">
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

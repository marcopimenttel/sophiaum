import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Toast } from '../ui/Toast'
import { useRsvps } from '../../hooks/useRsvps'
import { maskPhone, isValidPhone } from '../../utils/masks'
import { EVENT_CONFIG, HERO_IMAGES } from '../../config/event'

function buildRsvpWhatsAppUrl(nome: string, contato: string) {
  const message = [
    `Olá! Confirmo minha presença na festa de 15 anos da ${EVENT_CONFIG.name}.`,
    '',
    `Nome: ${nome}`,
    `WhatsApp: ${contato}`,
  ].join('\n')

  return `https://wa.me/${EVENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function RsvpForm() {
  const { submitRsvp, loading } = useRsvps()

  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  })
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!nome.trim()) newErrors.nome = 'Informe seu nome completo'
    if (!whatsapp.trim()) newErrors.whatsapp = 'Informe seu número de WhatsApp'
    else if (!isValidPhone(whatsapp)) newErrors.whatsapp = 'Telefone inválido (mínimo 10 dígitos)'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    if (!EVENT_CONFIG.whatsappNumber) {
      setToast({ message: 'WhatsApp de confirmação não configurado.', type: 'error', visible: true })
      return
    }

    const nomeTrim = nome.trim()
    const whatsappTrim = whatsapp.trim()

    // Salva no painel admin (se Supabase estiver ok) e abre WhatsApp
    await submitRsvp({
      nome: nomeTrim,
      whatsapp: whatsappTrim,
      tem_acompanhante: false,
      quantidade_acompanhantes: 0,
    })

    window.open(buildRsvpWhatsAppUrl(nomeTrim, whatsappTrim), '_blank', 'noopener,noreferrer')

    setSubmitted(true)
    setToast({
      message: 'Quase lá! Envie a mensagem no WhatsApp para confirmar.',
      type: 'success',
      visible: true,
    })
  }

  return (
    <section id="rsvp" className="relative page-section overflow-hidden text-white bg-gradient-to-b from-secondary-800 via-secondary-700 to-primary-800">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={HERO_IMAGES[2]}
          alt=""
          className="w-full h-full object-cover blur-md opacity-20 scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/75 via-secondary-800/80 to-primary-900/85" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-secondary-500/25 blur-[120px]" />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        <SectionTitle
          light
          subtitle="Por favor, confirme sua presença com antecedência"
          className="mb-10 sm:mb-12"
        >
          Confirmação de Presença
        </SectionTitle>

        <div className="w-full max-w-md sm:max-w-lg mx-auto rounded-3xl border border-white/20 bg-secondary-950/35 backdrop-blur-md px-5 py-8 sm:px-8 sm:py-10 shadow-2xl shadow-secondary-950/30">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-5"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={36} className="text-emerald-400" />
                </div>
                <h3 className="font-script text-4xl sm:text-5xl text-white">Presença Confirmada!</h3>
                <p className="text-neutral-300 font-[Poppins] text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  Abra o WhatsApp e envie a mensagem para finalizar sua confirmação. Estamos ansiosos para celebrar com você!
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setSubmitted(false)
                      setNome('')
                      setWhatsapp('')
                    }}
                    className="text-white border-white/30 bg-transparent hover:bg-white/10"
                  >
                    Confirmar para outra pessoa
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-7 sm:gap-8"
              >
                <Input
                  label="Seu Nome Completo"
                  placeholder="Digite seu nome e sobrenome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  error={errors.nome}
                  variant="dark"
                  required
                />

                <Input
                  label="Seu WhatsApp para Contato"
                  placeholder="(XX) XXXXX-XXXX"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                  error={errors.whatsapp}
                  type="tel"
                  variant="dark"
                  required
                />

                <div className="pt-2 sm:pt-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    icon={<Send size={18} />}
                    className="w-full min-h-[54px]"
                  >
                    Confirmar Presença
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </section>
  )
}

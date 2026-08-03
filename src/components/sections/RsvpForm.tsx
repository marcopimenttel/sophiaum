import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Toast } from '../ui/Toast'
import { useRsvps } from '../../hooks/useRsvps'
import { maskPhone, isValidPhone } from '../../utils/masks'
import { HERO_IMAGES } from '../../config/event'

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

    const success = await submitRsvp({
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      tem_acompanhante: false,
      quantidade_acompanhantes: 0,
    })

    if (success) {
      setSubmitted(true)
      setToast({ message: 'Presença confirmada! Nos vemos lá.', type: 'success', visible: true })
    } else {
      setToast({ message: 'Erro ao enviar confirmação. Tente novamente.', type: 'error', visible: true })
    }
  }

  return (
    <section id="rsvp" className="relative page-section overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={HERO_IMAGES[2]}
          alt=""
          className="w-full h-full object-cover blur-md opacity-35 scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/90 to-neutral-950" />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        <SectionTitle
          light
          subtitle="Por favor, confirme sua presença com antecedência"
          className="mb-10 sm:mb-12"
        >
          Confirmação de Presença
        </SectionTitle>

        <div className="w-full max-w-md sm:max-w-lg mx-auto">
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
                  Sua confirmação foi salva com sucesso. Estamos ansiosos para celebrar este momento especial com você!
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

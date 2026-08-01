import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, CheckCircle2, Send } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { ScrollReveal } from '../ui/ScrollReveal'
import { Input, TextArea } from '../ui/Input'
import { Button } from '../ui/Button'
import { Toast } from '../ui/Toast'
import { useRsvps } from '../../hooks/useRsvps'
import { maskPhone, isValidPhone } from '../../utils/masks'
import { HERO_IMAGES } from '../../config/event'

export function RsvpForm() {
  const { submitRsvp, loading } = useRsvps()

  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [temAcompanhante, setTemAcompanhante] = useState(false)
  const [qtdAcompanhantes, setQtdAcompanhantes] = useState(1)
  const [nomesAcompanhantes, setNomesAcompanhantes] = useState('')

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
      tem_acompanhante: temAcompanhante,
      quantidade_acompanhantes: temAcompanhante ? qtdAcompanhantes : 0,
      nomes_acompanhantes: temAcompanhante ? nomesAcompanhantes.trim() : undefined,
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

      <div className="section-container relative z-10">
        <SectionTitle light subtitle="Por favor, confirme sua presença com antecedência">
          Confirmação de Presença
        </SectionTitle>

        <div className="w-full max-w-lg mx-auto p-5 sm:p-8 rounded-2xl glass-dark border border-white/15 text-left">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={36} className="text-emerald-400" />
                </div>
                <h3 className="font-script text-4xl sm:text-5xl text-white">Presença Confirmada!</h3>
                <p className="text-neutral-300 font-[Poppins] text-sm sm:text-base leading-relaxed">
                  Sua confirmação foi salva com sucesso. Estamos ansiosos para celebrar este momento especial com você!
                </p>
                <div className="pt-3">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setSubmitted(false)
                      setNome('')
                      setWhatsapp('')
                      setTemAcompanhante(false)
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
                className="space-y-5"
              >
                <ScrollReveal>
                  <Input
                    label="Seu Nome Completo"
                    placeholder="Digite seu nome e sobrenome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    error={errors.nome}
                    variant="dark"
                    required
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.05}>
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
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/25 flex items-center justify-center shrink-0">
                        <UserPlus size={18} className="text-primary-400" />
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-semibold text-white font-[Poppins]">
                          Vai levar acompanhante?
                        </p>
                        <p className="text-xs text-neutral-400 font-[Poppins]">
                          Ative se for acompanhado(a)
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setTemAcompanhante(!temAcompanhante)}
                      className={`
                        relative w-12 h-7 rounded-full transition-colors duration-300 cursor-pointer shrink-0
                        ${temAcompanhante ? 'bg-primary-600' : 'bg-neutral-700'}
                      `}
                      aria-label="Alternar acompanhante"
                      aria-pressed={temAcompanhante}
                    >
                      <span
                        className={`
                          absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-transform duration-300 shadow
                          ${temAcompanhante ? 'translate-x-5' : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>
                </ScrollReveal>

                <AnimatePresence>
                  {temAcompanhante && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-5"
                    >
                      <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 text-left">
                        <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-300 mb-3 font-[Poppins]">
                          Quantidade de Acompanhantes
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setQtdAcompanhantes(Math.max(1, qtdAcompanhantes - 1))}
                            className="w-11 h-11 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors text-xl font-bold cursor-pointer flex items-center justify-center border border-neutral-600"
                          >
                            −
                          </button>
                          <span className="text-white font-[Poppins] font-bold text-2xl w-8 text-center tabular-nums">
                            {qtdAcompanhantes}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQtdAcompanhantes(Math.min(10, qtdAcompanhantes + 1))}
                            className="w-11 h-11 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors text-xl font-bold cursor-pointer flex items-center justify-center border border-neutral-600"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <TextArea
                        label="Nomes dos acompanhantes (opcional)"
                        placeholder="Ex: João Silva e Maria Santos"
                        value={nomesAcompanhantes}
                        onChange={(e) => setNomesAcompanhantes(e.target.value)}
                        variant="dark"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <ScrollReveal delay={0.15}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    icon={<Send size={18} />}
                    className="w-full"
                  >
                    Confirmar Presença
                  </Button>
                </ScrollReveal>
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

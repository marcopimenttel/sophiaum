import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Toast } from '../ui/Toast'

export function LoginForm() {
  const { signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    try {
      await signIn(email, password)
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
      setShowToast(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 mb-4">
            <Lock size={28} className="text-primary-600" />
          </div>
          <h1 className="font-script text-4xl text-neutral-800">Área Admin</h1>
          <p className="text-neutral-500 font-[Poppins] text-sm mt-2">
            Acesse o painel de confirmados
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={<LogIn size={20} />}
            className="w-full"
          >
            Entrar
          </Button>
        </form>

        {/* Back link */}
        <p className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-primary-500 hover:text-primary-700 font-[Poppins] transition-colors"
          >
            ← Voltar ao convite
          </a>
        </p>
      </motion.div>

      <Toast
        message={error}
        type="error"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

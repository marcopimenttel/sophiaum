import { LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

export function AdminHeader() {
  const { signOut, user } = useAuth()

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-script text-2xl text-neutral-800">
            Painel Admin
          </h1>
          <p className="text-xs text-neutral-500 font-[Poppins]">
            15 Anos — Bárbara Sophia
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-[Poppins] hidden sm:block">
            {user?.email}
          </span>
          <Button
            variant="ghost"
            size="sm"
            icon={<LogOut size={16} />}
            onClick={signOut}
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}

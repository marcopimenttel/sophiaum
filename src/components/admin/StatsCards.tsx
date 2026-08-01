import { Users, UserCheck, UserPlus } from 'lucide-react'
import type { Rsvp } from '../../types/rsvp.types'

interface StatsCardsProps {
  rsvps: Rsvp[]
}

export function StatsCards({ rsvps }: StatsCardsProps) {
  const totalTitulares = rsvps.length
  const totalAcompanhantes = rsvps.reduce((sum, r) => sum + (r.quantidade_acompanhantes || 0), 0)
  const totalPessoas = totalTitulares + totalAcompanhantes

  const stats = [
    {
      label: 'Total de Pessoas',
      value: totalPessoas,
      icon: Users,
      color: 'bg-primary-100 text-primary-600',
    },
    {
      label: 'Confirmações',
      value: totalTitulares,
      icon: UserCheck,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Acompanhantes',
      value: totalAcompanhantes,
      icon: UserPlus,
      color: 'bg-accent-100 text-accent-700',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm"
        >
          <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon size={20} />
          </div>
          <p className="text-2xl font-bold text-neutral-800 font-[Poppins]">
            {stat.value}
          </p>
          <p className="text-xs text-neutral-500 font-[Poppins] mt-0.5">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

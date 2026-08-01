import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AdminHeader } from '../components/admin/AdminHeader'
import { StatsCards } from '../components/admin/StatsCards'
import { RsvpTable } from '../components/admin/RsvpTable'
import { useRsvps } from '../hooks/useRsvps'
import { RefreshCw } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function AdminDashboard() {
  const { rsvps, loading, fetchRsvps, deleteRsvp } = useRsvps()

  useEffect(() => {
    fetchRsvps()
  }, [fetchRsvps])

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminHeader />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-neutral-800 font-semibold">
                Resumo
              </h2>
              <Button
                variant="ghost"
                size="sm"
                icon={<RefreshCw size={14} className={loading ? 'animate-spin' : ''} />}
                onClick={fetchRsvps}
                disabled={loading}
              >
                Atualizar
              </Button>
            </div>
            <StatsCards rsvps={rsvps} />
          </div>

          {/* Table */}
          <div>
            <h2 className="font-display text-xl text-neutral-800 font-semibold mb-4">
              Lista de Confirmados
            </h2>

            {loading && rsvps.length === 0 ? (
              <div className="text-center py-20">
                <div className="animate-spin inline-block w-8 h-8 border-2 border-primary-300 border-t-transparent rounded-full mb-3" />
                <p className="text-neutral-500 font-[Poppins] text-sm">
                  Carregando confirmações...
                </p>
              </div>
            ) : (
              <RsvpTable rsvps={rsvps} onDelete={deleteRsvp} />
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

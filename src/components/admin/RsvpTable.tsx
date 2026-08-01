import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Search, Download, AlertTriangle } from 'lucide-react'
import type { Rsvp } from '../../types/rsvp.types'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { Toast } from '../ui/Toast'
import { exportToCsv } from '../../utils/csv'

interface RsvpTableProps {
  rsvps: Rsvp[]
  onDelete: (id: string) => Promise<boolean>
}

export function RsvpTable({ rsvps, onDelete }: RsvpTableProps) {
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Rsvp | null>(null)
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', visible: false })

  const filtered = rsvps.filter((r) =>
    r.nome.toLowerCase().includes(search.toLowerCase())
  )

  async function handleDelete() {
    if (!deleteTarget) return
    const success = await onDelete(deleteTarget.id)
    setDeleteTarget(null)

    if (success) {
      setToast({ message: 'Confirmação excluída', type: 'success', visible: true })
    } else {
      setToast({ message: 'Erro ao excluir', type: 'error', visible: true })
    }
  }

  return (
    <div>
      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm font-[Poppins] text-neutral-800 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Download size={16} />}
          onClick={() => exportToCsv(rsvps)}
        >
          Exportar CSV
        </Button>
      </div>

      {/* Results count */}
      <p className="text-xs text-neutral-500 font-[Poppins] mb-3">
        {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        {search && ` para "${search}"`}
      </p>

      {/* Table / Cards */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((rsvp, i) => (
            <motion.div
              key={rsvp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-xl border border-neutral-100 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-[Poppins] font-semibold text-neutral-800 text-sm truncate">
                    {rsvp.nome}
                  </h3>
                  <p className="text-xs text-neutral-500 font-[Poppins] mt-0.5">
                    📱 {rsvp.whatsapp}
                  </p>
                  {rsvp.tem_acompanhante && (
                    <p className="text-xs text-primary-600 font-[Poppins] mt-1">
                      +{rsvp.quantidade_acompanhantes} acompanhante{rsvp.quantidade_acompanhantes > 1 ? 's' : ''}
                      {rsvp.nomes_acompanhantes && (
                        <span className="text-neutral-400"> — {rsvp.nomes_acompanhantes}</span>
                      )}
                    </p>
                  )}
                  <p className="text-[10px] text-neutral-400 font-[Poppins] mt-1">
                    {new Date(rsvp.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>

                <button
                  onClick={() => setDeleteTarget(rsvp)}
                  className="p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
                  aria-label="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-neutral-400 font-[Poppins] text-sm">
              {search ? 'Nenhum resultado encontrado' : 'Nenhuma confirmação ainda'}
            </p>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirmar exclusão"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <p className="text-neutral-800 font-[Poppins] text-sm mb-1">
            Tem certeza que deseja excluir?
          </p>
          <p className="text-neutral-500 font-[Poppins] text-xs mb-6">
            A confirmação de <strong>{deleteTarget?.nome}</strong> será removida permanentemente.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteTarget(null)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              className="flex-1"
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  )
}

import { useState, useCallback } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Rsvp, RsvpInsert } from '../types/rsvp.types'

/**
 * Hook para gerenciar RSVPs no Supabase.
 * - submitRsvp: insere um novo RSVP (público)
 * - fetchRsvps: busca todos os RSVPs (admin)
 * - deleteRsvp: exclui um RSVP (admin)
 */
export function useRsvps() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /** Busca todos os RSVPs (requer autenticação) */
  const fetchRsvps = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setRsvps(data as Rsvp[])
    }

    setLoading(false)
  }, [])

  /** Insere um novo RSVP (público, anon) */
  const submitRsvp = useCallback(async (rsvp: RsvpInsert): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      setError('Confirmação indisponível no momento. Tente mais tarde.')
      return false
    }

    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase
      .from('rsvps')
      .insert([rsvp])

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
      return false
    }

    return true
  }, [])

  /** Exclui um RSVP por ID (requer autenticação) */
  const deleteRsvp = useCallback(async (id: string): Promise<boolean> => {
    setError(null)

    const { error: deleteError } = await supabase
      .from('rsvps')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError(deleteError.message)
      return false
    }

    setRsvps((prev) => prev.filter((r) => r.id !== id))
    return true
  }, [])

  return {
    rsvps,
    loading,
    error,
    fetchRsvps,
    submitRsvp,
    deleteRsvp,
  }
}

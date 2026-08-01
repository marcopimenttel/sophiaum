export interface Rsvp {
  id: string
  nome: string
  whatsapp: string
  tem_acompanhante: boolean
  quantidade_acompanhantes: number
  nomes_acompanhantes: string | null
  created_at: string
}

export interface RsvpInsert {
  nome: string
  whatsapp: string
  tem_acompanhante: boolean
  quantidade_acompanhantes: number
  nomes_acompanhantes?: string
}

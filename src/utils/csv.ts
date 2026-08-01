import type { Rsvp } from '../types/rsvp.types'

/**
 * Converte a lista de RSVPs em CSV e dispara o download
 */
export function exportToCsv(rsvps: Rsvp[], filename = 'confirmados.csv') {
  const headers = ['Nome', 'WhatsApp', 'Acompanhante?', 'Qtd Acompanhantes', 'Nomes Acompanhantes', 'Data Confirmação']
  
  const rows = rsvps.map((r) => [
    `"${r.nome}"`,
    `"${r.whatsapp}"`,
    r.tem_acompanhante ? 'Sim' : 'Não',
    String(r.quantidade_acompanhantes),
    `"${r.nomes_acompanhantes || ''}"`,
    `"${new Date(r.created_at).toLocaleString('pt-BR')}"`,
  ])

  const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n')

  // BOM para Excel reconhecer acentos
  const bom = '\uFEFF'
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
}

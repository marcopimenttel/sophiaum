/**
 * Aplica máscara de telefone brasileiro: (XX) XXXXX-XXXX
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/**
 * Remove a máscara e retorna apenas dígitos
 */
export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Valida se o telefone tem 10 ou 11 dígitos
 */
export function isValidPhone(value: string): boolean {
  const digits = unmaskPhone(value)
  return digits.length >= 10 && digits.length <= 11
}

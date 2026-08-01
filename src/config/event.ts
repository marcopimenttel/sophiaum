/**
 * Configuração centralizada do evento.
 * Altere os valores aqui para personalizar o convite.
 */
export const EVENT_CONFIG = {
  /** Nome de exibição (fonte script) */
  name: 'Bárbara Sophia',

  /** Nome completo */
  fullName: 'Bárbara Sophia Gomes da Silva',

  /** Idade */
  age: 15,

  /** Nomes dos pais */
  parents: 'Márcia Keyla Gomes e Fábio Freitas',

  /** Data e hora do evento — ISO 8601 (ATUALIZAR quando souber) */
  date: '2026-09-01T19:00:00-03:00',

  /** Nome do local */
  venue: 'Imperial Eventos',

  /** Endereço completo (ATUALIZAR) */
  address: 'Endereço a definir',

  /** Dress code */
  dressCode: 'Esporte Fino',

  /** Link do Google Maps (ATUALIZAR) */
  googleMapsUrl: '#',

  /** Número do WhatsApp com código do país (ATUALIZAR) */
  whatsappNumber: '',

  /** Mensagem pré-preenchida do WhatsApp */
  whatsappMessage: 'Olá! Gostaria de saber mais sobre a festa de 15 anos da Bárbara Sophia! 🎉',

  /** URL base do site */
  siteUrl: 'https://sophia.webmachri.com',
} as const

/**
 * Fotos do hero (fundo da seção principal)
 */
export const HERO_IMAGES = [
  '/images/hero/hero-1.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp',
]

/**
 * Fotos da galeria
 */
export const GALLERY_IMAGES = [
  '/images/gallery/gallery-2.webp',
  '/images/gallery/gallery-3.webp',
  '/images/gallery/gallery-4.webp',
  '/images/gallery/gallery-5.webp',
  '/images/gallery/gallery-7.webp',
  '/images/gallery/gallery-9.webp',
  '/images/gallery/gallery-11.webp',
  '/images/gallery/gallery-14.webp',
  '/images/gallery/gallery-15.webp',
  '/images/gallery/gallery-17.webp',
  '/images/gallery/gallery-24.webp',
  '/images/gallery/gallery-25.webp',
  '/images/gallery/gallery-28.webp',
  '/images/gallery/gallery-33.webp',
  '/images/gallery/gallery-35.webp',
]

/**
 * Sugestões de presente
 */
export const GIFT_SUGGESTIONS = [
  {
    emoji: '👗',
    title: 'Roupas',
    details: 'Tam. PP | 34 | 16',
    stores: 'Youcom, Riachuelo e etc',
  },
  {
    emoji: '👠',
    title: 'Sapatos',
    details: 'Tam. 35/36',
    stores: 'Ana Capri, Schutz, Via Uno e etc',
  },
  {
    emoji: '🌸',
    title: 'Perfumes',
    details: 'Fragrâncias doces',
    stores: 'O Boticário, Top Internacional e etc',
  },
  {
    emoji: '💎',
    title: 'Joias',
    details: 'Ouro ou prata 925 banhada a ouro',
    stores: 'Vivara e joalherias especializadas',
    note: 'Alergia a bijuterias',
  },
  {
    emoji: '👜',
    title: 'Bolsas',
    details: '',
    stores: '',
  },
  {
    emoji: '📖',
    title: 'Kindle',
    details: '',
    stores: '',
  },
  {
    emoji: '💄',
    title: 'Maquiagem',
    details: '',
    stores: 'Quem Disse, Berenice?',
  },
] as const

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

  /** Data e hora do evento — ISO 8601 (para contagem regressiva) */
  date: '2026-08-21T21:00:00-03:00',

  /** Horário exibido nos detalhes (texto fixo) */
  timeLabel: '21:00',

  /** Nome do local */
  venue: 'Imperial Eventos',

  /** Endereço completo (ATUALIZAR) */
  address: 'Endereço a definir',

  /** Dress code */
  dressCode: 'Esporte Fino',

  /** Link do Google Maps */
  googleMapsUrl: 'https://maps.app.goo.gl/yXcDmLqWz5tVFR1YA',

  /** Número do WhatsApp com código do país */
  whatsappNumber: '559292173593',

  /** Mensagem pré-preenchida do WhatsApp */
  whatsappMessage: 'Olá! Gostaria de saber mais sobre a festa de 15 anos da Bárbara Sophia! 🎉',

  /** URL base do site */
  siteUrl: 'https://sophia.webmachri.com',
} as const

/**
 * Fotos do hero (fundo da seção principal)
 * Fonte: Documents/fotosophia/Seleção
 */
export const HERO_IMAGES = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
]

/**
 * Fotos da galeria
 * Fonte: Documents/fotosophia/Seleção (todas as fotos)
 */
export const GALLERY_IMAGES = [
  '/images/gallery/photo-01.jpg',
  '/images/gallery/photo-02.jpg',
  '/images/gallery/photo-03.jpg',
  '/images/gallery/photo-04.jpg',
  '/images/gallery/photo-05.jpg',
  '/images/gallery/photo-06.jpg',
  '/images/gallery/photo-07.jpg',
  '/images/gallery/photo-08.jpg',
  '/images/gallery/photo-09.jpg',
  '/images/gallery/photo-10.jpg',
  '/images/gallery/photo-11.jpg',
  '/images/gallery/photo-12.jpg',
  '/images/gallery/photo-13.jpg',
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

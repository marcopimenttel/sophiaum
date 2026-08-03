import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Pause, Sparkles } from 'lucide-react'
import { EVENT_CONFIG } from '../../config/event'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = EVENT_CONFIG.musicVolume
    audio.preload = 'auto'

    const sync = () => setIsPlaying(!audio.paused)
    audio.addEventListener('play', sync)
    audio.addEventListener('playing', sync)
    audio.addEventListener('pause', sync)

    return () => {
      audio.removeEventListener('play', sync)
      audio.removeEventListener('playing', sync)
      audio.removeEventListener('pause', sync)
      audio.pause()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  async function openInvite() {
    const audio = audioRef.current
    if (!audio) {
      setIsOpen(true)
      return
    }

    try {
      audio.muted = false
      audio.volume = EVENT_CONFIG.musicVolume
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    } finally {
      setIsOpen(true)
    }
  }

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (!audio.paused) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.muted = false
        audio.volume = EVENT_CONFIG.musicVolume
        await audio.play()
        setIsPlaying(true)
      }
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={EVENT_CONFIG.musicSrc} preload="auto" playsInline loop />

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={openInvite}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-neutral-950 px-6 cursor-pointer border-0"
            aria-label="Abrir convite e tocar música"
          >
            <div className="absolute inset-0 overlay-gradient-red pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <Sparkles className="text-accent-400 mb-5" size={28} />

              <p className="font-display italic text-white/80 text-base sm:text-lg mb-3">
                Você está convidado(a)
              </p>

              <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-white mb-8 leading-tight">
                {EVENT_CONFIG.name}
              </h2>

              <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-500/10 px-6 py-3 text-accent-300 font-[Poppins] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">
                <Music2 size={16} />
                Toque para abrir o convite
              </span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={togglePlay}
          whileTap={{ scale: 0.94 }}
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          className="fixed bottom-6 right-5 z-40 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl shadow-primary-900/40 border border-white/20 flex items-center justify-center cursor-pointer hover:from-primary-500 hover:to-primary-700 transition-colors"
        >
          {isPlaying ? <Pause size={22} fill="currentColor" /> : <Music2 size={22} />}
        </motion.button>
      )}
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Pause, Volume2, VolumeX } from 'lucide-react'
import { EVENT_CONFIG } from '../../config/event'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio(EVENT_CONFIG.musicSrc)
    audio.loop = true
    audio.volume = EVENT_CONFIG.musicVolume
    audio.preload = 'auto'
    audioRef.current = audio

    const onCanPlay = () => setReady(true)
    audio.addEventListener('canplaythrough', onCanPlay)

    return () => {
      audio.pause()
      audio.removeEventListener('canplaythrough', onCanPlay)
      audioRef.current = null
    }
  }, [])

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isPlaying && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 right-5 z-40 max-w-[9.5rem] rounded-xl bg-neutral-950/80 px-3 py-2 text-[11px] font-[Poppins] text-white/90 shadow-lg backdrop-blur-md border border-white/10 sm:right-6"
          >
            Toque para ouvir a música
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={togglePlay}
        disabled={!ready && !audioRef.current}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
        className="fixed bottom-6 right-5 z-40 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl shadow-primary-900/40 border border-white/20 flex items-center justify-center cursor-pointer hover:from-primary-500 hover:to-primary-700 transition-colors"
      >
        {isPlaying ? (
          <span className="relative flex items-center justify-center">
            <Pause size={22} fill="currentColor" />
            <Volume2 size={12} className="absolute -top-1 -right-2 opacity-80" />
          </span>
        ) : (
          <span className="relative flex items-center justify-center">
            <Music2 size={22} />
            <VolumeX size={12} className="absolute -top-1 -right-2 opacity-80" />
          </span>
        )}
      </motion.button>
    </>
  )
}

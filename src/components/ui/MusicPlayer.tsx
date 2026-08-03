import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Pause } from 'lucide-react'
import { EVENT_CONFIG } from '../../config/event'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsGesture, setNeedsGesture] = useState(false)

  useEffect(() => {
    const audio = new Audio(EVENT_CONFIG.musicSrc)
    audio.loop = true
    audio.volume = EVENT_CONFIG.musicVolume
    audio.preload = 'auto'
    audioRef.current = audio

    let cleaned = false

    const startPlayback = async () => {
      if (!audioRef.current || cleaned) return
      try {
        await audioRef.current.play()
        if (!cleaned) {
          setIsPlaying(true)
          setNeedsGesture(false)
        }
        return true
      } catch {
        if (!cleaned) {
          setIsPlaying(false)
          setNeedsGesture(true)
        }
        return false
      }
    }

    const onGesture = async () => {
      const ok = await startPlayback()
      if (ok) removeGestureListeners()
    }

    const removeGestureListeners = () => {
      document.removeEventListener('pointerdown', onGesture)
      document.removeEventListener('touchstart', onGesture)
      document.removeEventListener('keydown', onGesture)
    }

    const addGestureListeners = () => {
      document.addEventListener('pointerdown', onGesture, { once: true })
      document.addEventListener('touchstart', onGesture, { once: true })
      document.addEventListener('keydown', onGesture, { once: true })
    }

    // Tenta autoplay assim que o áudio puder tocar
    const tryAutoplay = async () => {
      const ok = await startPlayback()
      if (!ok) addGestureListeners()
    }

    if (audio.readyState >= 3) {
      void tryAutoplay()
    } else {
      audio.addEventListener('canplaythrough', () => void tryAutoplay(), { once: true })
      // Fallback: tenta mesmo sem canplaythrough completo
      void tryAutoplay()
    }

    return () => {
      cleaned = true
      removeGestureListeners()
      audio.pause()
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
        setNeedsGesture(false)
      }
    } catch {
      setIsPlaying(false)
      setNeedsGesture(true)
    }
  }

  return (
    <>
      <AnimatePresence>
        {needsGesture && !isPlaying && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 right-5 z-40 max-w-[10rem] rounded-xl bg-neutral-950/80 px-3 py-2 text-[11px] font-[Poppins] text-white/90 shadow-lg backdrop-blur-md border border-white/10 sm:right-6"
          >
            Toque em qualquer lugar para ouvir
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={togglePlay}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
        className="fixed bottom-6 right-5 z-40 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl shadow-primary-900/40 border border-white/20 flex items-center justify-center cursor-pointer hover:from-primary-500 hover:to-primary-700 transition-colors"
      >
        {isPlaying ? <Pause size={22} fill="currentColor" /> : <Music2 size={22} />}
      </motion.button>
    </>
  )
}

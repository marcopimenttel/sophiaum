import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Pause } from 'lucide-react'
import { EVENT_CONFIG } from '../../config/event'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = EVENT_CONFIG.musicVolume
    audio.muted = true

    const syncState = () => {
      setIsPlaying(!audio.paused)
      setIsMuted(audio.muted)
    }

    audio.addEventListener('play', syncState)
    audio.addEventListener('playing', syncState)
    audio.addEventListener('pause', syncState)
    audio.addEventListener('volumechange', syncState)

    const unmute = () => {
      audio.muted = false
      audio.volume = EVENT_CONFIG.musicVolume
      setIsMuted(false)
    }

    const ensurePlaying = async () => {
      try {
        // 1) Autoplay mutado — permitido pela maioria dos navegadores
        audio.muted = true
        await audio.play()
        setIsPlaying(true)

        // 2) Tenta ligar o som na hora
        try {
          unmute()
        } catch {
          // continua mutado até o primeiro gesto
        }
      } catch {
        setIsPlaying(false)
      }
    }

    const onFirstGesture = async () => {
      try {
        if (audio.paused) {
          audio.muted = true
          await audio.play()
        }
        unmute()
        setIsPlaying(true)
      } catch {
        // ignore
      }
      removeGestureListeners()
    }

    const removeGestureListeners = () => {
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('touchstart', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
      window.removeEventListener('scroll', onFirstGesture)
    }

    const addGestureListeners = () => {
      window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true })
      window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true })
      window.addEventListener('keydown', onFirstGesture, { once: true })
      window.addEventListener('scroll', onFirstGesture, { once: true, passive: true })
    }

    void ensurePlaying().finally(() => {
      // Se ainda estiver sem som ou pausado, espera qualquer interação
      if (audio.paused || audio.muted) {
        addGestureListeners()
      }
    })

    // Re-tenta quando a aba volta ao foco
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && audio.paused) {
        void ensurePlaying()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      removeGestureListeners()
      document.removeEventListener('visibilitychange', onVisibility)
      audio.removeEventListener('play', syncState)
      audio.removeEventListener('playing', syncState)
      audio.removeEventListener('pause', syncState)
      audio.removeEventListener('volumechange', syncState)
      audio.pause()
    }
  }, [])

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (!audio.paused && !audio.muted) {
        audio.pause()
        setIsPlaying(false)
        return
      }

      audio.muted = false
      audio.volume = EVENT_CONFIG.musicVolume
      await audio.play()
      setIsPlaying(true)
      setIsMuted(false)
    } catch {
      setIsPlaying(false)
    }
  }

  const showPlayingIcon = isPlaying && !isMuted

  return (
    <>
      <audio
        ref={audioRef}
        src={EVENT_CONFIG.musicSrc}
        preload="auto"
        playsInline
        autoPlay
        loop
      />

      <AnimatePresence>
        {(!isPlaying || isMuted) && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 right-5 z-40 max-w-[11rem] rounded-xl bg-neutral-950/80 px-3 py-2 text-[11px] font-[Poppins] text-white/90 shadow-lg backdrop-blur-md border border-white/10 sm:right-6"
          >
            Toque em qualquer lugar para ativar o som
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={togglePlay}
        whileTap={{ scale: 0.94 }}
        aria-label={showPlayingIcon ? 'Pausar música' : 'Tocar música'}
        className="fixed bottom-6 right-5 z-40 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl shadow-primary-900/40 border border-white/20 flex items-center justify-center cursor-pointer hover:from-primary-500 hover:to-primary-700 transition-colors"
      >
        {showPlayingIcon ? <Pause size={22} fill="currentColor" /> : <Music2 size={22} />}
      </motion.button>
    </>
  )
}

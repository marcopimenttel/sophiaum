import { Hero } from '../components/sections/Hero'
import { Countdown } from '../components/sections/Countdown'
import { Gallery } from '../components/sections/Gallery'
import { EventDetails } from '../components/sections/EventDetails'
import { DressCode } from '../components/sections/DressCode'
import { GiftSuggestions } from '../components/sections/GiftSuggestions'
import { RsvpForm } from '../components/sections/RsvpForm'
import { Footer } from '../components/sections/Footer'
import { MusicPlayer } from '../components/ui/MusicPlayer'

export function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <Gallery />
      <EventDetails />
      <DressCode />
      <GiftSuggestions />
      <RsvpForm />
      <Footer />
      <MusicPlayer />
    </main>
  )
}

'use client'
import BackgroundParallax from '@/components/background-parallax'
import Hero from '@/components/hero'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import Preloader from '../components/Preloader'
import { AnimatePresence } from 'framer-motion'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const locomotiveScroll = new LocomotiveScroll()

      setTimeout(() => {
        setIsLoading(false)
        document.body.style.cursor = 'default'
        window.scrollTo(0, 0)
      }, 500)
    })()
  }, [])
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white">
    <div className="bg-black  font-maxiRound">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <BackgroundParallax />
      <Hero />
      <CTA />
      <Footer />
    </div>
  )
}

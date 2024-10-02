'use client'
import React, { useEffect } from 'react'
import Description from './description'
import Intro from './intro'
import Section from './section'
import Lenis from 'lenis'

export default function BackgroundParallax() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main className="bg-black">
      <Intro />
      <Description />
      <Section />
    </main>
  )
}

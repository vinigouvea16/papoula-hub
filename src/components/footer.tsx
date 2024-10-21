import React from 'react'

export default function Footer() {
  return (
    <div className="text-papoula-text flex flex-col justify-center gap-20 font-maxiRound">
      <div
        id="footer-heading"
        className="flex flex-col items-center xl:items-stretch uppercase xl:font-thin text-papoula-text xl:text-8xl text-4xl md:text-6xl xl:flex-row xl:justify-evenly xl:gap-0 gap-10"
      >
        <span>the</span>
        <span>storytelling</span>
        <span>hub</span>
      </div>
      <div
        id="footer-footer"
        className="flex flex-col xl:flex-row justify-between gap-16 items-center px-10"
      >
        <div
          id="contact-info"
          className="flex flex-col text-center xl:text-start"
        >
          <span className="font-black xl:text-3xl">
            <a href="mailto:contato@papoulahub.com">contato@papoulahub.com</a>
          </span>
          <span className="font-normal">@2024 Papoula Hub</span>
        </div>
        <div
          id="made-by"
          className="font-extralight flex flex-row text-center items-end gap-1 font-raleway"
        >
          <span>made by</span>
          <span className="italic text-xl">
            <a href="https://tailvinicss.dev">tailvinicss</a>
          </span>
        </div>
      </div>
    </div>
  )
}

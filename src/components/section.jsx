import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function Section() {
  const container = useRef()
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-lvh overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="relative z-10 md:p-20 px-2 py-20 mix-blend-hard-light items-center text-[#D7DADB] w-full h-lvh flex flex-col justify-between">
        <p className="md:w-[50vw] md:text-[2.5vw] text-xl flex justify-center mix-blend-difference font-semibold ">
          Aumentando seu estado de consciência
        </p>
        <div className="uppercase flex flex-col pb-10">
          <div className="flex items-center font-bold justify-center leading-none md:text-[13vw] text-[15vw]">
            <p>PAP</p>
            <svg
              width="15vw"
              height="15vw"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M73.3613 19.8387C84.3297 13.3667 97.5498 11.959 109.607 15.9791V15.9791C113.503 17.2784 117.568 18.0239 121.674 18.1935V18.1935C134.36 18.7177 146.258 24.7714 154.193 34.6695V34.6695C156.766 37.879 159.798 40.7395 163.155 43.116V43.116C173.543 50.4699 180.292 62.0254 181.651 74.6971V74.6971C182.092 78.8062 183.107 82.8676 184.653 86.6969V86.6969C189.434 98.5344 188.924 111.911 183.241 123.37V123.37C181.405 127.071 180.084 131.043 179.33 135.103V135.103C177.005 147.615 169.384 158.649 158.466 165.195V165.195C154.935 167.313 151.699 169.929 148.885 172.937V172.937C140.195 182.228 127.883 187.353 115.191 186.919V186.919C111.081 186.779 106.969 187.217 102.978 188.22V188.22C90.6522 191.318 77.5572 188.898 67.1509 181.641V181.641C63.7814 179.291 60.0793 177.414 56.1904 176.086V176.086C44.1677 171.983 34.4485 162.796 29.6073 151.047V151.047C28.0367 147.235 25.929 143.627 23.3742 140.394V140.394C15.4634 130.382 12.2199 117.406 14.4667 104.82V104.82C15.1936 100.748 15.3527 96.5619 14.9406 92.4497V92.4497C13.67 79.7686 17.9002 67.0439 26.5519 57.6626V57.6626C29.3479 54.6308 31.7262 51.1943 33.5844 47.5128V47.5128C39.3148 36.1595 49.7105 27.7318 62.0118 24.5469V24.5469C65.994 23.5158 69.8163 21.9305 73.3613 19.8387V19.8387Z"
                fill="#D7DADB"
              />
              <ellipse
                cx="99.8357"
                cy="101.766"
                rx="8.43237"
                ry="8.86528"
                fill="#1EA8FF"
              />
              <rect
                width="34.4442"
                height="52.4865"
                rx="17.2221"
                transform="matrix(0.702469 0.711715 -0.702469 0.711715 141.309 32.9186)"
                fill="#1EA8FF"
              />
              <path
                d="M95.0161 54.1334C100.274 62.0314 98.1862 72.7738 90.3525 78.1273V78.1273C82.5188 83.4807 71.9059 81.4179 66.6478 73.5199L56.5314 58.3243C51.2733 50.4263 53.3613 39.6839 61.1949 34.3305V34.3305C69.0286 28.977 79.6416 31.0398 84.8997 38.9378L95.0161 54.1334Z"
                fill="#1EA8FF"
              />
              <rect
                width="34.66"
                height="52.1556"
                rx="17.33"
                transform="matrix(-0.137399 -0.990516 0.990014 -0.140969 28.9609 131.382)"
                fill="#1EA8FF"
              />
              <path
                d="M129.32 135.122C120.758 130.892 117.176 120.487 121.318 111.882V111.882C125.46 103.277 135.759 99.7316 144.32 103.962L160.181 111.8C168.743 116.031 172.325 126.436 168.183 135.04V135.04C164.041 143.645 153.743 147.191 145.181 142.96L129.32 135.122Z"
                fill="#1EA8FF"
              />
              <path
                d="M75.6801 138.086C76.6553 128.686 85.0639 121.877 94.4612 122.877V122.877C103.859 123.878 110.686 132.309 109.711 141.709L107.792 160.208C106.817 169.608 98.4082 176.417 89.0109 175.416V175.416C79.6135 174.416 72.786 165.984 73.7611 156.584L75.6801 138.086Z"
                fill="#1EA8FF"
              />
            </svg>
            <p>ULA</p>
          </div>
          <div className="md:text-[3vw]  text-2xl justify-between uppercase flex items-center">
            <span>the</span>
            <span>storytelling</span>
            <span>hub</span>
          </div>
        </div>
      </div>
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src="/images/image1.jpg"
            fill
            alt="image"
            className="brightness-75"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </div>
  )
}

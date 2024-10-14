import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export default function CTA() {
  return (
    <div
      className="bg-black h-[90vh] relative lg:py-4 mt-20 lg:mt-10 font-maxiRound"
      id="cta"
    >
      <div
        id="svg-div"
        className="absolute xl:top-[-10%] top-[-12%] right-4 h-[16.67%] w-auto flex items-center"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M55.021 14.879C63.2473 10.025 73.1623 8.96919 82.205 11.9843C85.1276 12.9587 88.1757 13.5179 91.2557 13.6451C100.77 14.0382 109.694 18.5785 115.645 26.0021C117.575 28.4092 119.848 30.5546 122.366 32.337C130.157 37.8524 135.219 46.519 136.238 56.0228C136.569 59.1047 137.33 62.1507 138.49 65.0227C142.075 73.9008 141.693 83.9332 137.43 92.5277C136.054 95.3033 135.063 98.2826 134.497 101.327C132.754 110.711 127.038 118.986 118.849 123.896C116.201 125.485 113.774 127.447 111.664 129.703C105.146 136.671 95.9122 140.515 86.3934 140.19C83.3106 140.084 80.227 140.412 77.2331 141.165C67.9892 143.488 58.1679 141.673 50.3632 136.231C47.836 134.469 45.0595 133.06 42.1428 132.065C33.1258 128.987 25.8364 122.097 22.2055 113.285C21.0275 110.426 19.4467 107.721 17.5306 105.296C11.5976 97.7868 9.16491 88.0541 10.85 78.6147C11.3952 75.5612 11.5145 72.4214 11.2055 69.3373C10.2525 59.8264 13.4251 50.2829 19.9139 43.2469C22.0109 40.9731 23.7947 38.3957 25.1883 35.6346C29.4861 27.1196 37.2829 20.7988 46.5088 18.4101C49.4955 17.6368 52.3622 16.4478 55.021 14.879Z"
            fill="#D7DADB"
          />
          <ellipse
            cx="74.8765"
            cy="76.3238"
            rx="6.32428"
            ry="6.64896"
            fill="black"
          />
          <rect
            width="25.8332"
            height="39.3648"
            rx="12.9166"
            transform="matrix(0.702469 0.711715 -0.702469 0.711715 105.981 24.689)"
            fill="black"
          />
          <path
            d="M71.2614 40.5993C75.205 46.5228 73.639 54.5796 67.7638 58.5946C61.8885 62.6097 53.9288 61.0626 49.9852 55.1391L42.3979 43.7424C38.4544 37.8189 40.0203 29.7621 45.8956 25.747C51.7709 21.732 59.7306 23.2791 63.6741 29.2026L71.2614 40.5993Z"
            fill="black"
          />
          <rect
            width="25.995"
            height="39.1167"
            rx="12.9975"
            transform="matrix(-0.137399 -0.990516 0.990014 -0.140969 21.7207 98.5361)"
            fill="black"
          />
          <path
            d="M96.9897 101.341C90.5686 98.1684 87.8817 90.3646 90.9884 83.9112C94.0951 77.4577 101.819 74.7984 108.24 77.9714L120.136 83.8498C126.557 87.0228 129.244 94.8266 126.137 101.28C123.031 107.734 115.307 110.393 108.886 107.22L96.9897 101.341Z"
            fill="black"
          />
          <path
            d="M57.2569 108.57C57.9598 101.794 64.0205 96.8865 70.794 97.6077C77.5674 98.329 82.4886 104.406 81.7857 111.182L80.3464 125.056C79.6436 131.831 73.5828 136.739 66.8094 136.017C60.036 135.296 55.1148 129.219 55.8177 122.444L57.2569 108.57Z"
            fill="black"
            stroke="black"
          />
        </svg>
      </div>
      <div>
        <span className="uppercase lg:text-[5vw] text-4xl text-white flex justify-center pt-4 mb-4 lg:mb-10">
          projetos
        </span>
      </div>
      <div className="bg-papoula-text h-2/3 text-center flex flex-col justify-center items-center xl:gap-14 gap-6">
        <h1 className="font-bold xl:text-6xl text-3xl">
          &ldquo;Histórias em Pesquisa&ldquo;
        </h1>
        <h2 className="font-semibold xl:text-2xl text-xl w-11/12">
          Desenvolva Roteiros Baseados em Pesquisas da UNESPAR
        </h2>
        <p className="xl:text-2xl xl:w-2/3 w-11/12">
          Participe da primeira edição do Núcleo de Desenvolvimento de Roteiros
          da PAPOULA, em parceria com a UNESPAR, e ajude a transformar pesquisas
          acadêmicas em roteiros incríveis. Serão selecionados 4 autores para
          desenvolverem projetos com o apoio de consultores experientes e uma
          ajuda de custo mensal
        </p>

        <Link href="/application-form">
          <Button
            size="lg"
            className="bg-papoula-blue text-black lg:text-xl lg:py-8 lg:px-10 hover:opacity-75 hover:text-papoula-text hover:bg-papoula-blue"
          >
            Saiba Mais
          </Button>
        </Link>
      </div>
    </div>
  )
}

import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div className="h-full bg-black 2xl:px-32 lg:px-10  font-maxiRound px-2 pb-14 pt-44 text-papoula-text flex-col">
      <div
        className="relative lg:gap-8 gap-2 flex justify-end overflow-x-hidden"
        id="about-hero"
      >
        <Image
          src="/images/heroimage2.jpg"
          width={560}
          height={620}
          className="brightness-50 w-[180px] h-[354px]  md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px] xl:w-[560px] xl:h-[620px] object-cover"
          alt="Picture of the author"
        />
        <Image
          src="/images/projeto_nucleo2.jpg"
          width={560}
          height={620}
          unoptimized={true}
          className="brightness-75  w-[180px] h-[354px]  md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px] xl:w-[560px] xl:h-[620px] object-cover"
          alt="Picture of the author"
        />
        <h2 className="uppercase text-5xl  font-maxiRound md:text-6xl lg:text-7xl xl:text-8xl font-bold absolute bottom-[20%] md:bottom-1/4 left-3">
          sobre nós
        </h2>
      </div>

      <div
        className="lg:flex-row flex flex-col 2xl:gap-28 lg:gap-16 pt-52 gap-20"
        id="mission"
      >
        <div className=" text-center">
          <h2 className="text-5xl font-bold pb-5 font-maxiRound">
            Posicionamento
          </h2>
          <p className="lg:text-2xl tracking-widest pb-10">
            Papoula nasce do desejo de conectar. Acreditamos no poder do
            coletivo e existimos para ocupar os espaços entre pessoas e ideias,
            transformando terrenos vazios em solo fértil para novas criações.
          </p>
          {/* <Image
            src="/images/projeto_selos1.png"
            width={1928}
            height={338}
            unoptimized={true}
            className="brightness-75"
            alt="Picture of the author"
          /> */}
        </div>
        {/* <div className="lg:text-start text-center xl:w-1/2">
          <h3 className="text-5xl font-bold pb-5 font-maxiRound">Missão</h3>
          <p className="lg:text-2xl tracking-widest ">
            <span className="italic lg:text-3xl text-xl">tapar buraco</span> -
            Ser uma plataforma de conexões e de criação de propriedade
            intelectual, um conjunto de ferramentas que quer deixar a vida mais
            leve, tanto para o colaborador quanto para a audiência.
          </p>
        </div> */}
      </div>
      {/* <div
        className="lg:flex-row flex flex-col 2xl:gap-28 lg:gap-16 lg:pt-52 pt-28"
        id="card-section"
      >
        <div className="border-t-2 border-b-2 border-papoula-text py-11 2xl:w-[47%] mb-28">
          <p className="lg:text-3xl text-xl tracking-wider font-light text-center lg:text-start italic ">
            “A Papoula é uma marca com um pouco de mistério, quem não é do
            audiovisual pode não entender suas atividades laborais, mas quer
            acompanhar o conteúdo que está sendo produzido. Quem trabalha com
            audiovisual quer participar dos núcleos e ter acesso a todas as
            ferramentas e conexões que a plataforma oferece.”
          </p>
        </div>
        <div id="card-section" className="relative">
          <div
            id="card-svg"
            className="
            absolute 
            z-20 
            right-[37%] 
            top-[-22%] 
            md:right-[28%] 
            md:top-[-10%] 
            lg:right-[5%] 
            lg:top-[-8%]"
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="12.404"
                cy="12.404"
                rx="3.17308"
                ry="3.17308"
                fill="#FF1F21"
              />
              <ellipse
                cx="138.75"
                cy="136.443"
                rx="3.17308"
                ry="3.17308"
                fill="#FF1F21"
              />
              <ellipse
                cx="60.0001"
                cy="4.61539"
                rx="4.61538"
                ry="4.61539"
                fill="#FF1F21"
              />
              <ellipse
                cx="114.808"
                cy="4.61539"
                rx="4.61538"
                ry="4.61539"
                fill="#FF1F21"
              />
              <ellipse
                cx="143.077"
                cy="32.308"
                rx="5.19231"
                ry="5.19232"
                fill="#FF1F21"
              />
              <ellipse
                cx="5.19231"
                cy="115.385"
                rx="5.19231"
                ry="5.19232"
                fill="#FF1F21"
              />
              <ellipse
                cx="4.61538"
                cy="59.423"
                rx="4.61538"
                ry="4.61539"
                fill="#FF1F21"
              />
              <ellipse
                cx="32.3078"
                cy="143.077"
                rx="4.61538"
                ry="4.61539"
                fill="#FF1F21"
              />
              <ellipse
                cx="87.6921"
                cy="143.077"
                rx="6.92308"
                ry="6.92309"
                fill="#FF1F21"
              />
              <ellipse
                cx="32.3078"
                cy="32.3079"
                rx="6.92308"
                ry="6.92309"
                fill="#FF1F21"
              />
              <ellipse
                cx="59.9999"
                cy="115.385"
                rx="10.3846"
                ry="10.3846"
                fill="#FF1F21"
              />
              <ellipse
                cx="87.6922"
                cy="32.3075"
                rx="10.3846"
                ry="10.3846"
                fill="#FF1F21"
              />
              <ellipse
                cx="114.807"
                cy="59.4232"
                rx="10.3846"
                ry="10.3846"
                fill="#FF1F21"
              />
              <ellipse
                cx="114.808"
                cy="115.385"
                rx="9.23077"
                ry="9.23079"
                fill="#FF1F21"
              />
              <ellipse
                cx="87.6924"
                cy="87.6924"
                rx="15"
                ry="15"
                fill="#FF1F21"
              />
              <ellipse
                cx="59.9995"
                cy="59.4238"
                rx="13.8462"
                ry="13.8462"
                fill="#FF1F21"
              />
              <ellipse
                cx="32.3075"
                cy="87.6927"
                rx="10.3846"
                ry="10.3846"
                fill="#FF1F21"
              />
              <ellipse
                cx="143.076"
                cy="87.6921"
                rx="6.92308"
                ry="6.92309"
                fill="#FF1F21"
              />
            </svg>
          </div>

          <div
            id="card"
            className="
            rounded-[20px] 
            bg-papoula-text 
            text-black 
            p-6 
            w-[90%] 
            h-auto 
            max-w-[700px] 
            max-h-[440px] 
            sm:p-8 sm:h-[400px] 
            md:w-[500px] md:h-[350px] 
            lg:w-[500px] lg:h-[400px] 
            xl:w-[600px] xl:h-[440px]
            2xl:w-[700px] 2xl:h-[440px]
            relative 
            z-10 
            mx-auto"
          >
            <div className="flex justify-center align-middle my-4 ml-4 md:ml-8">
              <ul
                className="
                  list-disc 
                  uppercase 
                  text-lg 
                  space-y-6 
                  sm:text-xl 
                  sm:space-y-8 
                  md:text-2xl 
                  lg:text-3xl 
                  font-bold
                  lg:mt-8"
              >
                <li>Internacionalização</li>
                <li>Foco na propriedade intelectual</li>
                <li>Liberdade de criação para o autor</li>
                <li>Trabalho coletivo</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="flex justify-center pt-24 pb-14">
        <p className="font-bold lg:text-[3vw] text-3xl text-center flex flex-col lg:flex-row gap-4">
          <span>ENTRETENIMENTO</span>
          <span>+</span>
          <span>CONTEÚDO EMBASADO</span>
          <span>=</span>
          <span>PAPOULA</span>
        </p>
      </div> */}
    </div>
  )
}

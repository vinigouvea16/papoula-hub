'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast, Toaster } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
// import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, VideoIcon } from 'lucide-react'
// import Link from 'next/link'

const formSchema = z.object({
  Email: z.string().email({ message: 'Email inválido' }),
  'Experiência Roteiro': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Experiência Núcleos': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Projetos Pessoais': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  'Portfolio/Currículo': z.string().url({ message: 'URL inválida' }).optional(),
  'Experiência Pesquisa': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  // 'ODS Identificação': z
  //   .array(z.string())
  //   .min(1, { message: 'Selecione pelo menos um ODS' }),
  'Identificação ODS Razão': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  // 'ODS Projetos': z
  //   .array(z.string())
  //   .min(1, { message: 'Selecione pelo menos um ODS' }),
  'Projetos ODS Relação': z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
})

type FormData = z.infer<typeof formSchema>

interface AccessibleFormFieldProps {
  label: string
  id: string
  children: React.ReactNode
  videoSrc: string
}

const AccessibleFormField: React.FC<AccessibleFormFieldProps> = ({
  label,
  id,
  children,
  videoSrc,
}) => (
  <div className="space-y-2">
    <div className="lg:flex items-center space-x-2">
      <Label htmlFor={id} className="text-base">
        {label}
      </Label>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="icon" className="my-1">
            <VideoIcon className="h-4 w-4" />
            <span className="sr-only">
              Watch accessibility video for {label}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accessibility Video for {label}</DialogTitle>
          </DialogHeader>
          <video src={videoSrc} controls className="w-full">
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>
    </div>
    {children}
  </div>
)

export default function TwoColumnApplicationFormStep2() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cooldownTime, setCooldownTime] = useState(0)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: '',
      'Experiência Roteiro': '',
      'Experiência Núcleos': '',
      'Projetos Pessoais': '',
      'Portfolio/Currículo': '',
      'Experiência Pesquisa': '',
      // 'ODS Identificação': [],
      'Identificação ODS Razão': '',
      // 'ODS Projetos': [],
      'Projetos ODS Relação': '',
    },
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldownTime])

  const onSubmit = async (data: FormData) => {
    if (isSubmitted || cooldownTime > 0) {
      toast.error('Por favor, aguarde antes de enviar novamente.', {
        duration: 5000,
        style: {
          background: '#FFA500',
          color: '#FFFFFF',
          border: 'none',
        },
        icon: '⏳',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-form-step2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setCooldownTime(300) // 5 minutes cooldown
        toast.success('Formulário enviado com sucesso!', {
          style: {
            background: '#4CAF50',
            color: '#FFFFFF',
            border: 'none',
          },
          icon: '🎉',
        })
      } else {
        toast.error('Erro ao enviar formulário. Por favor, tente novamente.', {
          style: {
            background: '#F44336',
            color: '#FFFFFF',
            border: 'none',
          },
          icon: '❌',
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Erro ao enviar formulário. Por favor, tente novamente.', {
        style: {
          background: '#F44336',
          color: '#FFFFFF',
          border: 'none',
        },
        icon: '❌',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // const odsOptions = [
  //   'Erradicação da Pobreza',
  //   'Fome Zero e Agricultura Sustentável',
  //   'Saúde e Bem-Estar',
  //   'Educação de Qualidade',
  //   'Igualdade de Gênero',
  //   'Água Potável e Saneamento',
  //   'Energia Limpa e Acessível',
  //   'Trabalho Decente e Crescimento Econômico',
  //   'Indústria, Inovação e Infraestrutura',
  //   'Redução das Desigualdades',
  //   'Cidades e Comunidades Sustentáveis',
  //   'Consumo e Produção Responsáveis',
  //   'Ação Contra a Mudança Global do Clima',
  //   'Vida na Água',
  //   'Vida Terrestre',
  //   'Paz, Justiça e Instituições Eficazes',
  //   'Parcerias e Meios de Implementação',
  // ]

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
          },
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Núcleo Criativo para Desenvolvimento de Propriedade Intelectual
        </h1>
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="lg:w-[50%] md:overflow-y-scroll max-h-[calc(100vh-150px)] relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6 md:px-4">
                <div className="absolute right-4 top-5 z-10">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="6.61565"
                      cy="6.61565"
                      rx="1.69231"
                      ry="1.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="74.0004"
                      cy="72.7695"
                      rx="1.69231"
                      ry="1.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="32.0001"
                      cy="2.46154"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="61.2311"
                      cy="2.46154"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="76.3078"
                      cy="17.2311"
                      rx="2.76924"
                      ry="2.76924"
                      fill="#111"
                    />
                    <ellipse
                      cx="2.76924"
                      cy="61.5383"
                      rx="2.76924"
                      ry="2.76924"
                      fill="#111"
                    />
                    <ellipse
                      cx="2.46155"
                      cy="31.6925"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="17.2311"
                      cy="76.3077"
                      rx="2.46155"
                      ry="2.46154"
                      fill="#111"
                    />
                    <ellipse
                      cx="46.7695"
                      cy="76.3075"
                      rx="3.69232"
                      ry="3.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="17.2309"
                      cy="17.2309"
                      rx="3.69232"
                      ry="3.69231"
                      fill="#111"
                    />
                    <ellipse
                      cx="31.9999"
                      cy="61.5385"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="46.7694"
                      cy="17.2309"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="61.2309"
                      cy="31.6923"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="61.2312"
                      cy="61.5383"
                      rx="4.92309"
                      ry="4.92309"
                      fill="#111"
                    />
                    <ellipse
                      cx="46.7696"
                      cy="46.7691"
                      rx="8.00003"
                      ry="8.00002"
                      fill="#111"
                    />
                    <ellipse
                      cx="31.9999"
                      cy="31.6927"
                      rx="7.38464"
                      ry="7.38463"
                      fill="#111"
                    />
                    <ellipse
                      cx="17.2309"
                      cy="46.7694"
                      rx="5.53848"
                      ry="5.53847"
                      fill="#111"
                    />
                    <ellipse
                      cx="76.3076"
                      cy="46.769"
                      rx="3.69232"
                      ry="3.69231"
                      fill="#111"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-semibold italic">ETAPA 2</h2>

                <AccessibleFormField
                  label="Email"
                  id="Email"
                  videoSrc="/path-to-email-video.mp4"
                >
                  <Controller
                    name="Email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Insira o mesmo email utilizado na Etapa 1"
                      />
                    )}
                  />
                  {errors.Email && (
                    <p className="text-red-500">{errors.Email.message}</p>
                  )}
                </AccessibleFormField>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold italic">
                    EXPERIÊNCIA COM ROTEIRO E AUDIOVISUAL
                  </h3>

                  <AccessibleFormField
                    label="Experiência em Roteiro e Audiovisual"
                    id="Experiencia Roteiro"
                    videoSrc="/path-to-experiencia-roteiro-video.mp4"
                  >
                    <Controller
                      name="Experiência Roteiro"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Conte sobre sua experiência prévia em roteiro e projetos audiovisuais"
                        />
                      )}
                    />
                    {errors['Experiência Roteiro'] && (
                      <p className="text-red-500">
                        {errors['Experiência Roteiro'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Experiência em Núcleos Criativos"
                    id="Experiência Núcleos"
                    videoSrc="/path-to-experiencia-nucleos-video.mp4"
                  >
                    <Controller
                      name="Experiência Núcleos"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Conte sobre sua experiência com núcleos criativos, laboratórios de roteiros etc. O que gostou e o que não gostou?"
                        />
                      )}
                    />
                    {errors['Experiência Núcleos'] && (
                      <p className="text-red-500">
                        {errors['Experiência Núcleos'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Projetos Pessoais"
                    id="Projetos Pessoais"
                    videoSrc="/path-to-projetos-pessoais-video.mp4"
                  >
                    <Controller
                      name="Projetos Pessoais"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Descreva projetos pessoais que você tenha desenvolvido ou esteja interessado em desenvolver"
                        />
                      )}
                    />
                    {errors['Projetos Pessoais'] && (
                      <p className="text-red-500">
                        {errors['Projetos Pessoais'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Portfólio/Currículo lattes (Opcional)"
                    id="Portfolio/Currículo"
                    videoSrc="/path-to-portfolio-lattes-video.mp4"
                  >
                    <Controller
                      name="Portfolio/Currículo"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Insira o link para seu portfólio ou CV Lattes"
                        />
                      )}
                    />
                    {errors['Portfolio/Currículo'] && (
                      <p className="text-red-500">
                        {errors['Portfolio/Currículo'].message}
                      </p>
                    )}
                  </AccessibleFormField>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold italic">
                    RELAÇÃO COM PESQUISA CIENTÍFICA E ODS
                  </h3>

                  <AccessibleFormField
                    label="Experiência com Pesquisa Científica/Acadêmica"
                    id="Experiência Pesquisa"
                    videoSrc="/path-to-experiencia-pesquisa-video.mp4"
                  >
                    <Controller
                      name="Experiência Pesquisa"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Explique sua experiência ou envolvimento com pesquisa científica ou acadêmica"
                        />
                      )}
                    />
                    {errors['Experiência Pesquisa'] && (
                      <p className="text-red-500">
                        {errors['Experiência Pesquisa'].message}
                      </p>
                    )}
                  </AccessibleFormField>
                  {/* Checkbox lista ODS identificação */}
                  {/* <AccessibleFormField
                    label="Com qual/quais ODS você mais se identifica?"
                    id="ODS Identificação"
                    videoSrc="/path-to-ods-identificacao-video.mp4"
                  >
                    <Controller
                      name="ODS Identificação"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          {odsOptions.map((ods) => (
                            <div
                              key={ods}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`ods-identificacao-${ods}`}
                                checked={field.value.includes(ods)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, ods])
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (value) => value !== ods,
                                      ),
                                    )
                                  }
                                }}
                              />
                              <label htmlFor={`ods-identificacao-${ods}`}>
                                {ods}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    {errors['ODS Identificação'] && (
                      <p className="text-red-500">
                        {errors['ODS Identificação'].message}
                      </p>
                    )}
                  </AccessibleFormField> */}

                  {/* Textarea ODS identificação */}
                  <AccessibleFormField
                    label="Por que você se identifica com os ODS selecionados na etapa anterior?"
                    id="Identificação ODS Razão"
                    videoSrc="/path-to-identificacao-ods-razao-video.mp4"
                  >
                    <Controller
                      name="Identificação ODS Razão"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Explique por que você se identifica com os ODS selecionados na etapa anterior"
                        />
                      )}
                    />
                    {errors['Identificação ODS Razão'] && (
                      <p className="text-red-500">
                        {errors['Identificação ODS Razão'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  {/* Checkbox lista ODS projeto */}
                  {/* <AccessibleFormField
                    label="Com qual/quais ODS seus projetos mais se encaixam?"
                    id="ODS Projetos"
                    videoSrc="/path-to-ods-projetos-video.mp4"
                  >
                    <Controller
                      name="ODS Projetos"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          {odsOptions.map((ods) => (
                            <div
                              key={ods}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`ods-projetos-${ods}`}
                                checked={field.value.includes(ods)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, ods])
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (value) => value !== ods,
                                      ),
                                    )
                                  }
                                }}
                              />
                              <label htmlFor={`ods-projetos-${ods}`}>
                                {ods}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    {errors['ODS Projetos'] && (
                      <p className="text-red-500">
                        {errors['ODS Projetos'].message}
                      </p>
                    )}
                  </AccessibleFormField> */}

                  {/* Textarea ODS Projeto */}
                  <AccessibleFormField
                    label="Descreva como seus projetos se relacionam com os ODS selecionados na etapa anterior"
                    id="Projetos ODS Relação"
                    videoSrc="/path-to-projetos-ods-relacao-video.mp4"
                  >
                    <Controller
                      name="Projetos ODS Relação"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Explique como seus projetos se relacionam com os ODS selecionados na etapa anterior"
                        />
                      )}
                    />
                    {errors['Projetos ODS Relação'] && (
                      <p className="text-red-500">
                        {errors['Projetos ODS Relação'].message}
                      </p>
                    )}
                  </AccessibleFormField>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Inscrição'
                  )}
                </Button>
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 lg:sticky lg:top-[150px] lg:h-[calc(100vh-150px)] overflow-y-auto bg-transparent border border-black p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Informações sobre o Formulário - Etapa 2
            </h2>
            <p className="mb-4">
              Esta é a segunda etapa do processo de seleção para o Núcleo
              Criativo de Desenvolvimento de Propriedade Intelectual. Nesta
              fase, buscamos entender melhor sua experiência e relação com
              roteiro, audiovisual, pesquisa científica e os Objetivos de
              Desenvolvimento Sustentável (ODS).
            </p>
            <h3 className="text-xl font-semibold mb-2">Instruções:</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Certifique-se de usar o mesmo email utilizado na Etapa 1.</li>
              <li>Seja detalhado e específico em suas respostas.</li>
              <li>
                Reflita sobre como sua experiência e projetos se alinham com os
                ODS.
              </li>
              <li>
                Se tiver dúvidas, use os botões de vídeo para obter mais
                informações sobre cada campo.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Sobre os ODS:</h3>
            <p className="mb-4">
              Os Objetivos de Desenvolvimento Sustentável (ODS) são uma coleção
              de 17 metas globais estabelecidas pela Assembleia Geral das Nações
              Unidas. Eles abordam os desafios globais que enfrentamos,
              incluindo pobreza, desigualdade, mudança climática, degradação
              ambiental, paz e justiça.
            </p>
            <h3 className="text-xl font-semibold mb-2">Próximos Passos:</h3>
            <p className="mb-4">
              Após o envio deste formulário, sua inscrição completa (Etapa 1 e
              2) será analisada por nossa equipe. Os candidatos selecionados
              serão contatados para as próximas fases do processo.
            </p>
            <h3 className="text-xl font-semibold mb-2">Lembre-se:</h3>

            <p>
              Quaisquer dúvidas sobre o processo podem ser enviadas ao e-mail:{' '}
              <a
                href="mailto:contato@papoulahub.com"
                className="font-bold underline text-sky-500 tracking-wide"
              >
                contato@papoulahub.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

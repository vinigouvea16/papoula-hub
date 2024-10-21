'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast, Toaster } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import { Textarea } from './ui/textarea'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  Email: z.string().email({ message: 'Email inválido' }),
  'Nome Social': z.string().min(1, { message: 'Nome social é obrigatório' }),
  'Tipo de Roteirista': z.enum(['Individual', 'Coletivo'], {
    required_error: 'Selecione o tipo de roteirista',
  }),
  'Ano de Nascimento': z.number().min(1900).max(new Date().getFullYear()),
  'Raça/Etnia': z.enum([
    'Branco',
    'Preto',
    'Pardo',
    'Indígena',
    'Amarelo',
    'Outro',
  ]),
  'Raça/Etnia (Especifique)': z.string().optional(),
  'Gênero e Orientação Sexual': z.enum(
    [
      'homem_cis_hetero',
      'mulher_cis_hetero',
      'homem_cis_lgbtqia',
      'mulher_cis_lgbtqia',
      'homem_trans_hetero',
      'mulher_trans_hetero',
      'homem_trans_lgbtqia',
      'mulher_trans_lgbtqia',
      'nao_binario',
      'outro',
    ],
    { required_error: 'Selecione uma opção de gênero e orientação sexual' },
  ),
  'Gênero e Orientação Sexual (Especifique)': z.string().optional(),
  PCD: z.enum(['Sim', 'Não']),
  'Recursos A11y': z.string().optional(),
  Região: z.enum(
    [
      'Norte',
      'Noroeste',
      'Oeste',
      'Sudoeste',
      'Centro-Sul',
      'Centro-Oriental',
      'Centro-Ocidental',
      'Metropolitana-de-Curitiba',
      'Sudeste',
      'Nao-mora',
    ],
    { required_error: 'Selecione uma região' },
  ),
  Formação: z.enum(
    [
      'Graduação em curso',
      'Graduação completa',
      'Pós Graduação em curso',
      'Pós Graduação completa',
      'Cursos Livres na área do audiovisual',
      '+ 5 Anos de experiência com escrita ou audiovisual',
      'Não tenho nenhuma formação, nem experiência na área',
    ],
    { required_error: 'Selecione uma opção de formação' },
  ),
  'Nível de Experiência': z.enum([
    'Iniciante',
    'Não Iniciante',
    'Experiente',
    'Outras funções no audiovisual',
  ]),
  'ODS Identificação': z
    .array(z.string())
    .min(1, { message: 'Selecione pelo menos um ODS' }),
  'ODS Projetos': z
    .array(z.string())
    .min(1, { message: 'Selecione pelo menos um ODS' }),
  'Motivação Para Participar': z
    .array(z.string())
    .min(1, { message: 'Selecione pelo menos uma motivação' }),
  'Motivação (Outro)': z.string().optional(),
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
    <div className="flex items-center space-x-2">
      <Label htmlFor={id} className="text-base">
        {label}
      </Label>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="icon">
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

export default function TwoColumnApplicationFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cooldownTime, setCooldownTime] = useState(0)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: '',
      'Nome Social': '',
      'Tipo de Roteirista': undefined,
      'Ano de Nascimento': undefined,
      'Raça/Etnia': undefined,
      'Raça/Etnia (Especifique)': '',
      'Gênero e Orientação Sexual': undefined,
      'Gênero e Orientação Sexual (Especifique)': '',
      PCD: undefined,
      'Recursos A11y': '',
      Região: undefined,
      Formação: undefined,
      'Nível de Experiência': undefined,
      'ODS Identificação': [],
      'ODS Projetos': [],
      'Motivação Para Participar': [],
      'Motivação (Outro)': '',
    },
  })

  const racaEtnia = watch('Raça/Etnia')
  const generoOrientacao = watch('Gênero e Orientação Sexual')

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldownTime])

  type GenderType =
    | 'homem_cis_hetero'
    | 'mulher_cis_hetero'
    | 'homem_cis_lgbtqia'
    | 'mulher_cis_lgbtqia'
    | 'homem_trans_hetero'
    | 'mulher_trans_hetero'
    | 'homem_trans_lgbtqia'
    | 'mulher_trans_lgbtqia'
    | 'nao_binario'
    | 'outro'

  const mapGenderToAirtable = (gender: GenderType): string => {
    const mapping: Record<GenderType, string> = {
      homem_cis_hetero: 'Homem Cisgênero Heterossexual',
      mulher_cis_hetero: 'Mulher Cisgênero Heterossexual',
      homem_cis_lgbtqia: 'Homem Cisgênero LGBTQIA+',
      mulher_cis_lgbtqia: 'Mulher Cisgênero LGBTQIA+',
      homem_trans_hetero: 'Homem Trans Heterossexual',
      mulher_trans_hetero: 'Mulher Trans Heterossexual',
      homem_trans_lgbtqia: 'Homem Trans LGBTQIA+',
      mulher_trans_lgbtqia: 'Mulher Trans LGBTQIA+',
      nao_binario: 'Não Binário',
      outro: 'Outro',
    }

    return mapping[gender] || gender
  }

  type Region =
    | 'Norte'
    | 'Noroeste'
    | 'Oeste'
    | 'Sudoeste'
    | 'Centro-Sul'
    | 'Centro-Oriental'
    | 'Metropolitana-de-Curitiba'
    | 'Centro-Ocidental'
    | 'Sudeste'
    | 'Nao-mora'

  const mapRegionToAirtable = (region: Region): string => {
    const mapping: Record<Region, string> = {
      Norte: 'Norte',
      Noroeste: 'Noroeste',
      Oeste: 'Oeste',
      Sudoeste: 'Sudoeste',
      'Centro-Sul': 'Centro-Sul',
      'Centro-Oriental': 'Centro-Oriental',
      'Metropolitana-de-Curitiba': 'Metropolitana de Curitiba',
      'Centro-Ocidental': 'Centro-Ocidental',
      Sudeste: 'Sudeste',
      'Nao-mora': 'Não moro no Paraná (eliminatória)',
    }
    return mapping[region] || region
  }

  const onSubmit = async (data: FormData & { Região: Region }) => {
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
    const mappedData = {
      ...data,
      'Gênero e Orientação Sexual': mapGenderToAirtable(
        data['Gênero e Orientação Sexual'],
      ),
      Região: mapRegionToAirtable(data['Região']),
    }

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields: mappedData }] }),
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
        const errorData = await response.json()
        console.error('Erro do servidor:', errorData)
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

  const odsOptions = [
    'Erradicação da Pobreza',
    'Fome Zero e Agricultura Sustentável',
    'Saúde e Bem-Estar',
    'Educação de Qualidade',
    'Igualdade de Gênero',
    'Água Potável e Saneamento',
    'Energia Limpa e Acessível',
    'Trabalho Decente e Crescimento Econômico',
    'Indústria, Inovação e Infraestrutura',
    'Redução das Desigualdades',
    'Cidades e Comunidades Sustentáveis',
    'Consumo e Produção Responsáveis',
    'Ação Contra a Mudança Global do Clima',
    'Vida na Água',
    'Vida Terrestre',
    'Paz, Justiça e Instituições Eficazes',
    'Parcerias e Meios de Implementação',
  ]

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
      <div className="mx-auto px-4 py-8 md:w-[80%]">
        <h1 className="text-4xl font-bold text-center mb-8">
          Núcleo Criativo para Desenvolvimento de Propriedade Intelectual
        </h1>
        <div className="flex flex-col gap-8">
          <div className="lg:w-full">
            {/* <div className="space-y-4 mb-8">
              <h2 className="text-4xl font-bold pt-2">
                Projeto -{' '}
                <span className="font-semibold">Histórias em pesquisa</span>
              </h2>
              <p>
                &ldquo;História em Pesquisa&ldquo; é a primeira edição do Núcleo
                de Desenvolvimento de Roteiros da PAPOULA. Esse projeto é
                realizado em parceria com a PPG-ARTES da Universidade Estadual
                do Paraná (UNESPAR), e viabilizado pela Lei Paulo Gustavo.
              </p>
            </div> */}
            <div className="flex items-center pb-4">
              {/* <div className=""> */}
              <Link href="/" className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  fill="#000000"
                  className="md:w-[7vw] md:h-[7vw] lg:w-[4.5vw] lg:h-[4.5vw] xl:w-[4vw] xl:h-[4vw] transform transition-transform duration-300 ease-in-out hover:scale-110 hover:fill-papoula-blue "
                  viewBox="0 0 256 256"
                >
                  <path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220ZM146.83,90.83,109.66,128l37.17,37.17a4,4,0,0,1-5.66,5.66l-40-40a4,4,0,0,1,0-5.66l40-40a4,4,0,1,1,5.66,5.66Z"></path>
                </svg>
              </Link>
              {/* </div> */}
              <h2 className="md:text-4xl text-3xl md:m-auto text-center font-semibold uppercase">
                História em pesquisa
              </h2>
            </div>
            <div
              className="space-y-4 pb-12 text-center lg:text-left"
              id="info-p"
            >
              <p>
                &ldquo;História em Pesquisa&ldquo; é a primeira edição do Núcleo
                de Desenvolvimento de Roteiros da PAPOULA. Esse projeto é
                realizado em parceria com a PPG-ARTES da Universidade Estadual
                do Paraná (UNESPAR), e viabilizado pela Lei Paulo Gustavo.
              </p>

              <p>
                O formulário a seguir é parte do processo seletivo dos autores
                participantes do núcleo. Serão selecionados 4 roteiristas,
                autores, pesquisadores e/ou interessados na criação de conteúdo,
                para participar dessa edição do &ldquo;História em
                Pesquisa&ldquo;.
              </p>

              <p>
                O objetivo do núcleo é desenvolver 4 roteiros baseados em
                pesquisas realizadas na UNESPAR. Cada autor selecionado será
                responsável pelo desenvolvimento de 1 roteiro, podendo ser um
                autor individual ou um coletivo. O núcleo tem duração de até 12
                meses e acontece por meio de encontros semanais de 1h30. A data
                e horário será acordada com os participantes selecionados.
              </p>

              <p>
                Os autores interessados precisam mostrar disponibilidade,
                engajamento e interesse em desenvolver histórias baseadas nas
                pesquisas escolhidas, com temáticas diversas e alinhadas com os
                Objetivos de Desenvolvimento Sustentável (ODS) da ONU. É preciso
                também estar disposto a desenvolver um roteiro enquanto
                contribui com o desenvolvimento do roteiro de terceiros.
              </p>

              <p>
                O processo de desenvolvimento vai contar com a consultoria
                acadêmica de Solange Stecz, para orientação sobre os processos
                de adaptação da pesquisa, uma consultoria especializada de
                roteiro com Ana Johann, para orientação sobre desenvolvimento de
                dramaturgia, e uma consultoria de negócios com Diogo Capriotti,
                para orientação sobre a criação de bíblia e venda do projeto. Já
                os encontros semanais serão mediados pela produtora Paula
                Navarro, que vai auxiliar nos caminhos de adaptação e
                viabilização das histórias.
              </p>

              <p>
                Os autores selecionados receberão, além das consultorias,
                materiais de estudo necessários e pertinentes para o
                desenvolvimento do projeto e uma recompensa de R$6.000, dividida
                em quatro etapas e dependente das entregas necessárias em cada
                etapa
              </p>

              <p>
                A inscrição é aberta a todos os interessados, experientes ou não
                na área, que morem em cidades do Paraná.
              </p>

              <p>
                O núcleo encoraja a inscrição de pessoas diversas e se
                compromete a acomodar diferentes necessidades para participação.
              </p>

              <p>
                Dúvidas sobre o processo podem ser enviadas ao e-mail:{' '}
                <a
                  href="mailto:contato@papoulahub.com"
                  className="font-bold underline text-sky-500 tracking-wide"
                >
                  contato@papoulahub.com
                </a>
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6 pb-10 relative">
                <div className="">
                  <h2 className="text-4xl font-bold pt-2">
                    Formulário de Inscrição
                  </h2>
                  <p>Seleção de Roteiristas para o Núcleo de Desenvolvimento</p>
                </div>
                <div className="absolute right-4 top-10 z-10">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M73.3613 19.8385C84.3297 13.3665 97.5498 11.9588 109.607 15.9788V15.9788C113.503 17.2781 117.568 18.0237 121.674 18.1933V18.1933C134.36 18.7175 146.258 24.7712 154.193 34.6693V34.6693C156.766 37.8788 159.798 40.7393 163.155 43.1158V43.1158C173.543 50.4697 180.292 62.0252 181.651 74.6969V74.6969C182.092 78.806 183.107 82.8674 184.653 86.6967V86.6967C189.434 98.5342 188.924 111.911 183.241 123.37V123.37C181.405 127.071 180.084 131.043 179.33 135.103V135.103C177.005 147.615 169.384 158.648 158.466 165.195V165.195C154.935 167.313 151.699 169.929 148.885 172.937V172.937C140.195 182.228 127.883 187.353 115.191 186.919V186.919C111.081 186.779 106.969 187.216 102.978 188.22V188.22C90.6522 191.318 77.5572 188.898 67.1509 181.641V181.641C63.7814 179.291 60.0793 177.414 56.1904 176.086V176.086C44.1677 171.982 34.4485 162.796 29.6073 151.046V151.046C28.0367 147.234 25.929 143.627 23.3742 140.394V140.394C15.4634 130.382 12.2199 117.405 14.4667 104.82V104.82C15.1936 100.748 15.3527 96.5617 14.9406 92.4495V92.4495C13.67 79.7684 17.9002 67.0437 26.5519 57.6624V57.6624C29.3479 54.6306 31.7262 51.194 33.5844 47.5126V47.5126C39.3148 36.1593 49.7105 27.7316 62.0118 24.5467V24.5467C65.994 23.5156 69.8163 21.9303 73.3613 19.8385V19.8385Z"
                      fill="black"
                    />
                    <ellipse
                      cx="99.8354"
                      cy="101.766"
                      rx="8.43237"
                      ry="8.86528"
                      fill="#D7DADB"
                    />
                    <rect
                      width="34.4442"
                      height="52.4865"
                      rx="17.2221"
                      transform="matrix(0.702469 0.711715 -0.702469 0.711715 141.309 32.9185)"
                      fill="#D7DADB"
                    />
                    <path
                      d="M95.0161 54.1335C100.274 62.0315 98.1862 72.7739 90.3525 78.1273V78.1273C82.5188 83.4808 71.9059 81.418 66.6478 73.52L56.5314 58.3244C51.2733 50.4264 53.3613 39.684 61.195 34.3305V34.3305C69.0286 28.9771 79.6416 31.0399 84.8997 38.9379L95.0161 54.1335Z"
                      fill="#D7DADB"
                    />
                    <rect
                      width="34.66"
                      height="52.1556"
                      rx="17.33"
                      transform="matrix(-0.137399 -0.990516 0.990014 -0.140969 28.9607 131.382)"
                      fill="#D7DADB"
                    />
                    <path
                      d="M129.32 135.122C120.758 130.892 117.176 120.487 121.318 111.882V111.882C125.46 103.277 135.759 99.7315 144.32 103.962L160.181 111.8C168.743 116.031 172.325 126.436 168.183 135.04V135.04C164.041 143.645 153.743 147.191 145.181 142.96L129.32 135.122Z"
                      fill="#D7DADB"
                    />
                    <path
                      d="M109.214 148.26L107.295 166.758C106.348 175.884 98.1853 182.494 89.0625 181.522C79.9397 180.551 73.3117 172.366 74.2583 163.24L76.1773 144.742C77.124 135.617 85.2869 129.007 94.4096 129.978C103.532 130.949 110.16 139.135 109.214 148.26Z"
                      fill="#D7DADB"
                      stroke="#D7DADB"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold">
                  ETAPA 1 (CLASSIFICATÓRIA)
                </h3>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    INFORMAÇÕES PESSOAIS
                  </h3>

                  <AccessibleFormField
                    label="Email"
                    id="Email"
                    videoSrc="/videos/form1/email.mp4"
                  >
                    <Controller
                      name="Email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Insira o melhor email para falar com você"
                        />
                      )}
                    />
                    {errors.Email && (
                      <p className="text-red-500">{errors.Email.message}</p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Nome Social"
                    id="Nome Social"
                    videoSrc="/videos/form1/nomeSocial.mp4"
                  >
                    <Controller
                      name="Nome Social"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Seu Nome" />
                      )}
                    />
                    {errors['Nome Social'] && (
                      <p className="text-red-500">
                        {errors['Nome Social'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Tipo de Roteirista"
                    id="Tipo de Roteirista"
                    videoSrc="/videos/form1/roteirista.mp4"
                  >
                    <Controller
                      name="Tipo de Roteirista"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Individual"
                              id="individual"
                            />
                            <Label htmlFor="individual">Individual</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Coletivo" id="coletivo" />
                            <Label htmlFor="coletivo">Coletivo</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors['Tipo de Roteirista'] && (
                      <p className="text-red-500">
                        {errors['Tipo de Roteirista'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Ano de Nascimento"
                    id="Ano de Nascimento"
                    videoSrc="/videos/form1/idade.mp4"
                  >
                    <Controller
                      name="Ano de Nascimento"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Indique o ano em que nasceu"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      )}
                    />
                    {errors['Ano de Nascimento'] && (
                      <p className="text-red-500">
                        {errors['Ano de Nascimento'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Raça/Etnia"
                    id="Raça/Etnia"
                    videoSrc="/videos/form1/raca.mp4"
                  >
                    <Controller
                      name="Raça/Etnia"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Branco">Branco</SelectItem>
                            <SelectItem value="Preto">Preto</SelectItem>
                            <SelectItem value="Pardo">Pardo</SelectItem>
                            <SelectItem value="Indígena">Indígena</SelectItem>
                            <SelectItem value="Amarelo">Amarelo</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors['Raça/Etnia'] && (
                      <p className="text-red-500">
                        {errors['Raça/Etnia'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  {racaEtnia === 'Outro' && (
                    <AccessibleFormField
                      label="Especifique Raça/Etnia"
                      id="Raça/Etnia (Especifique)"
                      videoSrc="/videos/form1/raca.mp4"
                    >
                      <Controller
                        name="Raça/Etnia (Especifique)"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Especifique" />
                        )}
                      />
                      {errors['Raça/Etnia (Especifique)'] && (
                        <p className="text-red-500">
                          {errors['Raça/Etnia (Especifique)'].message}
                        </p>
                      )}
                    </AccessibleFormField>
                  )}

                  <AccessibleFormField
                    label="Gênero e Orientação Sexual"
                    id="Gênero e Orientação Sexual"
                    videoSrc="/videos/form1/genero.mp4"
                  >
                    <Controller
                      name="Gênero e Orientação Sexual"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha a opção de gênero e orientação sexual com que se identifica" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="homem_cis_hetero">
                              Homem Cisgênero Heterossexual
                            </SelectItem>
                            <SelectItem value="mulher_cis_hetero">
                              Mulher Cisgênero Heterossexual
                            </SelectItem>
                            <SelectItem value="homem_cis_lgbtqia">
                              Homem Cisgênero LGBTQIA+
                            </SelectItem>
                            <SelectItem value="mulher_cis_lgbtqia">
                              Mulher Cisgênero LGBTQIA+
                            </SelectItem>
                            <SelectItem value="homem_trans_hetero">
                              Homem Transgênero Heterossexual
                            </SelectItem>
                            <SelectItem value="mulher_trans_hetero">
                              Mulher Transgênero Heterossexual
                            </SelectItem>
                            <SelectItem value="homem_trans_lgbtqia">
                              Homem Transgênero LGBTQIA+
                            </SelectItem>
                            <SelectItem value="mulher_trans_lgbtqia">
                              Mulher Transgênero LGBTQIA+
                            </SelectItem>
                            <SelectItem value="nao_binario">
                              Não-binário
                            </SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors['Gênero e Orientação Sexual'] && (
                      <p className="text-red-500">
                        {errors['Gênero e Orientação Sexual'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  {generoOrientacao === 'outro' && (
                    <AccessibleFormField
                      label="Especifique Gênero e Orientação Sexual"
                      id="Gênero e Orientação Sexual (Especifique)"
                      videoSrc="/videos/form1/genero.mp4"
                    >
                      <Controller
                        name="Gênero e Orientação Sexual (Especifique)"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Especifique" />
                        )}
                      />
                      {errors['Gênero e Orientação Sexual (Especifique)'] && (
                        <p className="text-red-500">
                          {
                            errors['Gênero e Orientação Sexual (Especifique)']
                              .message
                          }
                        </p>
                      )}
                    </AccessibleFormField>
                  )}

                  <AccessibleFormField
                    label="Pessoa com Deficiência (PCD)"
                    id="PCD"
                    videoSrc="/videos/form1/pcd.mp4"
                  >
                    <Controller
                      name="PCD"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Sim" id="pcd-sim" />
                            <Label htmlFor="pcd-sim">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Não" id="pcd-nao" />
                            <Label htmlFor="pcd-nao">Não</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors.PCD && (
                      <p className="text-red-500">{errors.PCD.message}</p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Recursos de Acessibilidade"
                    id="Recursos A11y"
                    videoSrc="/videos/form1/recursoa11y.mp4"
                  >
                    <Controller
                      name="Recursos A11y"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Que tipo de recurso de acessibilidade você precisaria para viabilizar sua participação no núcleo?"
                        />
                      )}
                    />
                    {errors['Recursos A11y'] && (
                      <p className="text-red-500">
                        {errors['Recursos A11y'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Região"
                    id="Região"
                    videoSrc="/videos/form1/regiao.mp4"
                  >
                    <Controller
                      name="Região"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Norte">Norte</SelectItem>
                            <SelectItem value="Noroeste">Noroeste</SelectItem>
                            <SelectItem value="Oeste">Oeste</SelectItem>
                            <SelectItem value="Sudoeste">Sudoeste</SelectItem>
                            <SelectItem value="Centro-Sul">
                              Centro-Sul
                            </SelectItem>
                            <SelectItem value="Centro-Oriental">
                              Centro-Oriental
                            </SelectItem>
                            <SelectItem value="Metropolitana-de-Curitiba">
                              Metropolitana de Curitiba
                            </SelectItem>
                            <SelectItem value="Centro-Ocidental">
                              Centro-Ocidental
                            </SelectItem>
                            <SelectItem value="Sudeste">Sudeste</SelectItem>
                            <SelectItem value="Nao-mora">
                              Não moro no Paraná (eliminatória)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.Região && (
                      <p className="text-red-500">{errors.Região.message}</p>
                    )}
                  </AccessibleFormField>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    EXPERIÊNCIA NO AUDIOVISUAL
                  </h3>

                  <AccessibleFormField
                    label="Nível de Experiência"
                    id="Nível de Experiência"
                    videoSrc="/videos/form1/audiovisual.mp4"
                  >
                    <Controller
                      name="Nível de Experiência"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione seu nível de experiência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Iniciante">
                              Roteirista Iniciante (nenhum roteiro escrito)
                            </SelectItem>
                            <SelectItem value="Não Iniciante">
                              Roteirista Não Iniciante (com pelo menos um
                              roteiro escrito)
                            </SelectItem>
                            <SelectItem value="Experiente">
                              Roteirista Experiente (com pelo menos um roteiro
                              produzido)
                            </SelectItem>
                            <SelectItem value="Outras funções no audiovisual">
                              Outras Funções no Audiovisual
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors['Nível de Experiência'] && (
                      <p className="text-red-500">
                        {errors['Nível de Experiência'].message}
                      </p>
                    )}
                  </AccessibleFormField>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">FORMAÇÃO</h3>

                  <AccessibleFormField
                    label="Formação"
                    id="Formação"
                    videoSrc="/videos/form1/formacao.mp4"
                  >
                    <Controller
                      name="Formação"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione sua formação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Graduação em curso">
                              Graduação em curso
                            </SelectItem>
                            <SelectItem value="Graduação completa">
                              Graduação completa
                            </SelectItem>
                            <SelectItem value="Pós Graduação em curso">
                              Pós Graduação em curso
                            </SelectItem>
                            <SelectItem value="Pós Graduação completa">
                              Pós Graduação completa
                            </SelectItem>
                            <SelectItem value="Cursos Livres na área do audiovisual">
                              Cursos Livres na area do audiovisual
                            </SelectItem>
                            <SelectItem value="+ 5 Anos de experiência com escrita ou audiovisual">
                              + 5 Anos de experiencia com escrita ou audiovisual
                            </SelectItem>
                            <SelectItem value="Não tenho nenhuma formação, nem experiência na área">
                              Não tenho nenhuma formação, nem experiência na
                              área
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.Formação && (
                      <p className="text-red-500">{errors.Formação.message}</p>
                    )}
                  </AccessibleFormField>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">INTERESSE EM ODS</h3>

                  <AccessibleFormField
                    label="Com qual/quais ODS você mais se identifica?"
                    id="ODS Identificação"
                    videoSrc="/videos/form1/interesseODS.mp4"
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
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Com qual/quais ODS seus projetos mais se encaixam?"
                    id="ODS Projetos"
                    videoSrc="/videos/form1/projetosODS.mp4"
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
                  </AccessibleFormField>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">INTERESSE NO NÚCLEO</h3>

                  <AccessibleFormField
                    label="Motivação Para Participar"
                    id="Motivação Para Participar"
                    videoSrc="/videos/form1/interesseNucleo.mp4"
                  >
                    <Controller
                      name="Motivação Para Participar"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          {[
                            'Tenho curiosidade em saber como funciona um núcleo de desenvolvimento de roteiro.',
                            'Quero aprimorar minhas habilidades de escrita e pesquisa dentro do núcleo.',
                            'Conhecer pessoas do meio.',
                            'Já participei de outro(s) núcleo(s) anteriormente e adoro o processo de desenvolvimento.',
                          ].map((option) => (
                            <div
                              key={option}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`motivacao-${option}`}
                                checked={field.value.includes(option)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, option])
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (value) => value !== option,
                                      ),
                                    )
                                  }
                                }}
                              />
                              <label htmlFor={`motivacao-${option}`}>
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    {errors['Motivação Para Participar'] && (
                      <p className="text-red-500">
                        {errors['Motivação Para Participar'].message}
                      </p>
                    )}
                  </AccessibleFormField>

                  <AccessibleFormField
                    label="Outros motivos"
                    id="Motivação (Outro)"
                    videoSrc="/videos/form1/interesseNucleo.mp4"
                  >
                    <Controller
                      name="Motivação (Outro)"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Outros motivos" />
                      )}
                    />
                    {errors['Motivação (Outro)'] && (
                      <p className="text-red-500">
                        {errors['Motivação (Outro)'].message}
                      </p>
                    )}
                  </AccessibleFormField>
                </div>

                <Button type="submit" disabled>
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
        </div>
      </div>
    </>
  )
}

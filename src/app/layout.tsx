import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import localFont from 'next/font/local'

const MaxiRound = localFont({
  src: [
    {
      path: '../../public/fonts/ABCMaxiRound-Light-Trial.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ABCMaxiRound-Regular-Trial.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ABCMaxiRound-Bold-Trial.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-maxiRound',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: 'PAPOULA HUB',
  description: 'The Storytelling Hub',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${raleway.variable} ${MaxiRound.variable} antialiased bg-papoula-text`}
      >
        {children}
      </body>
    </html>
  )
}

import { AuthProvider } from '@/context/auth-context'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import './globals.css'

const languages = ['en', 'pt-BR']

export const metadata: Metadata = {
  title: 'ProfitHub',
  description: 'Arbitration in realtime',
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export const dynamic = 'force-dynamic'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bai-jamjuree',
})

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: {
    lng: string
  }
}) {
  const locale = await getLocale()
  const t = await getTranslations(lng)

  const textSignIn = {
    email: t('TextLang.email'),
    password: t('TextLang.password'),
    forgotYourPassword: t('TextLang.forgotYourPassword'),
    signIn: t('TextLang.signIn'),
    dontHaveAnAccount: t('TextLang.dontHaveAnAccount'),
    signUp: t('TextLang.signUp'),
  }

  const textNotFound = {
    somethingsMissing: t('TextLang.somethingsMissing'),
    sorryThePageYouAreLookingForDoesntExistOrHasBeenMoved: t(
      'TextLang.sorryThePageYouAreLookingForDoesntExistOrHasBeenMoved',
    ),
    goBackToHome: t('TextLang.goBackToHome'),
  }

  const layoutValue = { textSignIn, textNotFound, locale }

  return (
    <html lang={lng}>
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} antialiased bg-global text-white font-sans`}
      >
        <AuthProvider value={layoutValue}>{children}</AuthProvider>
      </body>
    </html>
  )
}

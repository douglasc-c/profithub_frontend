import { Roboto_Flex as Roboto } from 'next/font/google'
// import type { Metadata } from 'next'
import {
  getLocale,
  getTranslations,
  // unstable_setRequestLocale,
} from 'next-intl/server'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const languages = ['en', 'pt-BR']

// export const metadata: Metadata = {
//   title: 'ProftCloud',
// }

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

// export async function generateMetadata({
//   params: { lng },
// }: {
//   params: { lng: string }
// }) {
//   unstable_setRequestLocale(lng)
// }
export const dynamic = 'force-dynamic'
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
  // unstable_setRequestLocale(lng)

  const textSignIn = {
    email: t('Signin.email'),
    password: t('Signin.password'),
    forgotYourPassword: t('Signin.forgotYourPassword'),
    signIn: t('Signin.signIn'),
    dontHaveAnAccount: t('Signin.dontHaveAnAccount'),
    signUp: t('Signin.signUp'),
  }

  const layoutValue = { textSignIn, locale }

  return (
    <html lang={lng}>
      <body className={`${roboto.className} bg-global text-white`}>
        <AuthProvider value={layoutValue}>{children}</AuthProvider>
      </body>
    </html>
  )
}

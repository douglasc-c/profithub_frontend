import { Roboto_Flex as Roboto } from 'next/font/google'
import { getLocale, getTranslations } from 'next-intl/server'
import './globals.css'
import { LayoutProvider } from '@/context/layout-context'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const languages = ['en', 'es', 'pt-BR']

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

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
  const t = await getTranslations()

  const textOpportunity = {
    buy: t('Opportunity.buy'),
    sell: t('Opportunity.sell'),
    spread: t('Opportunity.spread'),
    fee: t('Opportunity.fee'),
    orderBook: t('Opportunity.orderBook'),
    purchaseBook: t('Opportunity.purchaseBook'),
    salesBook: t('Opportunity.salesBook'),
    price: t('Opportunity.price'),
    volume: t('Opportunity.volume'),
    liquidity: t('Opportunity.liquidity'),
    cancel: t('Opportunity.cancel'),
  }

  const textSigIn = {
    email: t('Signin.email'),
    password: t('Signin.password'),
    forgotYourPassword: t('Signin.forgotYourPassword'),
    signIn: t('Signin.signIn'),
    dontHaveAnAccount: t('Signin.dontHaveAnAccount'),
    signUp: t('Signin.signUp'),
  }

  const layoutValue = { textOpportunity, textSigIn, locale }

  return (
    <html lang={lng}>
      <body
        className={`${roboto.className} bg-global bg-cover font-sans text-gray-100`}
      >
        <LayoutProvider value={layoutValue}>{children}</LayoutProvider>
      </body>
    </html>
  )
}

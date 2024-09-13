import '@/app/globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import { getLocale, getTranslations } from 'next-intl/server'
import Header from '@/components/header/header'
import { LayoutProvider, LayoutContextProps } from '@/context/layout-context'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const languages = ['en', 'pt-BR']
export const dynamic = 'force-dynamic'

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
  const t = await getTranslations(lng)

  const textHeader = {
    home: t('Header.home'),
    heatmap: t('Header.heatmap'),
    arbitration: t('Header.arbitration'),
    consulting: t('Header.consulting'),
    settings: t('Header.settings'),
  }

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

  const layoutValue: LayoutContextProps = { textOpportunity, locale }

  return (
    <html lang={lng}>
      <body className={`${roboto.className} bg-global text-white`}>
        <LayoutProvider value={layoutValue}>
          <Header text={textHeader} locale={locale} />
          {children}
        </LayoutProvider>
      </body>
    </html>
  )
}

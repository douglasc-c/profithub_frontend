import '@/app/globals.css'
import { getLocale, getTranslations } from 'next-intl/server'
import Header from '@/components/header/header'
import { LayoutProvider, LayoutContextProps } from '@/context/layout-context'

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
    home: t('TextLang.home'),
    heatmap: t('TextLang.heatmap'),
    arbitration: t('TextLang.arbitration'),
    consulting: t('TextLang.consulting'),
    settings: t('TextLang.settings'),
  }

  const textOpportunity = {
    buy: t('TextLang.buy'),
    sell: t('TextLang.sell'),
    spread: t('TextLang.spread'),
    fee: t('TextLang.fee'),
    withdrawValue: t('TextLang.withdrawalValue'),
    operationDetails: t('TextLang.operationDetails'),
    purchaseBook: t('TextLang.purchaseBook'),
    salesBook: t('TextLang.salesBook'),
    price: t('TextLang.price'),
    volume: t('TextLang.volume'),
    liquidity: t('TextLang.liquidity'),
    cancel: t('TextLang.cancel'),
    lastPrice: t('TextLang.lastPrice'),
  }

  const textFearGreedIndex = {
    fearGreedIndex: t('TextLang.fearGreedIndex'),
    fear: t('TextLang.fear'),
    neutral: t('TextLang.neutral'),
    greed: t('TextLang.greed'),
    extremeGreed: t('TextLang.extremeGreed'),
    lastUpdated: t('TextLang.lastUpdated'),
  }

  const textProfitCalculator = {
    profitCalculator: t('TextLang.profitCalculator'),
    buyValue: t('TextLang.buyValue'),
    sellValue: t('TextLang.sellValue'),
    volume: t('TextLang.volume'),
    fee: t('TextLang.fee'),
    withdrawalValue: t('TextLang.withdrawalValue'),
    results: t('TextLang.results'),
    actualSaleValue: t('TextLang.actualSaleValue'),
    profitPerCurrency: t('TextLang.profitPerCurrency'),
    grossProfit: t('TextLang.grossProfit'),
    netProfit: t('TextLang.netProfit'),
  }

  const textNetwork = {
    networks: t('TextLang.networks'),
    network: t('TextLang.network'),
    withdrawalValue: t('TextLang.withdrawalValue'),
    avaliableForWithdrawal: t('TextLang.avaliableForWithdrawal'),
    avaliableForDeposit: t('TextLang.avaliableForDeposit'),
    available: t('TextLang.avaliable'),
    notAvailable: t('TextLang.notAvaliable'),
  }

  const textHighestHighsLows = {
    highestHighs: t('TextLang.highestHighs'),
    highestLows: t('TextLang.highestLows'),
    rank: t('TextLang.rank'),
    name: t('TextLang.name'),
    symbol: t('TextLang.symbol'),
    price: t('TextLang.price'),
  }

  const layoutValue: LayoutContextProps = {
    textOpportunity,
    textFearGreedIndex,
    textProfitCalculator,
    textNetwork,
    textHighestHighsLows,
    locale,
  }

  return (
    <html lang={lng}>
      <body className="bg-global text-white">
        <Header text={textHeader} locale={locale} />
        <LayoutProvider value={layoutValue}>
          <div className="md:h-[80px] h-[50px]" />
          {children}
        </LayoutProvider>
      </body>
    </html>
  )
}

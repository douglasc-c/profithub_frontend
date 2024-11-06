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
    operationDetails: t('Opportunity.operationDetails'),
    purchaseBook: t('Opportunity.purchaseBook'),
    salesBook: t('Opportunity.salesBook'),
    price: t('Opportunity.price'),
    volume: t('Opportunity.volume'),
    liquidity: t('Opportunity.liquidity'),
    cancel: t('Opportunity.cancel'),
    lastPrice: t('Opportunity.lastPrice'),
  }

  const textFearGreedIndex = {
    fearGreedIndex: t('FearGreedIndex.fearGreedIndex'),
    fear: t('FearGreedIndex.fear'),
    neutral: t('FearGreedIndex.neutral'),
    greed: t('FearGreedIndex.greed'),
    extremeGreed: t('FearGreedIndex.extremeGreed'),
    lastUpdated: t('FearGreedIndex.lastUpdated'),
  }

  const textProfitCalculator = {
    profitCalculator: t('ProfitCalculator.profitCalculator'),
    buyValue: t('ProfitCalculator.buyValue'),
    sellValue: t('ProfitCalculator.sellValue'),
    volume: t('ProfitCalculator.volume'),
    fee: t('ProfitCalculator.fee'),
    withdrawalValue: t('ProfitCalculator.withdrawalValue'),
    results: t('ProfitCalculator.results'),
    actualSaleValue: t('ProfitCalculator.actualSaleValue'),
    profitPerCurrency: t('ProfitCalculator.profitPerCurrency'),
    grossProfit: t('ProfitCalculator.grossProfit'),
    netProfit: t('ProfitCalculator.netProfit'),
  }

  const textNetwork = {
    networks: t('Network.networks'),
    network: t('Network.network'),
    withdrawalFee: t('Network.withdrawalFee'),
    avaliableForWithdrawal: t('Network.avaliableForWithdrawal'),
    avaliableForDeposit: t('Network.avaliableForDeposit'),
    available: t('Network.avaliable'),
    notAvailable: t('Network.notAvaliable'),
  }

  const textHighestHighsLows = {
    highestHighs: t('Highest.highestHighs'),
    highestLows: t('Highest.highestLows'),
    rank: t('Highest.rank'),
    name: t('Highest.name'),
    symbol: t('Highest.symbol'),
    price: t('Highest.price'),
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
          <div className="h-20" />
          {children}
        </LayoutProvider>
      </body>
    </html>
  )
}

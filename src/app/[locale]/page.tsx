import { getLocale, getTranslations } from 'next-intl/server'

import Header from '@/components/header/header'
import Opportunity from '@/components/body/opportunity'

export default async function Home() {
  const locale = await getLocale()
  const t = await getTranslations()

  const textHeader = {
    home: t('Header.home'),
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

  return (
    <main className="min-h-screen flex flex-col">
      <Header text={textHeader} locale={locale} />
      <Opportunity text={textOpportunity} />
    </main>
  )
}

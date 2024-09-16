'use client'

import CoinsPriceMarquee from '@/components/widgets/coins-price-marquee'
import CombineWidgets from '@/components/widgets/combine-widgets'

export default function Dashboard() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="mt-28">
        <CoinsPriceMarquee />
      </div>
      <div className="px-5">
        <CombineWidgets />
      </div>
    </main>
  )
}

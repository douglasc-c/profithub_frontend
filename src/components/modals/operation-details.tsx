'use client'
import { useLayoutContext } from '@/context/layout-context'
import { useEffect, useState } from 'react'
import { Networks } from '../cards/networks'
import { OrderBook } from '../cards/order-book'
import ProfitCalculator from '../widgets/profit-calculator'

interface Order {
  price: string
  volume: string
  liquidity: string
}

interface OrderBookData {
  asks: Order[]
  bids: Order[]
}

interface Network {
  exchange: string
  network: string
  symbol: string
  withdrawFee: string
}

interface Opportunity {
  svgIcon?: string
  coinName: string
  symbol: string
  spreadPercent: number
  withdrawFee: number
  network: string
  buyPrice: number
  sellPrice: number
  exchangeBuy: string
  exchangeSell: string
  buyOrderbook: OrderBookData
  sellOrderbook: OrderBookData
  allNetworksBuy: Network[]
  allNetworksSell: Network[]
}

interface OpportunityProps {
  isOpen: boolean
  onClose: () => void
  symbol: string
  opportunity: Opportunity | null
}

export function OperationDetails({
  isOpen,
  onClose,
  symbol,
  opportunity,
}: OpportunityProps) {
  const { textOpportunity } = useLayoutContext()
  const [localData, setLocalData] = useState<Opportunity | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    if (opportunity && opportunity.symbol === symbol) {
      setLocalData(opportunity)
    }
  }, [symbol, opportunity])

  if (!isOpen || !localData) return null

  const adjustSvgSize = (svgContent: string, width: string, height: string) => {
    return svgContent
      .replace(/width="[^"]*"/, `width="${width}"`)
      .replace(/height="[^"]*"/, `height="${height}"`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-stone-950 rounded-xl border border-stone-800 w-full h-full max-h-screen overflow-hidden px-4 md:px-10 ">
        <section className="py-4">
          <header className="flex  justify-between items-center px-10 ">
            <section className="flex items-center space-x-4">
              <div
                className="flex items-center"
                dangerouslySetInnerHTML={{
                  __html: adjustSvgSize(localData.svgIcon, '50px', '50px'),
                }}
                aria-label="coin-icon"
              />
              <div className="flex flex-row items-center">
                <p className="font-semibold text-2xl">{localData.coinName}</p>
                <p className="font-semibold text-2xl ml-2">({symbol})</p>
              </div>

              <section className="flex flex-row items-center space-x-5">
                <p className="text-base">
                  {textOpportunity.spread}: {localData.spreadPercent}%
                </p>
                <p className="text-base">
                  {textOpportunity.fee}: 0.60% + $ {localData.withdrawFee}
                </p>
              </section>
            </section>
            <button
              className="bg-red-500 text-white rounded-md h-fit py-1 px-3 text-[1rem]"
              onClick={onClose}
            >
              {textOpportunity.cancel}
            </button>
          </header>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Networks
            networksBuy={localData?.allNetworksBuy}
            networksSell={localData?.allNetworksSell}
          />
          <ProfitCalculator />
        </section>

        <section className="flex flex-row gap-6 h-[calc(100%-300px)]">
          <div className="w-1/2 overflow-y-auto h-full">
            <OrderBook
              title={textOpportunity.purchaseBook}
              orders={localData.buyOrderbook.asks}
              lastPrice={localData.buyPrice}
              exchangeIcon={`/images/exchanges/${localData.exchangeBuy}.svg`}
              isBuy={true}
            />
          </div>
          <div className="w-1/2 overflow-y-auto h-full">
            <OrderBook
              title={textOpportunity.salesBook}
              orders={localData.sellOrderbook.bids}
              lastPrice={localData.sellPrice}
              exchangeIcon={`/images/exchanges/${localData.exchangeSell}.svg`}
              isBuy={false}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

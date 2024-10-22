'use client'
import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Networks } from '../cards/networks'
import { OrderBook } from '../cards/order-book'
import ProfitCalculator from '../widgets/profit-calculator'

interface Order {
  price: string
  volume: string
  liquidity: string
}

interface OrderBook {
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
  svgIcon: string
  coinName: string
  symbol: string
  spreadPercent: number
  withdrawFee: number
  network: string
  exchangeBuy: string
  exchangeSell: string
  buyOrderbook: OrderBook
  sellOrderbook: OrderBook
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
    <div className="fixed inset-0 flex justify-center items-center z-50 ">
      <div className="bg-stone-950 rounded-xl border w-full border-stone-800 px-10 h-full p">
        <div className="flex justify-between py-4">
          <div className="flex flex-row items-center space-x-5">
            <div className="flex flex-row items-center">
              <div
                className="py-4"
                dangerouslySetInnerHTML={{
                  __html: adjustSvgSize(localData.svgIcon, '20px', '20px'),
                }}
                aria-label="coin-icon"
                style={{
                  display: 'block',
                  width: '20px',
                  height: '20px',
                  objectFit: 'contain',
                }}
              />
              <Image
                src={`/images/svg/coin.svg`}
                alt="mercadobitcoin"
                height={50}
                width={50}
              />
              <p className="font-semibold text-2xl ml-2 ">
                {localData.coinName}{' '}
              </p>
              <p className="font-semibold text-2xl ml-2">
                ({localData.symbol})
              </p>
            </div>
            <p>
              {textOpportunity.spread}: {localData.spreadPercent}%
            </p>
            <p>
              {textOpportunity.fee}: 0.60% + $ {localData.withdrawFee}
            </p>
          </div>
          <div className="flex flex-row py-2 items-center justify-end">
            <button
              className="items-center justify-center flex bg-red-500 w-full p-1 px-3 rounded-md"
              onClick={onClose}
            >
              <a className="text-sm">{textOpportunity.cancel}</a>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Networks
            networksBuy={localData?.allNetworksBuy}
            networksSell={localData?.allNetworksSell}
          />
          <ProfitCalculator />

          <OrderBook
            title={textOpportunity.purchaseBook}
            orders={localData.buyOrderbook.bids}
            exchangeIcon={`/images/exchanges/${localData.exchangeBuy}.svg`}
            isBuy={true}
          />

          <OrderBook
            title={textOpportunity.salesBook}
            orders={localData.sellOrderbook.asks}
            exchangeIcon={`/images/exchanges/${localData.exchangeSell}.svg`}
            isBuy={false}
          />
        </div>
      </div>
    </div>
  )
}

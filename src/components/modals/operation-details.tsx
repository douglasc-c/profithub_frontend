'use client'
import { useLayoutContext } from '@/context/layout-context'
import { useEffect, useState } from 'react'
import { Networks } from '../cards/networks'
import { OrderBook } from '../cards/order-book'
import ProfitCalculator from '../widgets/profit-calculator'
import { SelectOrderBook } from '../cards/select-order-book'

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
  svgIcon: string
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
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isOpen || !localData) return null

  // const adjustSvgSize = (svgContent: string, width: string, height: string) => {
  //   return svgContent
  //     .replace(/width="[^"]*"/, `width="${width}"`)
  //     .replace(/height="[^"]*"/, `height="${height}"`)
  // }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-stone-950 rounded-xl border border-stone-800 w-full h-full max-h-screen px-4 md:px-10 md:overflow-hidden overflow-auto">
        <section className="py-4">
          <header className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center md:flex-row space-x-2">
              {/* <div
                className="flex items-center"
                dangerouslySetInnerHTML={{
                  __html: adjustSvgSize(localData.svgIcon, '45px', '45px'),
                }}
                aria-label="coin-icon"
              /> */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <div className="flex items-center">
                  <p className="font-semibold text-xl md:text-2xl">
                    {localData.coinName}
                  </p>
                  <p className="font-semibold text-xl md:text-2xl ml-1 md:ml-2">
                    ({symbol})
                  </p>
                </div>

                <div className="flex space-x-2">
                  <p className="text-sm md:text-base">
                    {textOpportunity.spread}: {localData.spreadPercent}%
                  </p>
                  <p className="text-sm md:text-base">
                    {textOpportunity.fee}: 0.60% + $ {localData.withdrawFee}
                  </p>
                </div>
              </div>
            </div>
            {isMobile ? (
              <button
                className="bg-red-500 text-white rounded-md py-1 px-3 text-[0.875rem] md:text-[1rem]"
                onClick={onClose}
              >
                X
              </button>
            ) : (
              <button
                className="bg-red-500 text-white rounded-md py-1 px-3 text-[0.875rem] md:text-[1rem]"
                onClick={onClose}
              >
                {textOpportunity.cancel}
              </button>
            )}
          </header>
        </section>

        <div className="flex flex-col-reverse md:flex-col md:space-y-6">
          <section className="md:grid md:grid-cols-2 gap-6 flex flex-col-reverse md:flex-co space-y-6 md:space-y-0">
            <Networks
              networksBuy={localData?.allNetworksBuy}
              networksSell={localData?.allNetworksSell}
            />
            <ProfitCalculator
            // withdrawalValue={localData.withdrawFee}
            // buyLastPrice={localData.buyPrice}
            // sellLastPrice={localData.sellPrice}
            />
          </section>

          <section className="flex flex-row gap-6 md:h-[calc(84vh-9rem)] h-[calc(39vh)]">
            {isMobile ? (
              <SelectOrderBook data={localData} />
            ) : (
              <>
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
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

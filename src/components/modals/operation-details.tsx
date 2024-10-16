'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLayoutContext } from '@/context/layout-context'
import ProfitCalculator from '../widgets/profit-calculator'
import { OrderBook } from '../cards/order-book'

interface Order {
  price: string
  volume: string
  liquidity: string
}

interface OrderBook {
  asks: Order[]
  bids: Order[]
}

interface BookData {
  name: string
  symbol: string
  spreadPercent: number
  withdrawFee: number
  network: string
  buyOrderbook: OrderBook
  sellOrderbook: OrderBook
  exchangeBuy: string
  exchangeSell: string
}

interface BookProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  data: BookData
}

export function OperationDetails({ isOpen, onClose, data }: BookProps) {
  const { textOpportunity } = useLayoutContext()
  const [localData, setLocalData] = useState(data)

  useEffect(() => {
    setLocalData({ ...data })
  }, [data])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 px-5">
      <div className="bg-stone-950 rounded-xl h-[95%] border border-stone-800 px-5">
        <div className="flex justify-between py-4">
          <div className="flex flex-row items-center space-x-5">
            <div className="flex flex-row items-center">
              <Image
                src={`/images/svg/coin.svg`}
                alt="mercadobitcoin"
                height={50}
                width={50}
              />
              <p className="font-semibold text-2xl ml-2">{localData.name} </p>
              <p className="font-semibold text-2xl ml-2">
                ({localData.symbol})
              </p>
            </div>
            <p>
              {textOpportunity.spread}: {localData.spreadPercent}%
            </p>
            <p>
              {textOpportunity.fee}: 0.60% + ${localData.withdrawFee}
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
          <div />
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

'use client'
import React from 'react'
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
  console.log(data)
  const { textOpportunity } = useLayoutContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-5">
      <div className="bg-stone-950 rounded-xl shadow-lg h-[95%] w-full border border-stone-800 px-5">
        <div className="flex justify-between">
          <div className="flex flex-row items-center w-1/2 space-x-5">
            <div className="flex flex-row items-center">
              <Image
                className="py-4"
                src={`/images/svg/coin.svg`}
                alt="mercadobitcoin"
                height={50}
                width={50}
              />
              <p className="font-semibold text-2xl ml-2">{data.name} </p>
              <p className="font-semibold text-2xl ml-2">({data.symbol})</p>
            </div>
            <p>
              {textOpportunity.spread}: {data.spreadPercent}%
            </p>
            <p>
              {textOpportunity.fee}: 0.60% + ${data.withdrawFee}
            </p>
          </div>
          <div className="flex flex-row py-2 items-center w-1/2 justify-end">
            <button
              className="items-center justify-center flex bg-red-500 w-[20%] p-1 rounded-md"
              onClick={onClose}
            >
              <a className="text-sm">{textOpportunity.cancel}</a>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <OrderBook
            title={textOpportunity.purchaseBook}
            orders={data.buyOrderbook.asks}
            exchangeIcon={`/images/exchanges/${data.exchangeBuy}.svg`}
            isBuy={true}
          />

          <OrderBook
            title={textOpportunity.salesBook}
            orders={data.sellOrderbook.bids}
            exchangeIcon={`/images/exchanges/${data.exchangeSell}.svg`}
            isBuy={false}
          />

          <ProfitCalculator />
          <ProfitCalculator />
        </div>
      </div>
    </div>
  )
}

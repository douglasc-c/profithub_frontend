'use client'
import React from 'react'
import Image from 'next/image'
import { useLayoutContext } from '@/context/layout-context'

interface Order {
  price: string
  volume: string
  liquidity: string
}

interface OrderBookData {
  asks: Order[]
  bids: Order[]
}

interface Opportunity {
  buyPrice: number
  sellPrice: number
  exchangeBuy: string
  exchangeSell: string
  buyOrderbook: OrderBookData
  sellOrderbook: OrderBookData
}

interface BookProps {
  data: Opportunity
}

export function SelectOrderBook({ data }: BookProps) {
  const { textOpportunity } = useLayoutContext()

  const [isSelected, setIsSelected] = React.useState('buy')

  const onSelectBuy = () => setIsSelected('buy')
  const onSelectSell = () => setIsSelected('sell')

  const orders =
    isSelected === 'buy' ? data.buyOrderbook.asks : data.sellOrderbook.bids

  console.log('-------------')

  return (
    <div className="flex flex-col border border-gray-600 rounded-xl w-full max-w-full overflow-hidden h-[55%]">
      <section className="flex items-center justify-between">
        <button
          className={`border-b-4 p-4 ${
            isSelected === 'buy' ? 'border-green-600' : 'border-[#2f2f35]'
          } w-1/2 text-lg`}
          onClick={onSelectBuy}
        >
          <span className="font-medium">{textOpportunity.purchaseBook}</span>
        </button>
        <button
          className={`border-b-4 p-4 ${
            isSelected === 'sell' ? 'border-red-600' : 'border-[#2f2f35]'
          } w-1/2 text-lg`}
          onClick={onSelectSell}
        >
          <span className="font-medium">{textOpportunity.salesBook}</span>
        </button>
      </section>

      <section className="flex items-center justify-between p-3 border-b border-gray-600">
        <div className="flex items-center space-x-3">
          <Image
            src={`/images/exchanges/${isSelected === 'buy' ? data.exchangeBuy : data.exchangeSell}.svg`}
            alt="mercadobitcoin"
            height={35}
            width={35}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-400">{textOpportunity.lastPrice}:</p>
          <h2 className="text-lg font-semibold">
            $ {isSelected === 'buy' ? data.buyPrice : data.sellPrice}
          </h2>
        </div>
      </section>

      <div className="md:hidden overflow-y-auto max-h-[500px]">
        <table className="min-w-full">
          <thead className="text-[0.90rem] uppercase text-gray-200">
            <tr>
              <th scope="col" className="w-1/3 px-6 py-3 text-left">
                {textOpportunity.price}
              </th>
              <th scope="col" className="w-1/3 px-6 py-3 text-center">
                {textOpportunity.volume}
              </th>
              <th scope="col" className="w-1/3 px-6 py-3 text-right">
                {textOpportunity.liquidity}
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[500px]">
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-[#2c2c31]' : 'bg-[#18181b]'} ${
                  index === orders.length - 1 ? 'last:rounded-b-xl' : ''
                }`}
              >
                <td className="w-1/3 px-6 py-2 text-sm font-medium text-left">
                  $ {order.price}
                </td>
                <td className="w-1/3 px-6 py-2 text-sm font-medium text-center">
                  {order.volume}
                </td>
                <td className="w-1/3 px-6 py-2 text-sm font-medium text-right">
                  $ {order.liquidity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

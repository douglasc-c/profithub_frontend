'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

interface Order {
  price: string
  volume: string
  liquidity: string
}

interface BookProps {
  title: string
  orders: Order[]
  exchangeIcon: string
  lastPrice: number
  isBuy: boolean
}

export function OrderBook({
  title,
  orders,
  exchangeIcon,
  lastPrice,
  isBuy,
}: BookProps) {
  const { textOpportunity } = useLayoutContext()

  return (
    <div className="flex flex-col border border-gray-600 rounded-xl max-h-[460px]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-3 p-3">
          <Image
            className=""
            src={exchangeIcon}
            alt="exchange"
            height={40}
            width={40}
          />
          <h2
            className={`text-xl font-medium ${isBuy ? 'text-green-600' : 'text-red-600'}`}
          >
            {title}
          </h2>
        </div>
        <div className="flex flex-row items-center space-x-2 p-3">
          <p className="text-xl font-regular">{textOpportunity.lastPrice}:</p>
          <h2 className="text-xl font-medium">${lastPrice}</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm rounded-xl">
          <thead className="text-medium uppercase border-b rounded-xl">
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
          <tbody className="py-28">
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-zinc-900' : ''}`}
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

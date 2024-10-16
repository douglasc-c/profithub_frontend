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
  isBuy: boolean
}

export function OrderBook({ title, orders, exchangeIcon, isBuy }: BookProps) {
  const { textOpportunity } = useLayoutContext()

  return (
    <div className="flex flex-col border border-gray-600 rounded-xl p-3">
      <div className="flex flex-row items-center space-x-3">
        <Image
          className="py-2"
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
      <table className="min-w-full text-sm text-gray-400">
        <thead className="text-xs uppercase text-gray-400 border-b">
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
        <tbody className="h-32 overflow-y-auto">
          {orders.map((order, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="w-1/3 px-6 py-2 text-xs text-left">
                $ {order.price}
              </td>
              <td className="w-1/3 px-6 py-2 text-xs text-center">
                {order.volume}
              </td>
              <td className="w-1/3 px-6 py-2 text-xs text-right">
                $ {order.liquidity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

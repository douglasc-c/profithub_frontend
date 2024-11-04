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
    <div className="flex flex-col border border-gray-600 rounded-xl w-full max-w-full  overflow-hidden h-[80%]">
      <div className="flex flex-row items-center justify-between p-3 border-b border-gray-600">
        <div className="flex flex-row items-center space-x-3">
          <Image
            src={exchangeIcon}
            alt="exchange"
            height={30}
            width={30}
            className="rounded-full"
          />
          <h2
            className={`text-xl font-medium ${
              isBuy ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {title}
          </h2>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-sm text-gray-400">{textOpportunity.lastPrice}:</p>
          <h2 className="text-lg font-semibold">${lastPrice}</h2>
        </div>
      </div>

      {/* Tabela para telas grandes */}
      <div className="hidden md:block overflow-x-auto">
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

      {/* Lista para telas menores */}
      <div className="md:hidden overflow-y-auto max-h-[500px] px-3">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`flex justify-between p-2 rounded-lg ${
              index % 2 === 0 ? 'bg-[#2c2c31]' : 'bg-[#18181b]'
            }`}
          >
            <div>
              <p className="text-gray-400 text-xs uppercase">
                {textOpportunity.price}
              </p>
              <p className="text-white text-sm">$ {order.price}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">
                {textOpportunity.volume}
              </p>
              <p className="text-white text-sm">{order.volume}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">
                {textOpportunity.liquidity}
              </p>
              <p className="text-white text-sm">$ {order.liquidity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export function Book({ isOpen, onClose, children, data, text }: any) {
  if (!isOpen) return null

  const [isSelected, setIsSelected] = useState('buy')
  const onSelectBuy = () => setIsSelected('buy')
  const onSelectSell = () => setIsSelected('sell')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-stone-950 rounded-t-md rounded-b-md shadow-lg max-w-md w-full border border-stone-800">
        <section className="items-center justify-between flex">
          <button
            className={`border-b-4 p-4 ${isSelected === 'buy' ? 'border-green-600' : 'border-[#2f2f35]'} w-[50%] text-xs`}
            onClick={onSelectBuy}
          >
            <a className="font-bold">{text.purchaseBook}</a>
          </button>
          <button
            className={`border-b-4 p-4 ${isSelected === 'sell' ? 'border-red-600' : 'border-[#2f2f35]'} w-[50%] text-xs`}
            onClick={onSelectSell}
          >
            <a className="font-bold">{text.salesBook}</a>
          </button>
        </section>
        <div className="flex justify-between px-16 py-3 ">
          <Image
            className="py-4"
            src={`/images/exchanges/${data.corretoraCompra}.svg`}
            alt="mercadobitcoin"
            height={50}
            width={50}
          />
          <Image
            src="/images/svg/iconArrow.svg"
            alt="arrow"
            className="mx-2"
            width={20}
            height={30}
          />
          <Image
            className="py-4"
            src={`/images/exchanges/${data.corretoraVenda}.svg`}
            alt="mercadobitcoin"
            height={50}
            width={50}
          />
        </div>
        <div className="overflow-x-auto h-44 ">
          <table className="min-w-full text-sm text-gray-400">
            <thead className="text-xs bg-zinc-800 uppercase text-gray-400 border-b ">
              <tr>
                <th scope="col" className="w-1/3 px-6 py-3 text-left">
                  {text.price}
                </th>
                <th scope="col" className="w-1/3 px-6 py-3 text-center">
                  {text.volume}
                </th>
                <th scope="col" className="w-1/3 px-6 py-3 text-right">
                  {text.liquidity}
                </th>
              </tr>
            </thead>
            <tbody className="h-32 overflow-y-auto bg-zinc-800">
              {isSelected === 'buy'
                ? data?.orderbookCompra?.asks?.map((order, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="w-1/3 px-6 py-2 text-xs text-left">
                        {order[0]}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-center">
                        {'X'}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-right">
                        {order[1]}
                      </td>
                    </tr>
                  ))
                : data?.orderbookVenda?.bids?.map((order, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="w-1/3 px-6 py-2 text-xs text-left">
                        {order[0]}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-center">
                        {'X'}
                      </td>
                      <td className="w-1/3 px-6 py-2 text-xs text-right">
                        {order[1]}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <section className="flex items-center justify-center">
          <button
            className="items-center justify-center flex bg-red-500 w-[40%] p-1 m-2 rounded-md"
            onClick={onClose}
          >
            <a className="text-sm">{text.cancel}</a>
          </button>
        </section>
        {children}
      </div>
    </div>
  )
}

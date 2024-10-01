'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/cards/card'
import { Book } from '@/components/modals/book'
import { io, Socket } from 'socket.io-client'
import ProfitCalculator from '@/components/modals/profit-calculator'
import Image from 'next/image'

interface Opportunity {
  exchangeBuy: string
  exchangeSell: string
  symbol: string
  spreadPercent: string
  withdrawFee: string
  buyPrice: number
  sellPrice: number
  buyOrderbook: {
    bids: Array<{ price: string; volume: string; liquidity: string }>
    asks: Array<{ price: string; volume: string; liquidity: string }>
  }
  sellOrderbook: {
    bids: Array<{ price: string; volume: string; liquidity: string }>
    asks: Array<{ price: string; volume: string; liquidity: string }>
  }
}

export default function Arbitration() {
  const [opportunity, setOpportunity] = useState<Opportunity[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isSelectBook, setIsSelectBook] = useState<Opportunity | null>(null)

  useEffect(() => {
    const socket = io('https://proft.avaloncapital.fund', {})
    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket')
      sendSymbols(socket, [
        'BTC',
        'ETH',
        'XRP',
        'SOL',
        'SYS',
        'LINK',
        'ZEC',
        'SUSHI',
        'DOGE',
        'ADA',
        'TRX',
        'DOT',
        'NEAR',
        'MATIC',
        'UNI',
        'PEPE',
        'ICP',
        'APT',
        'XLM',
        'XMR',
        'CRO',
        'STX',
        'FET',
        'FIL',
        'ATOM',
        'MKR',
        'ARB',
        'VET',
        'RENDER',
        'INJ',
        'FTM',
        'JASMY',
        'ALGO',
        'QNT',
        'EOS',
        'AXS',
        'XTZ',
        'AKT',
        'NEO',
        'ZEC',
        'SAND',
        'NEXO',
        'GALA',
        'MANA',
        'IOTA',
        'RAY',
        'CAKE',
        'COMP',
        '1INCH',
        'DASH',
        'GMT',
        'ENG',
        'QTUM',
      ])
    })

    socket.on('updateOpportunity', (data: string) => {
      try {
        const parsedData: Opportunity[] = JSON.parse(data)

        if (Array.isArray(parsedData)) {
          const sortedData = parsedData.sort(
            (a, b) => parseFloat(b.spreadPercent) - parseFloat(a.spreadPercent),
          )

          setOpportunity(sortedData)
        } else {
          console.error('Expected an array but received:', parsedData)
        }
      } catch (error) {
        console.error('Error parsing JSON data:', error)
      }
    })

    return () => {
      socket.off('updateOpportunity')
      socket.close()
    }
  }, [])

  const sendSymbols = (socket: Socket, symbols: string[]) => {
    socket.emit('subscribe', { action: 'subscribe', symbols })
  }

  function onLoadIsOpenModal(item: Opportunity) {
    setIsSelectBook(item)
    setIsOpen(true)
  }

  function toggleCalculatorModal() {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <main className="flex md:px-20 px-10 py-5 relative">
      <div
        className="bg-white fixed z-50 rounded-l-md right-0 top-22 flex justify-center items-center cursor-pointer"
        onClick={toggleCalculatorModal}
      >
        <Image
          className="py-6 px-2"
          src={`/images/svg/arrowLeft.svg`}
          alt="buy"
          height={30}
          width={30}
        />
      </div>

      <div
        className={`fixed top-0 right-0 z-40 h-full w-1/3 transform transition-transform duration-500 ${
          isOpenModal ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <ProfitCalculator
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-9 w-full items-center justify-between">
        <Book
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          data={isSelectBook as Opportunity}
        />
        {opportunity.map((item, index) => (
          <Card
            key={index}
            data={item}
            onModal={() => onLoadIsOpenModal(item)}
          />
        ))}
      </div>
    </main>
  )
}

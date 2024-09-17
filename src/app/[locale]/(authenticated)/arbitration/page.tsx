'use client'
import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/redux/store'

import { useLayoutContext } from '@/context/layout-context'
import { Card } from '@/components/cards/card'
import { Book } from '@/components/modals/book'
import { io, Socket } from 'socket.io-client'

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
  const [isSelectBook, setIsSelectBook] = useState<Opportunity | null>(null)
  const { textOpportunity } = useLayoutContext()

  useEffect(() => {
    const socket = io('https://profit.avaloncapital.fund', {})
    // const socket = io('http://localhost:3333', {})
    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket')
      sendSymbols(socket, [
        'BTC',
        'ETH',
        'XRP',
        'SOL',
        'SYS',
        'LINK',
        // 'ZEC',
        // 'SUSHI',
        // 'DOGE',
        // 'ADA',
        // 'TRX',
        // 'DOT',
        // 'NEAR',
        // 'MATIC',
        // 'UNI',
        // 'PEPE',
        // 'ICP',
        // 'APT',
        // 'XLM',
        // 'XMR',
        // 'CRO',
        // 'STX',
        // 'FET',
        // 'FIL',
        // 'ATOM',
        // 'MKR',
        // 'ARB',
        // 'VET',
        // 'RENDER',
        // 'INJ',
        // 'FTM',
        // 'JASMY',
        // 'ALGO',
        // 'QNT',
        // 'EOS',
        // 'AXS',
        // 'XTZ',
        // 'AKT',
        // 'NEO',
        // 'ZEC',
        // 'SAND',
        // 'NEXO',
        // 'GALA',
        // 'MANA',
        // 'IOTA',
        // 'RAY',
        // 'CAKE',
        // 'COMP',
        // '1INCH',
        // 'DASH',
        // 'GMT',
        // 'ENG',
        // 'QTUM',
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

  // useEffect(() => {
  //   console.log('Opportunity updated:', opportunity)
  // }, [opportunity])

  const sendSymbols = (socket: Socket, symbols: string[]) => {
    socket.emit('subscribe', { action: 'subscribe', symbols })
  }

  function onLoadIsOpenModal(item: Opportunity) {
    setIsSelectBook(item)
    setIsOpen(true)
  }

  return (
    <main className="min-h-screen flex flex-col md:px-20 px-10 py-10 pt-28">
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-9 w-full items-center justify-between">
        <Book
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          data={isSelectBook as Opportunity}
          text={textOpportunity}
        />
        {opportunity.map((item, index) => (
          <Card
            key={index}
            data={item}
            text={textOpportunity}
            onModal={() => onLoadIsOpenModal(item)}
          />
        ))}
      </div>
    </main>
  )
}

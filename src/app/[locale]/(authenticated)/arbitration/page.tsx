'use client'

import { Card } from '@/components/cards/card'
import { OperationDetails } from '@/components/modals/operation-details'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

interface Order {
  price: string
  volume: string
  liquidity: string
}

interface OrderBook {
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
  name: string
  symbol: string
  coinName: string
  svgIcon: string
  nameCoin: string
  spreadPercent: number
  withdrawFee: number
  network: string
  exchangeBuy: string
  exchangeSell: string
  buyPrice: number
  sellPrice: number
  buyOrderbook: OrderBook
  sellOrderbook: OrderBook
  allNetworksBuy: Network[]
  allNetworksSell: Network[]
}

export default function Arbitration() {
  const [opportunity, setOpportunity] = useState<Opportunity[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)

  useEffect(() => {
    const socket = io('http://localhost:3337', {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket ------')
      socket.emit('subscribe')
    })

    socket.on('updateOpportunity', (data: Opportunity[]) => {
      try {
        console.log('Oportunidades recebidas:', data)

        if (Array.isArray(data)) {
          const sortedData = data.sort(
            (a, b) => b.spreadPercent - a.spreadPercent,
          )

          setOpportunity(sortedData)
        } else {
          console.error('Expected an array but received:', data)
        }
      } catch (error) {
        console.error('Error processing data:', error)
      }
    })

    return () => {
      socket.off('updateOpportunity')
      socket.close()
    }
  }, [])

  function onLoadIsOpenModal(symbol: string) {
    setSelectedSymbol(symbol)
    setIsOpen(true)
  }

  return (
    <main className="flex md:px-20 px-10 py-5 relative">
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-9 w-full items-center justify-between">
        {selectedSymbol && (
          <OperationDetails
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            symbol={selectedSymbol}
            opportunity={
              opportunity.find((op) => op.symbol === selectedSymbol) || null
            }
          />
        )}

        {opportunity.map((item, index) => (
          <Card
            key={index}
            data={item}
            onModal={() => onLoadIsOpenModal(item.symbol)}
          />
        ))}
      </div>
    </main>
  )
}

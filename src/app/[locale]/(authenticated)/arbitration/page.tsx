'use client'

import { Card } from '@/components/cards/card'
import { OperationDetails } from '@/components/modals/operation-details'
import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  function formatNumber(value: number): string {
    let decimalPlaces

    if (value >= 1) {
      decimalPlaces = 4
    } else {
      const decimalPart = value.toString().split('.')[1] || ''
      const firstSignificantIndex = decimalPart.search(/[1-9]/)

      if (firstSignificantIndex === 0) {
        decimalPlaces = 4
      } else if (firstSignificantIndex === 1) {
        decimalPlaces = 6
      } else {
        decimalPlaces = 8
      }
    }

    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(value)
  }

  function formatOrder(order: Order): Order {
    return {
      price: formatNumber(parseFloat(order.price)),
      volume: order.volume,
      liquidity: formatNumber(parseFloat(order.liquidity)),
    }
  }

  useEffect(() => {
    const socket = io('https://socket.profithub.tech/', {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket ------')
      socket.emit('subscribe')
    })

    socket.on('updateOpportunity', (data: Opportunity[]) => {
      try {
        if (Array.isArray(data)) {
          const formattedData = data.map((item) => ({
            ...item,
            buyPrice: parseFloat(formatNumber(item.buyPrice)),
            sellPrice: parseFloat(formatNumber(item.sellPrice)),
            buyOrderbook: {
              asks: item.buyOrderbook.asks.map(formatOrder),
              bids: item.buyOrderbook.bids.map(formatOrder),
            },
            sellOrderbook: {
              asks: item.sellOrderbook.asks.map(formatOrder),
              bids: item.sellOrderbook.bids.map(formatOrder),
            },
          }))

          const sortedData = formattedData.sort(
            (a, b) => b.spreadPercent - a.spreadPercent,
          )

          setOpportunity(sortedData)
          setIsLoading(false)
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

        {isLoading ? (
          <div className="col-span-full flex items-center text-center h-[calc(100vh-9rem)] justify-center">
            <PuffLoader
              color="#fff"
              loading={isLoading}
              size={300}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          opportunity.map((item, index) => (
            <Card
              key={index}
              data={item}
              onModal={() => onLoadIsOpenModal(item.symbol)}
            />
          ))
        )}
      </div>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { Card } from '@/components/cards/card'
import { Book } from '@/components/modals/book'

export default function Opportunity({ text }: any) {
  const [oportunidades, setOportunidades] = useState([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSelectBook, setIsSelectBook] = useState(null)

  useEffect(() => {
    const socket = io('http://localhost:3334')

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket')
    })

    socket.on('allArbitrageOpportunities', (data) => {
      console.log(data)
      setOportunidades(data)
    })

    return () => {
      socket.off('allArbitrageOpportunities')
      socket.close()
    }
  }, [])

  function onLoadIsOpenModal(item: any) {
    setIsSelectBook(item)
    setIsOpen(true)
  }

  return (
    <main className="flex md:px-20 px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 w-full items-center justify-between">
        <Book
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          data={isSelectBook}
          text={text}
        />
        {oportunidades?.map((item, index) => (
          <Card
            key={index}
            data={item}
            text={text}
            onModal={() => onLoadIsOpenModal(item)}
          />
        ))}
      </div>
    </main>
  )
}

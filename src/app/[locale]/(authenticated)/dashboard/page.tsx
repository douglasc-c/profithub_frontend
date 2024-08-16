'use client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { useLayoutContext } from '@/context/layout-context'
import { Card } from '@/components/cards/card'
import { Book } from '@/components/modals/book'

export default function Dashboard() {
  const [oportunidades, setOportunidades] = useState([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSelectBook, setIsSelectBook] = useState(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const { textOpportunity } = useLayoutContext()
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3333/websocket')

    socket.onopen = () => {
      console.log('Conectado ao servidor WebSocket')
      setSocket(socket)

      sendSymbols(socket, ['BTC', 'ETH'])
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      const dataItems = data[0]

      console.log(dataItems)
      if (dataItems.opportunityStore) {
        const sortedOportunidades = dataItems.opportunityStore.sort(
          (a, b) => parseFloat(b.spreadPercent) - parseFloat(a.spreadPercent),
        )
        setOportunidades(sortedOportunidades)
      }
    }
  }, [])

  const sendSymbols = (socket: WebSocket, symbols: string[]) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: 'subscribe', symbols }))
    }
  }

  function onLoadIsOpenModal(item: any) {
    setIsSelectBook(item)
    setIsOpen(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <main className="flex md:px-20 px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 w-full items-center justify-between">
          <Book
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            data={isSelectBook}
            text={textOpportunity}
          />
          {oportunidades?.map((item, index) => (
            <Card
              key={index}
              data={item}
              text={textOpportunity}
              onModal={() => onLoadIsOpenModal(item)}
            />
          ))}
        </div>
      </main>
    </main>
  )
}

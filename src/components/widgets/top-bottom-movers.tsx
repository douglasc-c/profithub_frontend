import { useEffect, useState } from 'react'
import axios from 'axios'

interface CryptoData {
  id: number
  name: string
  quote: {
    USD: {
      percent_change_24h: number
    }
  }
}

const TopBottomMovers: React.FC = () => {
  const [top10, setTop10] = useState<CryptoData[]>([])
  const [bottom10, setBottom10] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await axios.get('/api/crypto')
        console.log(response)
        setTop10(response.data.top10)
        setBottom10(response.data.bottom10)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="rounded-2xl bg-[#0d1218] border-2 border-[#384a61] p-4">
      <h2 className="text-xl font-bold mb-4 text-white">
        Maiores Altas e Baixas
      </h2>

      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-500">
              Top 10 Altas
            </h3>
            <ul>
              {top10.map((crypto) => (
                <li key={crypto.id} className="text-white">
                  {crypto.name}:{' '}
                  {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-red-500">
              Top 10 Baixas
            </h3>
            <ul>
              {bottom10.map((crypto) => (
                <li key={crypto.id} className="text-white">
                  {crypto.name}:{' '}
                  {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopBottomMovers

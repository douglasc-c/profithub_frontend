import { FC } from 'react'

interface CryptoData {
  id: number
  name: string
  symbol: string
  cmc_rank: number
  quote: {
    USD: {
      percent_change_24h: number
      price: number
    }
  }
}

interface HighestHighsLowsProps {
  data: CryptoData[]
  loading: boolean
  title: string
}

const HighestHighsLows: FC<HighestHighsLowsProps> = ({
  data,
  loading,
  title,
}) => {
  return (
    <div className="rounded-2xl bg-[#0d1218] border-2 border-[#384a61] p-4">
      <h2 className="text-2xl font-medium mb-3">{title}</h2>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-2xl text-sm text-gray-300">
            <thead>
              <tr className="text-gray-400">
                <th className="py-1 px-0 text-center font-medium">Rank</th>
                <th className="py-1 px-4 text-left font-medium">Nome</th>
                <th className="py-1 px-4 text-center font-medium">Símbolo</th>
                <th className="py-1 px-4 text-center font-medium">%</th>
                <th className="py-1 px-4 text-center font-medium">Preço</th>
              </tr>
            </thead>
            <tbody>
              {data.map((crypto) => (
                <tr key={crypto.id}>
                  <td className="py-1 font-light text-center">
                    {crypto.cmc_rank}
                  </td>
                  <td className="py-1 px-4 font-semibold">{crypto.name}</td>
                  <td className="py-1 px-4 font-light text-center text-gray-400">
                    {crypto.symbol}
                  </td>
                  <td
                    className={`py-1 px-4 font-semibold text-center ${
                      crypto.quote.USD.percent_change_24h >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                  </td>
                  <td className="py-1 px-4 font-semibold text-center">
                    $
                    {crypto.quote.USD.price.toFixed(
                      crypto.quote.USD.price < 10 ? 4 : 2,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default HighestHighsLows

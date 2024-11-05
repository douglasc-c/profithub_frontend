import { useLayoutContext } from '@/context/layout-context'
import { FC } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

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
  const { textHighestHighsLows } = useLayoutContext()

  console.log('-------------')

  return (
    <div className="rounded-2xl bg-[#0d1218] border-2 border-[#384a61] p-4 h-full flex flex-col">
      <h2 className="text-2xl font-medium mb-3">{title}</h2>

      {loading ? (
        <p className="col-span-full flex items-center text-center justify-center h-full">
          <ScaleLoader
            color="#fff"
            loading={loading}
            width={4}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </p>
      ) : (
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full rounded-2xl text-sm text-gray-300">
            <thead>
              <tr className="text-gray-400">
                <th className="py-1 px-0 text-center font-medium">
                  {textHighestHighsLows.rank}
                </th>
                <th className="py-1 px-4 text-left font-medium">
                  {textHighestHighsLows.name}
                </th>
                <th className="py-1 px-4 text-center font-medium">
                  {textHighestHighsLows.symbol}
                </th>
                <th className="py-1 px-4 text-center font-medium">24h %</th>
                <th className="py-1 px-4 text-center font-medium">
                  {textHighestHighsLows.price}
                </th>
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

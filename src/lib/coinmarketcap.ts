// src/lib/coinmarketcap.ts

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

const fetchTopMovers = async (): Promise<{
  top10: CryptoData[]
  bottom10: CryptoData[]
}> => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY':
            process.env.COINMARKETCAP_API_KEY ||
            'b10f74d9-acc0-4ba8-bd84-a3c4de199510',
        },
        params: {
          start: '1',
          limit: '100',
          convert: 'USD',
        },
      },
    )

    const data: CryptoData[] = response.data.data

    const sortedData = data.sort(
      (a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h,
    )
    const top10 = sortedData.slice(0, 10)
    const bottom10 = sortedData.slice(-10).reverse()

    return { top10, bottom10 }
  } catch (error) {
    console.error('Erro ao buscar dados da CoinMarketCap:', error)
    throw new Error('Erro ao buscar dados da CoinMarketCap')
  }
}

export default fetchTopMovers

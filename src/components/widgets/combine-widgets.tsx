'use client'

import { useEffect, useState } from 'react'
import FearGreedIndex from './fear-greed'
import HighestHighsLows from './highest-highs-lows'
import api from '@/lib/api'
import { useLayoutContext } from '@/context/layout-context'

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

const CombinedWidgets: React.FC = () => {
  const { textHighestHighsLows } = useLayoutContext()
  const [highs, setHighs] = useState<CryptoData[]>([])
  const [lows, setLows] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newsScript = document.createElement('script')
    newsScript.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
    newsScript.async = true
    newsScript.innerHTML = JSON.stringify({
      feedMode: 'market',
      isTransparent: true,
      displayMode: 'regular',
      width: '100%',
      height: '100%',
      colorTheme: 'dark',
      locale: 'en',
      market: 'crypto',
    })
    const newsContainer = document.querySelector(
      '.tradingview-news-container__widget',
    )
    if (newsContainer) {
      newsContainer.appendChild(newsScript)
    }

    const tickerScript = document.createElement('script')
    tickerScript.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    tickerScript.async = true
    tickerScript.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'BINANCE:BTCUSD', title: 'Bitcoin' },
        { proName: 'BINANCE:ETHUSD', title: 'Ethereum' },
        { proName: 'BINANCE:SOLUSD', title: 'Solana' },
        { proName: 'BINANCE:LINKUSD', title: 'Link' },
        { proName: 'BINANCE:XRPUSD', title: 'Ripple' },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en',
    })
    const tickerContainer = document.querySelector(
      '.tradingview-ticker-container__widget',
    )
    if (tickerContainer) {
      tickerContainer.appendChild(tickerScript)
    }

    return () => {
      if (newsContainer) {
        newsContainer.innerHTML = ''
      }
      if (tickerContainer) {
        tickerContainer.innerHTML = ''
      }
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await api.get('/highest')
        console.log(response)
        setHighs(response.data.highestHighs)
        setLows(response.data.highestLows)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="h-[calc(100vh-9rem)]">
      <div className="tradingview-ticker-container__widget" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-3 h-full">
        <div className="col-span-1 rounded-2xl bg-[#0d1218] border-2 border-[#384a61]">
          <div className="tradingview-news-container__widget w-full h-full" />
        </div>

        <div className="col-span-1">
          <HighestHighsLows
            data={highs}
            loading={loading}
            title={textHighestHighsLows.highestHighs}
          />
        </div>

        <div className="col-span-1 space-y-4">
          <HighestHighsLows
            data={lows}
            loading={loading}
            title={textHighestHighsLows.highestLows}
          />
          <FearGreedIndex />
        </div>
      </div>
    </div>
  )
}

export default CombinedWidgets

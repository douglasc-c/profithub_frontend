'use client'

import { useEffect } from 'react'
import FearGreedIndex from './fear-greed'
import TopBottomMovers from './top-bottom-movers'

const CombinedWidgets: React.FC = () => {
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

  return (
    <div className="h-[calc(100vh-9rem)]">
      <div className="tradingview-ticker-container__widget" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-3 h-full">
        <div className="col-span-1 rounded-2xl bg-[#0d1218] border-2 border-[#384a61]">
          <div className="tradingview-news-container__widget w-full h-full" />
        </div>

        <div className="col-span-1">
          <TopBottomMovers />
        </div>

        <div className="col-span-1">
          <FearGreedIndex />
        </div>
      </div>
    </div>
  )
}

export default CombinedWidgets

'use client'

import { useEffect } from 'react'
import CoinConvert from './coin-convert'
import CoinStatsWidget from './fear-greed'

const CombinedWidgets = () => {
  useEffect(() => {
    // Load News widget
    const newsScript = document.createElement('script')
    newsScript.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
    newsScript.async = true

    newsScript.innerHTML = JSON.stringify({
      feedMode: 'market',
      isTransparent: true,
      displayMode: 'regular',
      width: '100%',
      height: '725',
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

    // Load Coin Market Overview widget
    const marketOverviewScript = document.createElement('script')
    marketOverviewScript.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
    marketOverviewScript.async = true

    marketOverviewScript.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: '100%',
      height: '590',
      plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
      plotLineColorFalling: 'rgba(41, 98, 255, 1)',
      gridLineColor: 'rgba(240, 243, 250, 0)',
      scaleFontColor: 'rgba(209, 212, 220, 1)',
      belowLineFillColorGrowing: 'rgba(0, 0, 0, 0.12)',
      belowLineFillColorFalling: 'rgba(0, 0, 0, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(0, 0, 0, 0)',
      belowLineFillColorFallingBottom: 'rgba(0, 0, 0, 0)',
      symbolActiveColor: 'rgba(0, 0, 0, 0.12)',
      tabs: [
        {
          title: 'Cripto',
          symbols: [
            { s: 'BINANCE:BTCUSD' },
            { s: 'BINANCE:ETHUSD' },
            { s: 'BINANCE:SOLUSD' },
            { s: 'BINANCE:LINKUSD' },
            { s: 'BINANCE:XRPUSD' },
            { s: 'CRYPTOCAP:TRX' },
          ],
          originalTitle: 'Indices',
        },
      ],
    })

    const marketOverviewContainer = document.querySelector(
      '.tradingview-market-overview-container__widget',
    )
    if (marketOverviewContainer) {
      marketOverviewContainer.appendChild(marketOverviewScript)
    }

    return () => {
      if (newsContainer) {
        newsContainer.innerHTML = ''
      }
      if (marketOverviewContainer) {
        marketOverviewContainer.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex-1">
        <div className="tradingview-news-container">
          <div className="tradingview-news-container__widget" />
        </div>
      </div>
      <div className="flex-1 relative mt-4">
        <CoinConvert />
        <div className="tradingview-market-overview-container bg-[#0d1218] rounded-2xl -mt-5 absolute w-full border-2 border-[#384a61]">
          <div className="tradingview-market-overview-container__widget" />
        </div>
      </div>
      <div className="flex-1 mt-4">
        <CoinStatsWidget />
      </div>
    </div>
  )
}

export default CombinedWidgets

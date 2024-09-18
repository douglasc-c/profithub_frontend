'use client'

import { useEffect } from 'react'
import CoinConvert from './coin-convert'
import CoinStatsWidget from './fear-greed'

interface WidgetProps {
  text: {
    fearGreedIndex: string
    fear: string
    greed: string
    lastUpdated: string
  }
}

const CombinedWidgets: React.FC<WidgetProps> = ({ text }) => {
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
      height: '695',
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
      height: '538',
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
      if (marketOverviewContainer) {
        marketOverviewContainer.innerHTML = ''
      }
      if (tickerContainer) {
        tickerContainer.innerHTML = ''
      }
    }
  }, [])

  return (
    <div>
      <div className="mt-28">
        <div className="tradingview-ticker-container">
          <div className="tradingview-ticker-container__widget" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 md:mt-2 sm:mt-2">
        <div className="col-span-1">
          <div className="tradingview-news-container rounded-2xl bg-[#0d1218] border-2 border-[#384a61]">
            <div className="tradingview-news-container__widget" />
          </div>
        </div>

        <div className="col-span-1">
          <CoinConvert />
          <div className="tradingview-market-overview-container bg-[#0d1218] rounded-2xl mt-3 border-2 border-[#384a61]">
            <div className="tradingview-market-overview-container__widget" />
          </div>
        </div>

        <div className="col-span-1 flex items-end">
          <CoinStatsWidget text={text} />
        </div>
      </div>
    </div>
  )
}

export default CombinedWidgets

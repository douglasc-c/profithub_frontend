'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

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

interface FearGreedData {
  value: string
  value_classification: string
  update_time: string
}

const CarouselWidgets: React.FC = () => {
  const { textHighestHighsLows } = useLayoutContext()
  const [highs, setHighs] = useState<CryptoData[]>([])
  const [lows, setLows] = useState<CryptoData[]>([])
  const [fearGreed, setFearGreed] = useState<FearGreedData | null>(null)
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
        setFearGreed(response.data.fearGreedIndex)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="h-[calc(105vh-9rem)] px-5 overflow-auto bg-slate-500">
      <div className="tradingview-ticker-container__widget" />
      <div className="py-3 h-[calc(96vh-9rem)]">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-full"
          navigation
        >
          <SwiperSlide>
            <div className="rounded-2xl bg-[#0d1218] border-2 border-[#384a61] h-[95%]">
              <div className="tradingview-news-container__widget w-full h-full" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="space-y-4 flex flex-col">
              <HighestHighsLows
                data={highs}
                loading={loading}
                title={textHighestHighsLows.highestHighs}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="space-y-4 flex flex-col overflow-auto">
              <HighestHighsLows
                data={lows}
                loading={loading}
                title={textHighestHighsLows.highestLows}
              />
              <FearGreedIndex fearGreedData={fearGreed} loading={loading} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default CarouselWidgets

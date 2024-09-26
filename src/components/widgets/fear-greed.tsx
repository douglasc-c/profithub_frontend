import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useLayoutContext } from '@/context/layout-context'

interface FearGreedData {
  value: string
  value_classification: string
  timestamp: string
}

const FearGreedWidget: React.FC = () => {
  const { textFearGreedIndex } = useLayoutContext()

  const [fearGreedIndex, setFearGreedIndex] = useState<FearGreedData | null>(
    null,
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFearGreedIndex = async () => {
      try {
        const response = await axios.get(
          'https://api.alternative.me/fng/?format=json',
        )
        setFearGreedIndex(response.data.data[0])
        setLoading(false)
      } catch (err) {
        setError('Failed to load Fear & Greed Index.')
        setLoading(false)
      }
    }

    fetchFearGreedIndex()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  const fearGreedValue = parseInt(fearGreedIndex?.value || '0')

  const rotation = (100 - fearGreedValue) * (180 / 100)

  return (
    <div className="bg-[#0d1218] rounded-2xl w-full p-6 border-2 border-[#384a61] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-medium mb-3 text-center">
        {textFearGreedIndex.fearGreedIndex}
      </h2>
      <div className="relative w-64 h-32 mb-4">
        <svg width="0" height="0">
          <defs>
            <linearGradient
              id="gradientColor"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#34B349" />
              <stop offset="25%" stopColor="#9ACB82" />
              <stop offset="50%" stopColor="#F0A229" />
              <stop offset="75%" stopColor="#F07D29" />
              <stop offset="100%" stopColor="#F02935" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgressbar
          value={fearGreedValue}
          text={`${fearGreedValue}`}
          circleRatio={0.5}
          strokeWidth={5}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: 'round',
            textColor: 'transparent',
            pathColor: 'transparent',
            trailColor: 'url(#gradientColor)',
            textSize: '24px',
          })}
        />

        <div
          className="absolute top-[92%] left-[47%] w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `rotate(-${rotation}deg) translateX(120px) rotate(${rotation}deg)`,
          }}
        ></div>

        <div className="absolute top-[92px] w-full text-center transform -translate-y-1/2 text-2xl  text-white">
          {fearGreedValue}
          <p className="text-center text-xl font-semibold">
            {fearGreedIndex?.value_classification === 'Fear'
              ? textFearGreedIndex.fear
              : fearGreedIndex?.value_classification === 'Neutral'
                ? textFearGreedIndex.neutral
                : fearGreedIndex?.value_classification === 'Greed'
                  ? textFearGreedIndex.greed
                  : 'Unknown'}{' '}
          </p>
          <p className="text-center text-sm mt-2">
            {textFearGreedIndex.lastUpdated}:{' '}
            {new Date(
              parseInt(fearGreedIndex?.timestamp || '') * 1000,
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FearGreedWidget

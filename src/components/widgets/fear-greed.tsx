import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface FearGreedData {
  value: string
  value_classification: string
  timestamp: string
}

interface WidgetProps {
  text: {
    fearGreedIndex: string
    fear: string
    greed: string
    lastUpdated: string
  }
}

const FearGreedWidget: React.FC<WidgetProps> = ({ text }) => {
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

  const segments = [
    { color: '#F02935', startValue: 0, endValue: 20 },
    { color: '#F07D29', startValue: 20, endValue: 40 },
    { color: '#F0A229', startValue: 40, endValue: 60 },
    { color: '#9ACB82', startValue: 60, endValue: 80 },
    { color: '#34B349', startValue: 80, endValue: 100 },
  ]

  const barWidth = 300
  const segmentWidth = barWidth / 3.5

  const calculateIndicatorPosition = (value: number) => {
    const position = (value / 100) * barWidth
    return position
  }

  const indicatorPosition = calculateIndicatorPosition(fearGreedValue)

  return (
    <div className="bg-[#0d1218] rounded-2xl text-white w-full p-4  border-2 border-[#384a61]">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {text.fearGreedIndex}
      </h2>
      <div className="relative mt-4">
        <div className="flex items-center justify-between w-full">
          {segments.map((segment, index) => (
            <div
              key={index}
              style={{
                backgroundColor: segment.color,
                width: `${segmentWidth}px`,
                height: '10px',
                borderRadius: '10px',
              }}
            />
          ))}
        </div>
        <div
          className="absolute"
          style={{
            left: `${indicatorPosition - 8}px`,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: '#ffffff',
            }}
          />
        </div>
      </div>

      <p className="text-center text-3xl font-semibold mb-2 mt-5">
        {fearGreedValue}
      </p>
      <p className="text-center text-lg">
        {fearGreedIndex?.value_classification === 'Fear'
          ? text.fear
          : text.greed}
      </p>
      <p className="text-center text-sm mt-2">
        {text.lastUpdated}:{' '}
        {new Date(
          parseInt(fearGreedIndex?.timestamp || '') * 1000,
        ).toLocaleDateString()}
      </p>
    </div>
  )
}

export default FearGreedWidget

import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useLayoutContext } from '@/context/layout-context'

interface FearGreedData {
  value: string
  value_classification: string
  update_time: string
}

interface FearGreedWidgetProps {
  fearGreedData: FearGreedData | null
  loading: boolean
}

const FearGreedWidget: React.FC<FearGreedWidgetProps> = ({
  fearGreedData,
  loading,
}) => {
  const { textFearGreedIndex } = useLayoutContext()

  if (loading) return <div>Loading...</div>
  if (!fearGreedData)
    return <div className="text-red-500">No data available.</div>

  const fearGreedValue = parseInt(fearGreedData.value || '0')
  const rotation = (100 - fearGreedValue) * (180 / 100)

  console.log('-------------')

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
            {fearGreedData.value_classification === 'Fear'
              ? textFearGreedIndex.fear
              : fearGreedData.value_classification === 'Neutral'
                ? textFearGreedIndex.neutral
                : fearGreedData.value_classification === 'Greed'
                  ? textFearGreedIndex.greed
                  : fearGreedData.value_classification === 'Extreme Greed'
                    ? textFearGreedIndex.extremeGreed
                    : 'Unknown'}{' '}
          </p>
          <p className="text-center text-sm mt-2">
            {textFearGreedIndex.lastUpdated}:{' '}
            {new Date(fearGreedData?.update_time).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FearGreedWidget

'use client'

import HeatmapWidgte from '@/components/widgets/heatmap'

const Heatmap: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full">
        <HeatmapWidgte />
      </div>
    </main>
  )
}

export default Heatmap

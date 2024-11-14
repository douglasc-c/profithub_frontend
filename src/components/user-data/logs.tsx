import { useLayoutContext } from '@/context/layout-context'
import React from 'react'

const Logs: React.FC = () => {
  const { textSettings } = useLayoutContext()
  return (
    <div className="p-6 bg-zinc-800 rounded-xl max-w-lg w-full space-y-4">
      <h2 className="text-xl font-semibold ">{textSettings.logs}</h2>
      <div className="mt-4">
        <p className="text-sm ">{textSettings.hereAreYourRecentActivityLogs}</p>
      </div>
    </div>
  )
}

export default Logs

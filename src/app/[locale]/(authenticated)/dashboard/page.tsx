'use client'

import CombineWidgets from '@/components/widgets/combine-widgets'
import { useLayoutContext } from '@/context/layout-context'

export default function Dashboard() {
  const { textWidgets } = useLayoutContext()
  return (
    <main className="min-h-screen flex flex-col -mt-10">
      <div className="px-5 py-2">
        <CombineWidgets text={textWidgets} />
      </div>
    </main>
  )
}

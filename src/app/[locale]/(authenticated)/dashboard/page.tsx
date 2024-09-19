'use client'

import CombineWidgets from '@/components/widgets/combine-widgets'
import { useLayoutContext } from '@/context/layout-context'

export default function Dashboard() {
  const { textWidgets } = useLayoutContext()
  return (
    <main>
      <CombineWidgets text={textWidgets} />
    </main>
  )
}

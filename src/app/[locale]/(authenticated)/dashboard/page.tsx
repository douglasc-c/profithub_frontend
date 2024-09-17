'use client'

import CombineWidgets from '@/components/widgets/combine-widgets'

export default function Dashboard() {
  return (
    <main className="min-h-screen flex flex-col -mt-10">
      <div className="px-5 py-2">
        <CombineWidgets />
      </div>
    </main>
  )
}

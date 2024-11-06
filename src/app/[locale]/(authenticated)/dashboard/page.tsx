'use client'

import { useState, useEffect } from 'react'
import CarouselWidgets from '@/components/widgets/carousel-widgets'
import CombineWidgets from '@/components/widgets/combine-widgets'

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <main>{isMobile ? <CarouselWidgets /> : <CombineWidgets />}</main>
}

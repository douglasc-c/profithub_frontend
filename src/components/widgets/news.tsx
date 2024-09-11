import React, { useEffect, useRef, memo } from 'react'

const CointelegraphWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://cointelegraph.com/news-widget'
    script.setAttribute('data-ct-widget-limit', '15')
    script.setAttribute('data-ct-widget-theme', 'dark')
    script.setAttribute('data-ct-widget-size', 'medium')
    script.setAttribute('data-ct-widget-images', 'true')
    script.setAttribute('data-ct-widget-language', 'en')
    script.async = true

    const currentContainer = containerRef.current
    currentContainer.appendChild(script)

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = ''
      }
    }
  }, [])

  return <div className="cointelegraph-widget-container" ref={containerRef} />
}

export default memo(CointelegraphWidget)

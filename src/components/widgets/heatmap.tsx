import React, { memo } from 'react'

const Coin360Widget: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-6rem)]">
      <iframe
        src="https://coin360.com/widget/map?utm_source=embed_map"
        frameBorder="0"
        width="100%"
        height="auto"
        style={{ border: 'none' }}
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default memo(Coin360Widget)

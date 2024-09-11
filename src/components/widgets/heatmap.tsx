import React, { memo } from 'react'

const Coin360Widget: React.FC = () => {
  return (
    <div className="coin360-widget-container">
      <iframe
        src="https://coin360.com/widget/map?utm_source=embed_map"
        frameBorder="0"
        width="1465"
        height="800"
        style={{ border: 'none' }}
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default memo(Coin360Widget)

import { useEffect } from 'react'

const CoinStatsWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://static.coinstats.app/widgets/v5/cs-widget.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="bg-[#0d1218] rounded-2xl border-2 border-[#384a61]">
      <cs-widget
        type="fear-and-greed"
        theme="dark"
        direction="horizontal"
        background="#0d1218"
        is-market-sentiment-visible="true"
        is-last-updated-visible="true"
        title-color="#FFFFFF"
        chart-indicator-one-color="#F02935"
        chart-indicator-two-color="#F07D29"
        chart-indicator-three-color="#9ACB82"
        chart-indicator-four-color="#34B349"
        subtitle-color="#999999"
        last-updated-color="#999999"
        arrow-color="#262626"
      />
    </div>
  )
}

export default CoinStatsWidget

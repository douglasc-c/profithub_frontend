import { useEffect } from 'react'

const CoinConvert = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://widgets.coingecko.com/gecko-coin-converter-widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div>
      <gecko-coin-converter-widget
        locale="en"
        dark-mode="true"
        initial-currency="usd"
        transparent-background="true"
      ></gecko-coin-converter-widget>
    </div>
  )
}

export default CoinConvert

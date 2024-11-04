import React from 'react'

interface ModalHeaderMobileProps {
  svgIcon: string
  coinName: string
  symbol: string
  spreadPercent: number
  withdrawFee: number
  textOpportunity: {
    spread: string
    fee: string
    cancel: string
  }
  onClose: () => void
  adjustSvgSize: (svgContent: string, width: string, height: string) => string
}

const HeaderModalMobile: React.FC<ModalHeaderMobileProps> = ({
  svgIcon,
  coinName,
  symbol,
  spreadPercent,
  withdrawFee,
  textOpportunity,
  onClose,
  adjustSvgSize,
}) => {
  return (
    <div className="flex  items-center">
      <div className="flex items-center space-x-4">
        <div
          className="flex items-center"
          dangerouslySetInnerHTML={{
            __html: adjustSvgSize(svgIcon, '40px', '40px'),
          }}
          aria-label="coin-icon"
        />
        <div className="flex flex-col items-center">
          <p className="font-semibold text-xl">{coinName}</p>
          <p className="font-semibold text-xl">({symbol})</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-center space-y-1">
        <p className="text-sm">
          {textOpportunity.spread}: {spreadPercent}%
        </p>
        <p className="text-sm">
          {textOpportunity.fee}: 0.60% + $ {withdrawFee}
        </p>
      </div>
      <button
        className="bg-red-500 p-2 rounded-md text-white text-sm"
        onClick={onClose}
      >
        {textOpportunity.cancel}
      </button>
    </div>
  )
}

export default HeaderModalMobile

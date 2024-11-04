import React from 'react'

interface ModalHeaderDesktopProps {
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

const ModalHeaderDesktop: React.FC<ModalHeaderDesktopProps> = ({
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
    <header className="flex  justify-between items-center px-10 ">
      <section className="flex items-center space-x-4">
        <div
          className="flex items-center"
          dangerouslySetInnerHTML={{
            __html: adjustSvgSize(svgIcon, '50px', '50px'),
          }}
          aria-label="coin-icon"
        />
        <div className="flex flex-row items-center">
          <p className="font-semibold text-2xl">{coinName}</p>
          <p className="font-semibold text-2xl ml-2">({symbol})</p>
        </div>

        <section className="flex flex-row items-center space-x-5">
          <p className="text-base">
            {textOpportunity.spread}: {spreadPercent}%
          </p>
          <p className="text-base">
            {textOpportunity.fee}: 0.60% + $ {withdrawFee}
          </p>
        </section>
      </section>
      <button
        className="bg-red-500 text-white rounded-md h-fit py-1 px-3 text-[1rem]"
        onClick={onClose}
      >
        {textOpportunity.cancel}
      </button>
    </header>
  )
}

export default ModalHeaderDesktop

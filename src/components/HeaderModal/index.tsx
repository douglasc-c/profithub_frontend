import ModalHeaderDesktop from '../HeaderModalDeskop'
import ModalHeaderMobile from '../HeaderModalMobile'

interface HeaderModalProps {
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

export function HeaderModal({
  svgIcon,
  coinName,
  symbol,
  spreadPercent,
  withdrawFee,
  textOpportunity,
  onClose,
  adjustSvgSize,
}: HeaderModalProps) {
  return (
    <main>
      <div className="md:hidden">
        <ModalHeaderMobile
          svgIcon={svgIcon}
          coinName={coinName}
          symbol={symbol}
          spreadPercent={spreadPercent}
          withdrawFee={withdrawFee}
          textOpportunity={textOpportunity}
          onClose={onClose}
          adjustSvgSize={adjustSvgSize}
        />
      </div>
      <div className="hidden md:block">
        <ModalHeaderDesktop
          svgIcon={svgIcon}
          coinName={coinName}
          symbol={symbol}
          spreadPercent={spreadPercent}
          withdrawFee={withdrawFee}
          textOpportunity={textOpportunity}
          onClose={onClose}
          adjustSvgSize={adjustSvgSize}
        />
      </div>
    </main>
  )
}

export default HeaderModal

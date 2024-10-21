'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

interface Data {
  symbol: string
  coinName: string
  svgIcon: string
  exchangeBuy: string
  exchangeSell: string
  buyPrice: number
  sellPrice: number
  spreadPercent: number | string
  withdrawFee: number | string
}

type OnModal = () => void

interface CardProps {
  data: Data
  onModal: OnModal
}

const adjustSvgSize = (svgContent: string, width: string, height: string) => {
  return svgContent
    .replace(/width="[^"]*"/, `width="${width}"`)
    .replace(/height="[^"]*"/, `height="${height}"`)
}

export function Card({ data, onModal }: CardProps) {
  const { textOpportunity } = useLayoutContext()

  const formatWithdrawFee = (fee: string | number) => {
    if (typeof fee === 'string') {
      const numericFee = parseFloat(fee)
      return numericFee > 0.01 ? numericFee : 0.0
    } else {
      return fee > 0.01 ? fee : 0.0
    }
  }

  return (
    <div className="justify-between bg-black bg-opacity-50 translate-x-1 p-5 rounded-lg border border-gray-700 border-opacity-50">
      {/* Ajustando o tamanho do SVG dinamicamente */}
      <div
        className="py-4"
        dangerouslySetInnerHTML={{
          __html: adjustSvgSize(data.svgIcon, '30px', '30px'), // Defina o tamanho desejado
        }}
        aria-label="coin-icon"
        style={{
          display: 'block',
          width: '20px', // Definindo o tamanho manualmente
          height: '20px',
          objectFit: 'contain',
        }}
      />
      <h1 className="text-center font-bold mb-2">
        {data.coinName} ({data?.symbol})
      </h1>
      <div className="flex justify-between border-b border-t-[0.01rem] border-gray-700 p-2">
        <section className="flex flex-col w-1/2 items-start">
          <p className="text-sm font-semibold uppercase">
            {textOpportunity.buy}
          </p>
          <div className="flex h-20 items-center">
            <Image
              className="py-4"
              src={`/images/exchanges/${data.exchangeBuy}.svg`}
              alt="buy"
              height={50}
              width={50}
            />
          </div>
          <p className="text-sm">
            <b>$ {data?.buyPrice}</b>
          </p>
        </section>
        <Image
          src="/images/svg/iconArrow.svg"
          alt="arrow"
          className="mx-2"
          width={20}
          height={30}
        />
        <section className="flex flex-col w-1/2 items-end justify-end">
          <p className="text-sm font-semibold uppercase">
            {textOpportunity.sell}
          </p>
          <div className="flex h-20 items-center">
            <Image
              className="py-4"
              src={`/images/exchanges/${data.exchangeSell}.svg`}
              alt="sell"
              height={50}
              width={50}
            />
          </div>
          <p className="text-sm text-right">
            <b>$ {data?.sellPrice}</b>
          </p>
        </section>
      </div>
      <div className="flex justify-between p-2">
        <section>
          <p className="text-xs py-1 font-semibold uppercase">
            {textOpportunity.spread}
          </p>
          <p className="text-xs text-green-500 font-bold">
            {data?.spreadPercent}%
          </p>
        </section>
        <section>
          <p className="text-xs text-right py-1 font-semibold uppercase">
            {textOpportunity.fee}
          </p>
          <p className="text-xs font-bold text-right text-red-500">
            0.60% + $ {formatWithdrawFee(data?.withdrawFee)}
          </p>
        </section>
      </div>
      <div className="flex items-center justify-center mt-2">
        <button
          onClick={onModal}
          className="bg-gradient-to-b from-[#3d2b70] via-[#784bb2] to-[#4c00a3] text-sm py-2 rounded-md w-full"
        >
          {textOpportunity.operationDetails}
        </button>
      </div>
    </div>
  )
}

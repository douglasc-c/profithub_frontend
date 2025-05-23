'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'
import ButtonGlobal from '../buttons/global'

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

  // const adjustSvgSize = (svgContent: string, width: string, height: string) => {
  //   return svgContent
  //     .replace(/width="[^"]*"/, `width="${width}"`)
  //     .replace(/height="[^"]*"/, `height="${height}"`)
  // }

  return (
    <div className="justify-between bg-black bg-opacity-50 translate-x-1 p-5 rounded-lg border border-gray-700 border-opacity-50">
      <div className="flex justify-center items-center space-x-3 pb-3">
        {/* <div
          className=""
          dangerouslySetInnerHTML={{
            __html: adjustSvgSize(data.svgIcon, '30px', '30px'),
          }}
          aria-label="coin-icon"
          style={{}}
        /> */}
        <h1 className="font-bold">
          {data.coinName} ({data?.symbol})
        </h1>
      </div>
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
        <ButtonGlobal
          onClick={onModal}
          params={{
            title: textOpportunity.operationDetails,
            color: 'bg-custom-gradient',
          }}
        />
      </div>
    </div>
  )
}

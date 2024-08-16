'use client'

import Image from 'next/image'

export function Card({ data, onModal, text }: any) {
  return (
    <div className="justify-between bg-stone-950 p-5 rounded-lg border border-gray-700">
      <h1 className="text-center font-bold mb-2">{data?.symbol}</h1>
      <div className="flex justify-between border-b border-t-[0.01rem] border-gray-700 p-2">
        <section className="flex flex-col w-1/2 items-start">
          <p className="text-sm font-semibold uppercase">{text.buy}</p>
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
          <p className="text-sm font-semibold uppercase">{text.sell}</p>
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
          <p className="text-xs py-1 font-semibold uppercase">{text.spread}</p>
          <p className="text-xs text-green-500 font-bold">
            {data?.spreadPercent}%
          </p>
        </section>
        <section>
          <p className="text-xs text-right py-1 font-semibold uppercase">
            {text.fee}
          </p>
          <p className="text-xs font-bold text-right text-red-500">
            0.60% + $ {data?.withdrawFee > 0.01 ? data?.withdrawFee : '0.00'}
          </p>
        </section>
      </div>
      <div className="flex items-center justify-center mt-2">
        <button
          onClick={onModal}
          className="bg-[#005BEC] text-sm py-2 rounded-md w-full"
        >
          {text.orderBook}
        </button>
      </div>
    </div>
  )
}

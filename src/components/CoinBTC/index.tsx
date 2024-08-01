import RastreadorBTC from "../RastreadorBTC";
import IconBtc from '../../assets/png/btcIcon.svg'
import Image from 'next/image'

interface IProsdata {
  data: [] | any
  minBidPrice: string | number | any
  maxAskPrice: string | number | any
}

export default function CoinBTC({ data, minBidPrice, maxAskPrice }: IProsdata) {
  return (

    <section className="flex flex-col bg-[#18181b] w-[24%] rounded-xl px-4 py-4 ">
      <div className="flex justify-center items-center w-full py-4 bold">
        <Image alt="IconBtc" className="pr-2" src={IconBtc} width={40} height={20} /> <b>Bitcoin (BTC)</b>
      </div>
      <section className="flex flex-row justify-between px-4 ">
        <div className="text-center ">Corretora</div>
        <div className="text-center ">Buy</div>
        <div className="text-center ">Sell</div>
      </section>
      {data.map((item: any, index: number) => (
        <RastreadorBTC data={item} key={index} minBid={minBidPrice} maxAsk={maxAskPrice} />
      ))}
    </section>

  )
}
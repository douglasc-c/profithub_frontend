
import Image from 'next/image';


import IconUSDT from '../../assets/png/priceTracker/tether.svg'
import RastreadorBTC from '../RastreadorBTC';

interface IProsdata {
  data: [] | any
  minBidPriceuUSDT: string | number | any
  maxAskPriceUSDT: string | number | any
}
export default function CoinUSDT({ data, minBidPriceuUSDT, maxAskPriceUSDT }: IProsdata) {
  return (
    <section className="flex flex-col bg-[#1f1f23] w-[24%] justify-start rounded-lg px-4 py-4">
      <div className="flex justify-center items-center w-full py-4">
        <Image alt="I" className="pr-2" src={IconUSDT} width={40} height={20} /> <b>USDT</b>
      </div>
      <section className="flex flex-row justify-between px-4 ">
        <div className="text-center ">Corretora</div>
        <div className="text-center ">Buy</div>
        <div className="text-center ">Sell</div>
      </section>
      {data.map((item: any, index: number) => (
        <RastreadorBTC data={item} key={index} minBid={minBidPriceuUSDT} maxAsk={maxAskPriceUSDT} />
      ))}
    </section>
  )
}
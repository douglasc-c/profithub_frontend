
import Image from 'next/image';

import IconEth from '../../assets/png/iconEth.svg';
import RastreadorBTC from '../RastreadorBTC';

interface IProsdata {
  data: [] | any
  minBidPriceETH: string | number | any
  maxAskPriceETH: string | number | any
}


export default function CoinETH({ data, minBidPriceETH, maxAskPriceETH }: IProsdata) {
  return (
    <section className="flex flex-col bg-[#1f1f23] w-[24%] justify-center rounded-lg px-4 py-4">
      <div className="flex justify-center items-center w-full py-4">
        <Image alt="IconEth" className="pr-2" src={IconEth} width={40} height={20} /> <b>Ethereum (ETH)</b>
      </div>
      <section className="flex flex-row justify-between px-4 ">
        <div className="text-center ">Corretora</div>
        <div className="text-center ">Buy</div>
        <div className="text-center ">Sell</div>
      </section>
      {data.map((item: any, index: number) => (
        <RastreadorBTC data={item} key={index} minBid={minBidPriceETH} maxAsk={maxAskPriceETH} />
      ))}

    </section>
  )
}
import RastreadorBTC from "../RastreadorBTC";
import IconSol from '../../assets/png/iconSol.svg'
import Image from 'next/image'

interface IProsdata {
  data: [] | any
  minBidPriceSOL: string | number | any
  maxAskPriceSOL: string | number | any
}
export default function IconSOL({ data, minBidPriceSOL, maxAskPriceSOL }: IProsdata) {
  return (
    <section className="flex flex-col   bg-[#1f1f23] w-[24%] justify-start rounded-lg px-4 py-4 ">
      <div className="flex justify-center items-center w-full py-4">
        <Image alt="IconSol" className="pr-2" src={IconSol} width={40} height={20} /> <b>Solana (SOL)</b>
      </div>
      <section className="flex flex-row justify-between px-4 ">
        <div className="text-center ">Corretora</div>
        <div className="text-center ">Buy</div>
        <div className="text-center ">Sell</div>
      </section>
      {data.map((item: any, index: number) => (
        <RastreadorBTC data={item} key={index} minBid={minBidPriceSOL} maxAsk={maxAskPriceSOL} />
      ))}

    </section>
  )
}
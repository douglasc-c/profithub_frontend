import IconBinance from '../assets/png/priceTracker/binance.svg';
import IconBybit from '../assets/png/priceTracker/iconBybit.svg';
import IconBitfinex from '../assets/png/priceTracker/iconBitfinex.svg';
import IconOKX from '../assets/png/priceTracker/iconOkx.svg'
import IconCryptocom from '../assets/png/priceTracker/iconCryptoCom.svg'
import IconCoinbase from '../assets/png/priceTracker/iconCoinbse.svg'
import IconBitGet from '../assets/png/priceTracker/iconBitget.svg'
import IconKucoin from '../assets/png/priceTracker/iconKucoin.svg'
import IconGateio from '../assets/png/priceTracker/iconGetIo.svg'
import IconKraken from '../assets/png/priceTracker/iconKraken.svg'



import Image from 'next/image'; // Example import if using Next.js

interface IPropsDataRastreador { // Corrected interface name
  corretora: string,
  symbol: string,
  lastPrice: string,
  bidPrice: string,
  askPrice: string
}

interface IPropsData {
  data: IPropsDataRastreador,
  minBid: number,
  maxAsk: number
}

function handleRenderIcon(data: IPropsDataRastreador) {
  const corretoraLower = data.corretora.toLowerCase(); // Normalize to lower case
  if (corretoraLower === 'binance') {
    return IconBinance;
  }
  if (corretoraLower === 'bybit') {
    return IconBybit;
  }
  if (corretoraLower === 'bitfinex') {
    return IconBitfinex;
  }
  if (corretoraLower === 'okx') {
    return IconOKX;
  }
  if (corretoraLower === 'cryptocom') {
    return IconCryptocom;
  }
  if (corretoraLower === 'coinbase') {
    return IconCoinbase;
  }
  if (corretoraLower === 'bitget') {
    return IconBitGet;
  }
  if (corretoraLower === 'kucoin') {
    return IconKucoin;
  }
  if (corretoraLower === 'gateio') {
    return IconGateio;
  }
  if (corretoraLower === 'kraken') {
    return IconKraken;
  }
}

export default function RastreadorBTC({ data, minBid, maxAsk }: IPropsData) {
  return (
    <main className="antialiased px-4 py-1">
      <section className="flex flex-row justify-between text-sm ">
        <section className="flex items-center ">

          <Image className="text-center " src={handleRenderIcon(data)} width={25} height={30} alt="Corretora Icon" />
          <div className={`text-center w-20 p-2 rounded-sm text-white bold}`}>
            {data?.corretora}
          </div>
        </section>
        <div className={`text-center w-20 p-2 rounded-sm text-white bold ${Number(data.bidPrice) === minBid ? 'bg-green-500' : ''}`}>
          {Number(data.bidPrice).toFixed(2)}
        </div>
        <div className={`text-center w-20 p-2 rounded-sm text-white bold ${Number(data.askPrice) === maxAsk ? 'bg-red-500' : ''}`}>
          {Number(data.askPrice).toFixed(2)}
        </div>
      </section>
    </main>
  )
}

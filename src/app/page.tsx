'use client';
import RastreadorBTC from '../components/RastreadorBTC';
import RastreadorETH from '../components/RastreadorBTC';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import io from 'socket.io-client';
import IconBtc from '../assets/png/btcIcon.svg'
import IconEth from '../assets/png/iconEth.svg'
import IconSol from '../assets/png/iconSol.svg'
import RastreadorSOL from '@/components/RastreadorSOL';
import IconUSDT from '../assets/png/priceTracker/tether.svg'

export default function Home() {
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [solData, setSolData] = useState([]);
  const [usdtData, setUSDTData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectBook, setIsSelectBook] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3333/', { transports: ['websocket'] });

    socket.on('connect', () => {
      ['BTC', 'SOL', 'BNB', 'USDT'].forEach(coin => socket.emit('subscribeTo', coin));
    });

    socket.on('connect_error', (error) => {
      console.error('Erro ao conectar:', error);
    });

    socket.on('updateData-BTC', (data) => {
      setBtcData(data);
    });
    socket.on('updateData-ETH', (data) => {
      setEthData(data);
    });
    socket.on('updateData-SOL', (data) => {
      setSolData(data);
    });
    socket.on('updateData-USDT', (data) => {
      setUSDTData(data);
    });

    return () => {
      ['BTC', 'SOL', 'BNB', 'USDT'].forEach(coin => {
        socket.emit('unsubscribeFrom', coin);
        socket.off(`updateData-${coin}`);
      });
      socket.disconnect();
    };
  }, []);

  function onLoadIsOpenModal(item) {
    setIsSelectBook(item);
    setIsOpen(true);
  }

  const minBidPrice = btcData.reduce((min, item) => Math.min(min, Number(item.bidPrice)), Infinity);
  const maxAskPrice = btcData.reduce((max, item) => Math.max(max, Number(item.askPrice)), -Infinity);
  const minBidPriceETH = ethData.reduce((min, item) => Math.min(min, Number(item.bidPrice)), Infinity);
  const maxAskPriceETH = ethData.reduce((max, item) => Math.max(max, Number(item.askPrice)), -Infinity);
  const minBidPriceSOL = solData.reduce((min, item) => Math.min(min, Number(item.bidPrice)), Infinity);
  const maxAskPriceSOL = solData.reduce((max, item) => Math.max(max, Number(item.askPrice)), -Infinity);
  const minBidPriceuUSDT = usdtData.reduce((min, item) => Math.min(min, Number(item.bidPrice)), Infinity);
  const maxAskPriceUSDT = usdtData.reduce((max, item) => Math.max(max, Number(item.askPrice)), -Infinity);

  return (
    <main className=" flex flex-row flex-wrap justify-between w-full bg-[#18181b] px-14 py-10 antialiased">
      <section className="flex w-[30%] flex-col bg-[#28282d] rounded-lg">
        <main className="">
          <div className="flex justify-center items-center w-full  mt-4">
            <Image alt="iconbtc" className="mb-4" src={IconBtc} width={40} height={20} />
          </div>
          <section className="flex justify-between items-center px-4">
            <div className="text-center w-20">Corretora</div>
            <div className="text-center w-20">Buy</div>
            <div className="text-center w-20">Sell</div>
          </section>

          {btcData.map((item, index) => (
            <RastreadorBTC data={item} key={index} minBid={minBidPrice} maxAsk={maxAskPrice} />
          ))}
        </main>
      </section>
      <section className="flex w-[30%] flex-col bg-[#28282d] rounded-lg">
        <main className="">
          <div className="flex justify-center items-center w-full mt-4 ">
            <Image alt="IconSol" className="mb-4" src={IconSol} width={40} height={20} />
          </div>
          <section className="flex justify-between items-center">
            <div className="text-center w-20">Corretora</div>
            <div className="text-center w-20">Buy</div>
            <div className="text-center w-20">Sell</div>
          </section>
          {solData.map((item, index) => (
            <RastreadorBTC data={item} key={index} minBid={minBidPriceSOL} maxAsk={maxAskPriceSOL} />
          ))}
        </main>
      </section>
      <section className="flex w-[30%] flex-col bg-[#1f1f23] rounded-lg">
        <main className="">
          <div className="flex justify-center items-center w-full mt-4">
            <Image alt="IconEth" className="mb-4" src={IconEth} width={40} height={20} />
          </div>
          <section className="flex justify-between items-center">
            <div className="text-center w-20">Corretora</div>
            <div className="text-center w-20">Buy</div>
            <div className="text-center w-20">Sell</div>
          </section>

          {ethData.map((item, index) => (
            <RastreadorETH data={item} key={index} minBid={minBidPriceETH} maxAsk={maxAskPriceETH} />
          ))}
        </main>
      </section>
      <section className="flex w-[30%] flex-col bg-[#1f1f23] rounded-lg mt-10">
        <main className="">
          <div className="flex justify-center items-center w-full mt-4">
            <Image alt="IconUSDT" className="mb-4" src={IconUSDT} width={40} height={20} />
          </div>
          <section className="flex justify-between items-center">
            <div className="text-center w-20">Corretora</div>
            <div className="text-center w-20">Buy</div>
            <div className="text-center w-20">Sell</div>
          </section>

          {usdtData?.map((item, index) => (
            <RastreadorETH data={item} key={index} minBid={minBidPriceuUSDT} maxAsk={maxAskPriceUSDT} />
          ))}
        </main>
      </section>
    </main>
  );
}

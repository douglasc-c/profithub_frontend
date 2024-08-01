'use client';
import { BoxOportunity } from '@/components/BoxOportunity';
import { ModalBook } from '@/components/ModalBook';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [oportunidades, setOportunidades] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelectBook, setIsSelectBook] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3334');

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
    });

    socket.on('allArbitrageOpportunities', (data) => {
      console.log(data);
      setOportunidades(data);
    });

    return () => {
      socket.off('allArbitrageOpportunities');
      socket.close();
    };
  }, []);

  function onLoadIsOpenModal(item: any) {
    setIsSelectBook(item);
    setIsOpen(true);
  }

  return (
    <main className="grid grid-cols-4 auto-rows-auto flex-wrap w-full bg-[#18181b] auto px-28 py-10">
      <ModalBook isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} data={isSelectBook} />
      {oportunidades?.map((item, index) => (
        <BoxOportunity key={index} data={item} onModal={() => onLoadIsOpenModal(item)} />
      ))}
    </main>
  );
}

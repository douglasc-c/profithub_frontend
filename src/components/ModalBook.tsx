'use client'

import MercadBitcoin from '../assets/png/icon_mb.svg'
import Binance from '../assets/png/icon_binance.svg'

import React, { useState } from 'react';
import Image from 'next/image'

export function ModalBook({ isOpen, onClose, children, data }) {
    const [isSelected, setIsSelected] = useState('buy');
    const [orders, setOrders] = useState([
        {"price": "100.00", "volume": "5", "liquidity": "500.00"},
        {"price": "101.00", "volume": "10", "liquidity": "1010.00"},
        {"price": "102.00", "volume": "15", "liquidity": "1530.00"},
        {"price": "103.00", "volume": "20", "liquidity": "2060.00"},
        {"price": "104.00", "volume": "25", "liquidity": "2600.00"}
    ]);

    if (!isOpen) return null;



    const onSelectBuy = () => setIsSelected('buy');
    const onSelectSell = () => setIsSelected('sell');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
            <div className="bg-[#2f2f35] rounded-t-md rounded-b-md shadow-lg max-w-md w-full">
                <section className="items-center justify-between flex">
                    <button 
                        className={`border-b-4 p-4 ${isSelected === 'buy' ? 'border-green-600' : 'border-[#2f2f35]'} w-[50%] text-xs`}
                        onClick={onSelectBuy}>
                        Book Buy
                    </button>
                    <button 
                        className={`border-b-4 p-4 ${isSelected === 'sell' ? 'border-red-600' : 'border-[#2f2f35]'} w-[50%] text-xs`}
                        onClick={onSelectSell}>
                        Book Sell
                    </button>
                   
                </section>
                <div className="flex justify-between px-16 py-3 ">
                    <Image src={data?.corretoraCompra === 'MercadoBitcoin' ? MercadBitcoin :Binance   } height={40} width={60} alt="corretoracompra"/>           <Image src={data?.corretoraVenda === 'MercadoBitcoin' ? MercadBitcoin :Binance} height={40} width={60} alt="corretoravenda"/>   
                </div>
                <div className="overflow-x-auto h-44 ">
                <table className="min-w-full text-sm text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 bg-[#2f2f35] uppercase dark:text-gray-400 border-b ">
                        <tr>
                            <th scope="col" className="w-1/3 px-6 py-3 text-left">Preço</th>
                            <th scope="col" className="w-1/3 px-6 py-3 text-center">Volume</th>
                            <th scope="col" className="w-1/3 px-6 py-3 text-right">Liquidez</th>
                        </tr>
                    </thead>
                <tbody className="h-32 overflow-y-auto ">
                    {isSelected === 'buy' ? 
                        data?.orderbookCompra?.asks?.map((order, index) => (
                            <tr key={index} className="bg-[#2f2f35] border-b bg-[#2f2f35] dark:border-gray-700">
                                <td className="w-1/3 px-6 py-2 text-xs text-left">{order[0]}</td>
                                <td className="w-1/3 px-6 py-2 text-xs text-center">{'v'}</td>
                                <td className="w-1/3 px-6 py-2 text-xs text-right">{order[1]}</td>
                            </tr>
                        ))
                            : 
                        data?.orderbookVenda?.bids?.map((order, index) => (
                            <tr key={index} className="border-b bg-[#2f2f35] dark:border-gray-700">
                                <td className="w-1/3 px-6 py-2 text-xs text-left">{order[0]}</td>
                                <td className="w-1/3 px-6 py-2 text-xs text-center">{'v'}</td>
                                <td className="w-1/3 px-6 py-2 text-xs text-right">{order[1]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
            </table>
       </div>
       <section className="flex items-center justify-center">
                  <button className="items-center justify-center flex bg-red-500 w-[40%] p-1 m-2 rounded-md" onClick={onClose}>Cancel</button>
        </section>
             {children}
        </div>
        </div>
    );
}

'use client'
import Image from 'next/image'
import MercadBitcoin from '../assets/png/icon_mb.svg'
import Binance from '../assets/png/icon_binance.svg'
import IconArrow from '../assets/png/iconArrow.svg'
import { useState } from 'react';

export function BoxOportunity({data, onModal}:any){

    function discoveryExchangeBuy(){
        if(data?.corretoraCompra === "MercadoBitcoin"){
            return MercadBitcoin
        }else{
            return Binance
        }
    }

    function discoveryExchangeSell(){
        if(data?.corretoraVenda === "MercadoBitcoin"){
            return MercadBitcoin
        }else{
            return Binance
        }
    }

    return(
        <div className="justify-between bg-black p-2 rounded-lg m-2">
            <h1 className="text-center p-2 px-2" >{data?.symbol}</h1>
            <div className="flex justify-between border-t border-b border-t-[0.01rem] border-b-[0.01rem] border-[#8000FF] p-2">
                <section className="">
                    <p className="text-[0.8rem] ">COMPRA</p>
                    <Image className="py-4" src={discoveryExchangeBuy()} alt="mercadobitcoin" height={50} width={40} />
                     <p className="text-[0.8rem]"><b>$ {data?.priceCompra}</b></p>
                </section>
                <Image src={IconArrow} alt="arrow" className="mx-2" width={20} height={30} />
                <section className="">
                <p className="text-[0.8rem]  text-right">VENDA</p>
                    <Image className="py-4 flex items-end" src={discoveryExchangeSell()} alt="mercadobitcoin"  height={50} width={40} />
                    <p className="text-[0.8rem] text-right"><b>$ {data?.priceVenda}</b></p>
                    {/* <p className="text-[0.8rem]">Spread</p> */}
                    {/* <li className="text-[0.6rem]">5,56%</li> */}
                </section>
            </div>
            <div className="flex justify-between p-2">
                <section>
                    <p className="text-[0.6rem] py-1">SPREAD</p> 
                    <p className="text-[0.7rem] text-green-400 font-bold">{data?.spreadPercent}%</p>
                </section>
                <section>
                     <p className="text-[0.6rem] text-right py-1">TAXAS</p> 
                     <p className="text-[0.7rem] font-bold text-right text-red-500">0.60% + $ {data?.withdrawFee > 0.01 ? data?.withdrawFee : '0.00'}</p>
                </section>
            </div>
            <main className="flex items-center justify-center"><button  onClick={onModal}  className="bg-[#8000FF] mb-1 p-1 text-[0.6rem] py-2 rounded-md w-full">Orderbook</button></main>
        </div>
    )
}
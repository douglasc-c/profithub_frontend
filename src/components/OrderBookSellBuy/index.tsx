import React, { useState, useEffect, useRef } from 'react';

type IPropsData = {
  data: { minBid: number, maxAsk: number }
}

type Operation = {
  minBid: number,
  maxAsk: number,
  spread: number,
  percentage: number,
  profit: number,
  fee: number
}

export default function OrderBookSellBuy({ data }: IPropsData) {
  const [history, setHistory] = useState<Operation[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [operationCount, setOperationCount] = useState(0);
  const isProcessingRef = useRef(false);
  const dataQueueRef = useRef<IPropsData['data'][]>([]);




  useEffect(() => {
    const processQueue = () => {
      if (isProcessingRef.current || dataQueueRef.current.length === 0) {
        return;
      }

      isProcessingRef.current = true;
      const currentData = dataQueueRef.current.shift();

      if (!currentData) {

        isProcessingRef.current = false;
        return;
      }


      const calculateSpreadPercentage = (data: IPropsData['data']) => {
        const { minBid, maxAsk } = data;

        if (minBid === undefined || maxAsk === undefined || minBid === maxAsk || minBid === null || maxAsk === null || isNaN(minBid) || isNaN(maxAsk)) {
          return null;
        }

        const spread = maxAsk - minBid;
        const percentage = (spread / minBid) * 100;
        const feeRate = 0.0014; // Taxa de 0.0200%
        const tradeAmount = 0.3; // Tamanho da operação
        const fee = maxAsk * feeRate * tradeAmount;
        const profit = (spread * tradeAmount) - fee;

        if (!isFinite(spread) || !isFinite(percentage) || !isFinite(profit) || !isFinite(fee)) {
          return null;
        }

        return { spread, percentage, minBid, maxAsk, profit, fee };
      }

      const newOperation = calculateSpreadPercentage(currentData);
      if (!newOperation) {
        isProcessingRef.current = false;
        return;
      }

      setHistory(prevHistory => {
        if (prevHistory.length > 0) {
          const lastOperation = prevHistory[0];

          if (lastOperation.minBid === newOperation.minBid && lastOperation.maxAsk === newOperation.maxAsk) {
            isProcessingRef.current = false;
            return prevHistory;
          }
        }

        const newHistory = [newOperation, ...prevHistory];
        if (newHistory.length > 5) {
          newHistory.pop();
        }
        return newHistory;
      });

      setTotalProfit(prevTotalProfit => {
        const updatedTotalProfit = prevTotalProfit + newOperation.profit;
        return updatedTotalProfit;
      });

      setOperationCount(prevCount => {
        const updatedCount = prevCount + 1;
        return updatedCount;
      });

      isProcessingRef.current = false;
    }

    const interval = setInterval(() => {
      processQueue();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    if (data.minBid !== undefined && data.maxAsk !== undefined && !isNaN(data.minBid) && !isNaN(data.maxAsk)) {
      if (isFinite(data.minBid) && isFinite(data.maxAsk)) {
        dataQueueRef.current.push(data);
      } else {
        console.error('Data contains Infinity values:', data);
      }
    } else {
      console.error('Data is invalid:', data);
    }
  }, [data]);

  return (
    <section className="my-8 bg-[#18181b] px-2 rounded-xl w-[100%] ">
      <div className="flex justify-between  px-8 py-2">
        <div>Compra</div>
        <div>Venda</div>
        <div>Spread</div>
        <div>Tamanho</div>
        <div>Taxa</div>
        <div>Lucro</div>
      </div>
      <div className="pb-8">
        <ul className="rounded-lg">
          <section className="flex items-end py-4 justify-between px-6 ">
            <h1 className="mr-4">Lucro Acumulado: $ {totalProfit.toFixed(2)}</h1>
            <h2>Operações Realizadas: {operationCount}</h2>
          </section>
          {history.map((operation, index) => (
            <li
              key={index}
              className={`flex justify-between mb-2 px-4 py-2 rounded-md antialiased text-sm ${index === 0 ? 'bg-green-500' : 'bg-[#282828]'}`}
            >
              <div>$ {operation.minBid.toFixed(2)}</div>
              <div>$ {operation.maxAsk.toFixed(2)}</div>
              <div>{operation.percentage.toFixed(2)}%</div>
              <div>0.3 BTC</div>
              <div>$ {operation.fee.toFixed(3)}</div>
              <div>$ {operation.profit.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

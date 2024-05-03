interface IProsDataRastreador {
  corretora: string,
  symbol: string,
  lastPrice: string,
  bidPrice: string,
  askPrice: string
}

interface IPropsData {
  data: IProsDataRastreador,
  minBid: number,
  maxAsk: number
}

export default function Rastreador({ data, minBid, maxAsk }: IPropsData) {
  return (
    <main className=" antialiased ">
      <section className="flex flex-row justify-between  text-sm py-1 my-2">
        <div className="text-center w-20 p-1 ">{data.corretora}</div>
        <div className={`text-center  w-20 p-1 rounded-sm text-white bold ${Number(data.bidPrice) === minBid ? 'bg-green-500' : ''}`}>
          {Number(data.bidPrice).toFixed(2)}
        </div>
        <div className={`text-center w-20 p-1 rounded-sm text-white bold ${Number(data.askPrice) === maxAsk ? 'bg-red-500' : ''}`}>
          {Number(data.askPrice).toFixed(2)}
        </div>
      </section>
    </main>
  )
}

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

export default function RastreadorSOL({ data, minBid, maxAsk }: IPropsData) {
  return (
    <main>
      <section className="flex flex-row justify-between py-[0.10rem]">
        <div className="text-center w-8">{data.corretora}</div>
        <div className="text-center w-8" style={{ color: Number(data.bidPrice) === minBid ? 'green' : 'inherit' }}>
          {Number(data.bidPrice).toFixed(2)}
        </div>
        <div className="text-center w-[14%]" style={{ color: Number(data.askPrice) === maxAsk ? 'red' : 'inherit' }}>
          {Number(data.askPrice).toFixed(2)}
        </div>
      </section>
    </main>
  )
}

'use client'

import { useLayoutContext } from '@/context/layout-context'

interface Network {
  exchange: string
  network: string
  symbol: string
  withdrawFee: string
}

interface NetworkProps {
  networksBuy: Network[]
  networksSell: Network[]
}

export function Networks({ networksBuy, networksSell }: NetworkProps) {
  const { textNetwork } = useLayoutContext()

  const uniqueNetworks = Array.from(
    new Set([...networksBuy, ...networksSell].map((net) => net.network)),
  ).map((network) => {
    const buyNetwork = networksBuy.find((buy) => buy.network === network)
    const sellNetwork = networksSell.find((sell) => sell.network === network)

    return {
      network,
      withdrawFee:
        buyNetwork?.withdrawFee || sellNetwork?.withdrawFee || '0.00',
      isAvailableForWithdraw: !!sellNetwork,
      isAvailableForDeposit: !!buyNetwork,
    }
  })

  return (
    <div className="flex flex-col border border-gray-600 rounded-xl w-full max-w-full overflow-hidden">
      <h2 className="text-xl font-medium pt-3 pl-3">{textNetwork.networks}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead className="border-b">
            <tr className="text-white text-base">
              <th className="p-2">{textNetwork.network}</th>
              <th className="p-2">{textNetwork.withdrawalValue}</th>
              <th className="p-2">{textNetwork.avaliableForWithdrawal}</th>
              <th className="p-2">{textNetwork.avaliableForDeposit}</th>
            </tr>
          </thead>
          <tbody>
            {uniqueNetworks.map((networkData, index: number) => (
              <tr
                key={index}
                className={`text-sm font-medium text-white ${
                  index % 2 === 0 ? 'bg-zinc-900' : ''
                }`}
              >
                <td className="p-2 uppercase">{networkData.network}</td>
                <td className="p-2">$ {networkData.withdrawFee}</td>
                <td className="p-2">
                  {networkData.isAvailableForWithdraw
                    ? textNetwork.available
                    : textNetwork.notAvailable}
                </td>
                <td className="p-2">
                  {networkData.isAvailableForDeposit
                    ? textNetwork.available
                    : textNetwork.notAvailable}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

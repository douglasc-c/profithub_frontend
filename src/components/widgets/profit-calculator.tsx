'use client'

import { useLayoutContext } from '@/context/layout-context'
import React, { useState } from 'react'

interface ProfitCalculatorProps {}

const ProfitCalculator: React.FC<ProfitCalculatorProps> = () => {
  const { textProfitCalculator } = useLayoutContext()
  const [saleValue, setSaleValue] = useState<number>(0)
  const [taxPercentage, setTaxPercentage] = useState<number>(0)
  const [purchaseValue, setPurchaseValue] = useState<number>(0)
  const [volume, setVolume] = useState<number>(0)
  const [withdrawalValue, setWithdrawalValue] = useState<number>(0)

  const calculateProfit = () => {
    const netSaleValue = saleValue - saleValue * (taxPercentage / 100)
    const profitPerUnit = netSaleValue - purchaseValue
    const grossProfit = volume * profitPerUnit
    const netProfit = grossProfit - withdrawalValue
    return { netSaleValue, profitPerUnit, grossProfit, netProfit }
  }

  const { netSaleValue, profitPerUnit, grossProfit, netProfit } =
    calculateProfit()

  return (
    <div className="p-3 rounded-2xl border border-gray-600 w-full max-w-full overflow-hidden">
      <h2 className="text-xl font-medium mb-3">
        {textProfitCalculator.profitCalculator}
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.buyValue}:
          </label>
          <input
            type="number"
            value={purchaseValue}
            onChange={(e) => setPurchaseValue(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-600 rounded-md w-full bg-stone-950"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.sellValue}:
          </label>
          <input
            type="number"
            value={saleValue}
            onChange={(e) => setSaleValue(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-600 rounded-md w-full bg-stone-950"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.volume}:
          </label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-600 rounded-md w-full bg-stone-950"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.fee} (%):
          </label>
          <input
            type="number"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-600 rounded-md w-full bg-stone-950"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.withdrawalValue}:
          </label>
          <input
            type="number"
            value={withdrawalValue}
            onChange={(e) => setWithdrawalValue(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-600 rounded-md w-full bg-stone-950"
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <p>
            {textProfitCalculator.actualSaleValue}: {netSaleValue.toFixed(8)}
          </p>
          <p>
            {textProfitCalculator.profitPerCurrency}: {profitPerUnit.toFixed(8)}
          </p>
        </div>
        <div className="w-1/2">
          <p>
            {textProfitCalculator.grossProfit}: {grossProfit.toFixed(2)}
          </p>
          <p className="text-xl font-medium">
            {textProfitCalculator.netProfit}: {netProfit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfitCalculator

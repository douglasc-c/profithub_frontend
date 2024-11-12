'use client'

import { useLayoutContext } from '@/context/layout-context'
import React, { useState } from 'react'
import NumericInput from '../inputs/numeric-input'

interface ProfitCalculatorProps {
  withdrawalValue: number
  buyLastPrice: number
  sellLastPrice: number
}

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  withdrawalValue: initialWithdrawalValue,
  buyLastPrice: initialBuyLastPrice,
  sellLastPrice: initialSellLastPrice,
}) => {
  const { textProfitCalculator } = useLayoutContext()

  const [purchaseValue, setPurchaseValue] = useState<number>(0)
  const [saleValue, setSaleValue] = useState<number>(0)
  const [volume, setVolume] = useState<number>(0)
  const [taxPercentage, setTaxPercentage] = useState<number>(0.6)
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

  console.log(initialWithdrawalValue, initialBuyLastPrice, initialSellLastPrice)

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
          <NumericInput value={purchaseValue} onChange={setPurchaseValue} />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.sellValue}:
          </label>
          <NumericInput value={saleValue} onChange={setSaleValue} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.volume}:
          </label>
          <NumericInput value={volume} onChange={setVolume} />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.fee} (%):
          </label>
          <NumericInput value={taxPercentage} onChange={setTaxPercentage} />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {textProfitCalculator.withdrawalValue}:
          </label>
          <NumericInput value={withdrawalValue} onChange={setWithdrawalValue} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <p>
            {textProfitCalculator.actualSaleValue}:{' '}
            <span className="">{netSaleValue.toFixed(8)}</span>
          </p>
          <p>
            {textProfitCalculator.grossProfit}:{' '}
            <span className="">{grossProfit.toFixed(2)}</span>
          </p>
        </div>
        <div className="w-1/2">
          <p>
            {textProfitCalculator.profitPerCurrency}:{' '}
            <span className="">{profitPerUnit.toFixed(8)}</span>
          </p>
          <p>
            {textProfitCalculator.netProfit}:{' '}
            <span className="md:text-lg font-semibold">
              {netProfit.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfitCalculator

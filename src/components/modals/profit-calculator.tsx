'use client'

import { useLayoutContext } from '@/context/layout-context'
import React, { useState } from 'react'

interface ProfitCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  isOpen,
  onClose,
}) => {
  const { textProfitCalculator } = useLayoutContext()
  const [saleValue, setSaleValue] = useState<number>(0)
  const [taxPercentage, setTaxPercentage] = useState<number>(0)
  const [purchaseValue, setPurchaseValue] = useState<number>(0)
  const [liquidity, setLiquidity] = useState<number>(0)
  const [withdrawalValue, setWithdrawalValue] = useState<number>(0)

  if (!isOpen) return null

  const calculateProfit = () => {
    const netSaleValue = saleValue - saleValue * (taxPercentage / 100)
    const profitPerUnit = netSaleValue - purchaseValue
    const grossProfit = liquidity * profitPerUnit
    const netProfit = grossProfit - withdrawalValue
    return { netSaleValue, profitPerUnit, grossProfit, netProfit }
  }

  const { netSaleValue, profitPerUnit, grossProfit, netProfit } =
    calculateProfit()

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#0d1218] p-6 rounded-2xl border-2 border-[#384a61] max-w-md mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-medium mb-6">
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
              className="mt-1 p-2 border border-[#384a61] rounded-md w-full bg-[#0d1218]"
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
              className="mt-1 p-2 border border-[#384a61] rounded-md w-full bg-[#0d1218]"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">
              {textProfitCalculator.liquidity}:
            </label>
            <input
              type="number"
              value={liquidity}
              onChange={(e) => setLiquidity(Number(e.target.value))}
              className="mt-1 p-2 border border-[#384a61] rounded-md w-full bg-[#0d1218]"
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
              className="mt-1 p-2 border border-[#384a61] rounded-md w-full bg-[#0d1218]"
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
              className="mt-1 p-2 border border-[#384a61] rounded-md w-full bg-[#0d1218]"
            />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-medium">
            {textProfitCalculator.results}:
          </h3>
          <p>
            {textProfitCalculator.actualSaleValue}: {netSaleValue.toFixed(8)}
          </p>
          <p>
            {textProfitCalculator.profitPerCurrency}: {profitPerUnit.toFixed(8)}
          </p>
          <p>
            {textProfitCalculator.grossProfit}: {grossProfit.toFixed(2)}
          </p>
          <p>
            {textProfitCalculator.netProfit}: {netProfit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfitCalculator

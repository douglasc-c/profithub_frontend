'use client'

import React, { createContext, useContext } from 'react'

export interface LayoutContextProps {
  textOpportunity: {
    buy: string
    sell: string
    spread: string
    fee: string
    withdrawValue: string
    operationDetails: string
    purchaseBook: string
    salesBook: string
    price: string
    volume: string
    liquidity: string
    cancel: string
    lastPrice: string
  }

  textFearGreedIndex: {
    fearGreedIndex: string
    fear: string
    neutral: string
    greed: string
    extremeGreed: string
    lastUpdated: string
  }

  textProfitCalculator: {
    profitCalculator: string
    buyValue: string
    sellValue: string
    volume: string
    fee: string
    withdrawalValue: string
    results: string
    actualSaleValue: string
    profitPerCurrency: string
    grossProfit: string
    netProfit: string
  }

  textNetwork: {
    networks: string
    network: string
    withdrawalValue: string
    avaliableForWithdrawal: string
    avaliableForDeposit: string
    available: string
    notAvailable: string
  }

  textHighestHighsLows: {
    highestHighs: string
    highestLows: string
    rank: string
    name: string
    symbol: string
    price: string
  }

  locale: string
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined)

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }
  return context
}

export const LayoutProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: LayoutContextProps
}) => <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>

// layout-context.tsx

'use client'
import React, { createContext, useContext } from 'react'

export interface LayoutContextProps {
  // Adicione o modificador 'export' aqui
  textOpportunity: {
    buy: string
    sell: string
    spread: string
    fee: string
    orderBook: string
    purchaseBook: string
    salesBook: string
    price: string
    volume: string
    liquidity: string
    cancel: string
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

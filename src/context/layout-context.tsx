'use client'

import React, { createContext, useContext } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

interface LayoutContextProps {
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
  textSigIn: {
    email: string
    password: string
    forgotYourPassword: string
    signIn: string
    dontHaveAnAccount: string
    signUp: string
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
}) => (
  <Provider store={store}>
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  </Provider>
)

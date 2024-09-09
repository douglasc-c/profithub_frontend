'use client'

import React, { createContext, useContext } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

interface AuthContextProps {
  textSignIn: {
    email: string
    password: string
    forgotYourPassword: string
    signIn: string
    dontHaveAnAccount: string
    signUp: string
  }
  locale: string
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: AuthContextProps
}) => (
  <Provider store={store}>
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  </Provider>
)

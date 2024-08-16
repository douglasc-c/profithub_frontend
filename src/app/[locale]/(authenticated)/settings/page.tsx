'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Settings() {
  const token = useSelector((state: RootState) => state.auth.token)

  return (
    <main className="min-h-screen flex flex-col bg-global bg-cover">
      <p className="text-xl from-neutral-200">Token: {token}</p>
    </main>
  )
}

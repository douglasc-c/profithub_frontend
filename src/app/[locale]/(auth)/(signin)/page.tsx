'use client'

import { useState } from 'react'
import Image from 'next/image'
import Input from '@/components/inputs/input'
import { useLayoutContext } from '@/context/layout-context'
import { useDispatch } from 'react-redux'
import { setToken } from '@/redux/auth-slice'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const { textSigIn, locale } = useLayoutContext()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3333/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        dispatch(setToken(data.token))
        router.push(`${locale}/dashboard`)
      } else {
        console.error('Failed to log in')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-md p-8 space-y-8 border bg-stone-950 border-gray-700 shadow-lg rounded-lg">
          <div className="flex flex-col items-center">
            <Image
              className="py-4"
              src="/images/svg/logoWiseBot.svg"
              alt="WiseBot Logo"
              height={200}
              width={200}
            />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                id="email-address"
                name="email"
                type="email"
                placeholder={textSigIn.email}
                autoComplete="email"
                required
                className="rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={textSigIn.password}
                autoComplete="current-password"
                required
                className="rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center" />

              <div className="text-sm">
                <a href="#" className="font-semibold text-[#005BEC]">
                  {textSigIn.forgotYourPassword}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-[#005BEC]'}`}
              >
                {loading ? 'Signing In...' : textSigIn.signIn}
              </button>
            </div>
          </form>

          {/* <div className="text-center">
            <p className="text-sm text-gray-600">
              {textSigIn.dontHaveAnAccount}{' '}
              <a href="#" className="font-medium text-[#005BEC]">
                {textSigIn.signUp}
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </main>
  )
}

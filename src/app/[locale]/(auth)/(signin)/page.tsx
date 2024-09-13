'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Input from '@/components/inputs/input'
import { useAuthContext } from '@/context/auth-context'
import { useDispatch } from 'react-redux'
import { setToken } from '@/redux/auth-slice'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '@/redux/store'

export default function SignIn() {
  const { textSignIn, locale } = useAuthContext()
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://64.227.6.139/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()

        if (data.token) {
          const maxAge = 60 * 60
          document.cookie = `auth-token=${data.token}; Max-Age=${maxAge}; path=/; Secure; SameSite=Strict`
          dispatch(setToken(data.token))
          router.push(`${locale}/dashboard`)
        } else {
          setError('Token não encontrado na resposta')
          console.error('Token não encontrado na resposta')
        }
      } else {
        setError('Falha no login')
        console.error('Falha no login:', response.statusText)
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor')
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex">
      <section className="flex flex-col items-center justify-center w-1/2 p-10 bg-stone-950">
        <div className="w-full max-w-md p-8 space-y-8 shadow-lg rounded-lg">
          <div className="flex flex-col items-center mb-5">
            <Image
              className="py-4"
              src="/images/svg/logo.svg"
              alt="WiseBot Logo"
              height={450}
              width={450}
            />
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                id="email-address"
                name="email"
                type="email"
                placeholder={textSignIn.email}
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
                placeholder={textSignIn.password}
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
                <a href="#" className="">
                  {textSignIn.forgotYourPassword}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-custom-gradient'}`}
              >
                {loading ? 'Signing In...' : textSignIn.signIn}
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="w-1/2 h-fulll relative">
        <div className="absolute inset-0 bg-bull bg-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 to-transparent"></div>
      </section>
    </main>
  )
}

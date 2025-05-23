'use client'

import { useState, FormEvent } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Input from '@/components/inputs/input'
import { useAuthContext } from '@/context/auth-context'
import { useDispatch } from 'react-redux'
import { setToken } from '@/redux/auth-slice'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '@/redux/store'
import api from '@/lib/api'
import ButtonGlobal from '@/components/buttons/global'
import { RiseLoader } from 'react-spinners'

export default function SignIn() {
  const { textSignIn } = useAuthContext()
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await api.post('/sessions', formData)

      if (response.status === 200) {
        const data = response.data

        if (data.token) {
          const maxAge = 60 * 60
          document.cookie = `auth-token=${data.token}; Max-Age=${maxAge}; path=/; SameSite=Strict`
          dispatch(setToken(data.token))
          router.push(`/dashboard`)
        } else {
          setError(textSignIn.failedToRegisterAuthenticationToken)
        }
      } else {
        setError(textSignIn.loginFailed)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status

        if (status === 400) {
          setError(textSignIn.invalidCredentialsCheckYourEmailAndPassword)
        } else if (status === 500) {
          setError(textSignIn.internalServerErrorTryAgainLater)
        } else {
          console.error('Unknown error:', error)
          setError(textSignIn.anUnexpectedErrorOccurredTryAgainLater)
        }
      } else {
        console.error('Error not identified:', error)
        setError(textSignIn.errorConnectingToTheServerCheckYourConnection)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen flex">
      <section className="flex flex-col items-center justify-center md:w-1/2 w-full p-10 bg-stone-950">
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
              <ButtonGlobal
                type="submit"
                disabled={loading}
                params={{
                  title: loading ? (
                    <RiseLoader
                      color="#fff"
                      loading={loading}
                      size={6}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    textSignIn.signIn
                  ),
                  color: 'bg-custom-gradient',
                }}
              />
            </div>
          </form>
        </div>
      </section>
      <section className="hidden md:block w-1/2 relative">
        <div className="absolute inset-0 bg-finance bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 to-transparent"></div>
      </section>
    </main>
  )
}

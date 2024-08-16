'use client'

import Image from 'next/image'
import Input from '@/components/inputs/input'
import { useLayoutContext } from '@/context/layout-context'

export default function SignIn() {
  const { textSigIn } = useLayoutContext()
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
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

          <form className="space-y-6">
            <div>
              <Input
                id="email-address"
                name="email"
                type="email"
                placeholder={textSigIn.email}
                autoComplete="email"
                required
                className="rounded-md"
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
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center" />

              <div className="text-sm">
                <a href="#" className="font-semibold text-[#005BEC]">
                  {textSigIn.forgotYourPassword}
                </a>
              </div>
            </div>

            <div>
              <button className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-[#005BEC]">
                {textSigIn.signIn}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {textSigIn.dontHaveAnAccount}{' '}
              <a href="#" className="font-medium text-[#005BEC]">
                {textSigIn.signUp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

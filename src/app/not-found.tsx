'use client'

import ButtonMenu from '@/components/buttons/menu'
import { useAuthContext } from '@/context/auth-context'

export default function NotFound() {
  const { textNotFound, locale } = useAuthContext()

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center space-y-4 p-6">
      <span className="bg-gradient-to-b from-white to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="my-2 font-heading text-3xl font-bold text-gray-900 dark:text-white">
        {textNotFound.somethingsMissing}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        {textNotFound.sorryThePageYouAreLookingForDoesntExistOrHasBeenMoved}
      </p>
      <ButtonMenu
        params={{
          title: textNotFound.goBackToHome,
          path: `/${locale}/dashboard`,
        }}
      />
    </div>
  )
}

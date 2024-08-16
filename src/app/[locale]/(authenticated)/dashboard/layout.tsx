import { Roboto_Flex as Roboto } from 'next/font/google'
import '@/app/globals.css'
import Header from '@/components/header/header'

import { getLocale, getTranslations } from 'next-intl/server'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const t = await getTranslations()

  const textHeader = {
    home: t('Header.home'),
  }

  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-global bg-cover font-sans text-gray-100`}
      >
        <Header text={textHeader} locale={locale} />

        {children}
      </body>
    </html>
  )
}

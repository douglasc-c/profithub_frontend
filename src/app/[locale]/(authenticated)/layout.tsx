import '@/app/globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/redux/store'
// import { getLocale, getTranslations } from 'next-intl/server'

// import Header from '@/components/header/header'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const token = useSelector((state: RootState) => state.auth.token)

  // const locale = await getLocale()
  // const t = await getTranslations()

  // const textHeader = {
  //   home: t('Header.home'),
  // }

  return (
    <html lang="en">
      <body className={`${roboto.className} bg-cover font-sans text-gray-100`}>
        {/* <Header text={textHeader} locale={locale} /> */}
        {children}
      </body>
    </html>
  )
}

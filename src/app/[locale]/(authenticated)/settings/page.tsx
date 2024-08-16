import { getLocale, getTranslations } from 'next-intl/server'

import Header from '@/components/header/header'

export default async function Settings() {
  const locale = await getLocale()
  const t = await getTranslations()

  const textHeader = {
    home: t('Header.home'),
  }

  return (
    <main className="min-h-screen flex flex-col bg-global bg-cover">
      <Header text={textHeader} locale={locale} />
    </main>
  )
}

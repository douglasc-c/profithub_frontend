import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'pt-BR'] as const

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!locales.includes(locale as (typeof locales)[number])) notFound()

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default,
  }
})

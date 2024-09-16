'use client'

import Image from 'next/image'
import ButtonMenu from '../buttons/menu'
import Language from '../buttons/language'

interface HeaderProps {
  text: {
    home: string
    heatmap: string
    arbitration: string
    consulting: string
    settings: string
  }
  locale: string
}

export default function Header({ text, locale }: HeaderProps) {
  const availableLocales = [
    { code: 'en', flag: '/images/flags/en.svg', label: 'English' },
    { code: 'pt-BR', flag: '/images/flags/pt-BR.svg', label: 'Português' },
  ]

  return (
    <div className="fixed top-0 left-0 w-full h-40 z-50 flex justify-between items-top px-10 md:px-20 py-5 transition-all duration-300 bg-gradient-to-b from-black via-black/80 to-tramsparet">
      <a href="/" className="-mt-5">
        <Image src="/images/svg/logo.svg" alt="Logo" width={320} height={200} />
      </a>
      <div className="flex flex-row">
        <ButtonMenu
          params={{ title: text.home, path: `/${locale}/dashboard` }}
        />
        <ButtonMenu
          params={{ title: text.heatmap, path: `/${locale}/heatmap` }}
        />
        <ButtonMenu
          params={{ title: text.arbitration, path: `/${locale}/arbitration` }}
        />
        <ButtonMenu
          params={{ title: text.consulting, path: `/${locale}/consulting` }}
        />
        <ButtonMenu
          params={{ title: text.settings, path: `/${locale}/settings` }}
        />
        <div className="-mt-[6px]">
          <Language locale={locale} availableLocales={availableLocales} />
        </div>
      </div>
    </div>
  )
}

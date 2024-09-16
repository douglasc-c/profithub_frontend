'use client'

import { useEffect, useState } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)

  const availableLocales = [
    { code: 'en', flag: '/images/flags/en.svg', label: 'English' },
    { code: 'pt-BR', flag: '/images/flags/pt-BR.svg', label: 'Português' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 md:px-20 py-5 transition-all duration-300 ${
        isScrolled
          ? 'bg-black bg-opacity-100 shadow-lg'
          : 'bg-black bg-opacity-70'
      }`}
    >
      <a href="/">
        <Image src="/images/svg/logo.svg" alt="Logo" width={420} height={200} />
      </a>
      <div className="flex flex-row items-center">
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
        <Language locale={locale} availableLocales={availableLocales} />
      </div>
    </div>
  )
}

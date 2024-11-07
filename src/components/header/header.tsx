'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Language from '../buttons/language'
import ButtonMenu from '../buttons/menu'
import ButtonSettings from '../buttons/settings'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const availableLocales = [
    { code: 'en', flag: '/images/flags/en.svg', label: 'English' },
    { code: 'pt-BR', flag: '/images/flags/pt-BR.svg', label: 'Português' },
  ]

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="fixed w-full z-50 flex justify-between items-center px-5 md:px-10 py-3 transition-all duration-300 bg-gradient-to-b from-black via-black/80 to-transparent">
      <a href="/dashboard" className="">
        <Image
          src="/images/svg/logo.svg"
          alt="Logo"
          width={isMobile ? 180 : 240}
          height={100}
        />
      </a>

      <div className="hidden md:flex flex-row items-center space-x-4">
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
        <Language locale={locale} availableLocales={availableLocales} />
        <ButtonSettings params={{ path: `/${locale}/settings` }} />
      </div>

      <div className="md:hidden flex items-center px-5">
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none z-50"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center space-y-6 z-40">
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
          <Language locale={locale} availableLocales={availableLocales} />
          <ButtonSettings params={{ path: `/${locale}/settings` }} />
        </div>
      )}
    </div>
  )
}

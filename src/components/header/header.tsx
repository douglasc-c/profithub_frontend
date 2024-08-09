'use client'

import Image from 'next/image'
import ButtonMenu from '../buttons/menu'

export default function Header({ text, locale }: any) {
  return (
    <div className="w-full flex justify-between items-center px-10 md:px-20 py-5">
      <a href="/">
        <Image src="/images/svg/logo.svg" alt="Logo" width={200} height={200} />
      </a>
      <div className="flex flex-row">
        <ButtonMenu params={{ title: `${text.home}`, path: `/${locale}` }} />
      </div>
    </div>
  )
}

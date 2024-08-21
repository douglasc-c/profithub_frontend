'use client'

import Image from 'next/image'

export default function Header({ text, locale }: any) {
  return (
    <div className="w-full flex justify-between items-center px-10 md:px-20 py-6">
      <a href="/">
        <Image
          src="/images/svg/proftcloud.svg"
          alt="Logo"
          width={420}
          height={200}
        />
      </a>
      <div className="flex flex-row"></div>
    </div>
  )
}

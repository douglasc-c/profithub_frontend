'use client'

import { usePathname } from 'next/navigation'

type IDataProps = {
  params: {
    title: string
    path: string
  }
}

export default function ButtonMenu({ params }: IDataProps) {
  const { title, path } = params
  const pathname = usePathname()

  const isActive: boolean = pathname === path

  return (
    <a
      href={path}
      className={`block px-6 py-1.5 border border-white rounded-lg font-regular text-sm uppercase transition-colors duration-300 ${
        isActive ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      {title}
    </a>
  )
}

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
    <ul className="px-2">
      <li
        className={`block px-6 py-1.5 border border-white rounded-lg font-regular text-sm uppercase transition-colors duration-300 ${
          isActive ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        <a href={path}>{title}</a>
      </li>
    </ul>
  )
}

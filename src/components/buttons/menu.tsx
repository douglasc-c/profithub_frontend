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
        className={`relative inline-block rounded-lg p-[1px] bg-gradient-to-r from-blue-500 to-purple-600 transition-transform duration-300 hover:scale-110`}
      >
        <a
          href={path}
          className={`block px-6 py-[0.38rem] rounded-lg font-regular text-sm uppercase transition-colors duration-300 ${isActive ? 'bg-white text-black' : 'bg-black text-white'
            }`}
        >
          {title}
        </a>
      </li>
    </ul>
  )
}

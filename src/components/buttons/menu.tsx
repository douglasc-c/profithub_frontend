'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

interface DataProps {
  params: {
    title: string
    path: string
  }
}

export default function ButtonMenu({ params }: DataProps) {
  const { title, path } = params
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <ul>
      <li>
        <a
          href={path}
          className={`flex items-center p-2 border-white border-b-2 hover:border-black duration-300 hover:scale-110 font-semibold text-xl ${isActive ? 'border-black' : ''}`}
        >
          {title}
        </a>
      </li>
    </ul>
  )
}

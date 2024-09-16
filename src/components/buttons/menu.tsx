'use client'

import React from 'react'

interface DataProps {
  params: {
    title: string
    path: string
  }
}

export default function ButtonMenu({ params }: DataProps) {
  const { title, path } = params

  return (
    <ul className="px-2">
      <li className="gradient-border">
        <a
          href={path}
          className={`flex items-center px-2 py-1 font-regular text-sm uppercase`}
        >
          {title}
        </a>
      </li>
    </ul>
  )
}

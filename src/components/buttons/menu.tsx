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
    <ul>
      <li>
        <a
          href={path}
          className={`flex items-center p-2 duration-300 hover:scale-110 font-semibold uppercase`}
        >
          {title}
        </a>
      </li>
    </ul>
  )
}

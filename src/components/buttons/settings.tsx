'use client'

import Image from 'next/image'

type IDataProps = {
  params: {
    title: string
    assets: string
    onClick: () => void
  }
}

export default function ButtonSettings({ params }: IDataProps) {
  const { title, assets, onClick } = params

  return (
    <button
      onClick={onClick}
      className="flex items-center px-5 font-semibold space-x-3"
    >
      <Image
        src={`/images/svg/${assets}.svg`}
        width={20}
        height={20}
        alt={title}
      />
      <span>{title}</span>
    </button>
  )
}

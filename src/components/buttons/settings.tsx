'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type IDataProps = {
  params: {
    title: string
    assets: string
  }
}

export default function ButtonSettings({ params }: IDataProps) {
  const { title, assets } = params

  const router = useRouter()

  const handleClick = () => {
    const path = '/settings'
    router.push(path)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center border-b border-white p-2 font-semibold space-x-3"
    >
      <Image
        src={`/images/svg/${assets}.svg`}
        width={18}
        height={18}
        alt="Settings"
      />
      <span>{title}</span>
    </button>
  )
}

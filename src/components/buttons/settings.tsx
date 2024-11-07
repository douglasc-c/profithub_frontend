'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type IDataProps = {
  params: {
    path: string
  }
}

export default function ButtonSettings({ params }: IDataProps) {
  const { path } = params

  const router = useRouter()

  const handleClick = () => {
    router.push(path)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center bg-transparent border border-white rounded-full"
    >
      <Image
        src="/images/svg/avatar.svg"
        width={28}
        height={28}
        alt="Settings"
      />
    </button>
  )
}

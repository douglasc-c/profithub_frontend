'use client'

import ButtonSettings from '@/components/buttons/settings'
import Image from 'next/image'

export default function Settings() {
  return (
    <div className="flex h-[calc(102vh-9rem)]">
      <section className="flex flex-col w-2/5 items-center border-r-2 space-y-6">
        <div className="flex flex-col w-52 h-3/4 items-center justify-center">
          <button className="rounded-full">
            <Image
              src="/images/svg/avatar.svg"
              width={210}
              height={210}
              alt="Settings"
            />
          </button>
        </div>
        <div className="flex flex-col w-52 h-3/4">
          <ButtonSettings
            params={{ title: 'Dados Pessoais', assets: 'security' }}
          />
          <ButtonSettings params={{ title: 'Segurança', assets: 'security' }} />
          <ButtonSettings params={{ title: 'Planos', assets: 'security' }} />
          <ButtonSettings params={{ title: 'Logs', assets: 'logs' }} />
          <ButtonSettings params={{ title: 'Sair', assets: 'signout' }} />
        </div>
      </section>
      <section className="flex flex-col w-3/5 items-center"></section>
    </div>
  )
}

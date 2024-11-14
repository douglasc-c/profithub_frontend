'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearToken } from '@/redux/auth-slice'
import ButtonSettings from '@/components/buttons/settings'
import Logs from '@/components/user-data/logs'
import PersonalData from '@/components/user-data/personal-data'
import Security from '@/components/user-data/security'
import Plans from '@/components/user-data/plans'
import Image from 'next/image'
import { useLayoutContext } from '@/context/layout-context'

export default function Settings() {
  const { textSettings } = useLayoutContext()
  const [activeTab, setActiveTab] = useState<string>('personalData')
  const dispatch = useDispatch()
  const router = useRouter()

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'personalData':
        return <PersonalData />
      case 'security':
        return <Security />
      case 'logs':
        return <Logs />
      case 'plans':
        return <Plans />
      default:
        return <PersonalData />
    }
  }

  const handleSignOut = () => {
    dispatch(clearToken())
    router.push('/')
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(102vh-9rem)]">
      <section className="flex flex-col w-full lg:w-2/5 items-center lg:border-r-2 border-zinc-400 space-y-6 p-4">
        <div className="flex flex-col w-20 md:w-52 h-2/5  items-center justify-center">
          <button className="rounded-full">
            <Image
              src="/images/svg/avatar.svg"
              width={150}
              height={150}
              alt="Settings"
            />
          </button>
        </div>
        <div className="flex flex-col space-y-5">
          <span className="border border-zinc-400" />
          <ButtonSettings
            params={{
              title: textSettings.personalData,
              assets: 'personalData',
              onClick: () => setActiveTab('personalData'),
            }}
          />
          <span className="border border-zinc-400" />
          <ButtonSettings
            params={{
              title: textSettings.security,
              assets: 'security',
              onClick: () => setActiveTab('security'),
            }}
          />
          <span className="border border-zinc-400" />
          <ButtonSettings
            params={{
              title: textSettings.plans,
              assets: 'plans',
              onClick: () => setActiveTab('plans'),
            }}
          />
          <span className="border border-zinc-400" />
          <ButtonSettings
            params={{
              title: textSettings.logs,
              assets: 'logs',
              onClick: () => setActiveTab('logs'),
            }}
          />
          <span className="border border-zinc-400" />
          <ButtonSettings
            params={{
              title: textSettings.logout,
              assets: 'signout',
              onClick: handleSignOut,
            }}
          />
          <span className="border border-zinc-400" />
        </div>
      </section>
      <section className="flex w-full lg:w-3/5 justify-center items-center p-4">
        {renderActiveComponent()}
      </section>
    </div>
  )
}

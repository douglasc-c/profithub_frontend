'use client'

import React from 'react'
import ButtonGlobal from '../buttons/global'
import { useLayoutContext } from '@/context/layout-context'

const Plans: React.FC = () => {
  const { textSettings } = useLayoutContext()

  return (
    <div className="p-6 bg-zinc-800 rounded-xl max-w-lg w-full space-y-4">
      <h2 className="text-2xl font-semibold">{textSettings.yourPlan}</h2>
      <p>{textSettings.hereAreTheDetailsOfYourCurrentPlanAndUpgradeOptions}</p>
      <ul>
        <li>
          {textSettings.basicPlan}: {textSettings.unlimitedAccess}
        </li>
      </ul>
      <div className="w-40">
        <ButtonGlobal
          type="button"
          params={{
            title: textSettings.upgradePlan,
            color: 'bg-green-600',
          }}
        />
      </div>
    </div>
  )
}

export default Plans

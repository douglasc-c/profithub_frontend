'use client'

import React from 'react'
import ButtonGlobal from '../buttons/global'

const Plans: React.FC = () => {
  return (
    <div className="p-6 bg-zinc-800 rounded-xl max-w-lg w-full space-y-4">
      <h2 className="text-2xl font-semibold">Seu Plano</h2>
      <p>Aqui estão os detalhes sobre seu plano atual e opções de upgrade.</p>
      <ul>
        <li>Plano Básico: Acesso ilimitado</li>
      </ul>
      <div className="w-40">
        <ButtonGlobal
          type="button"
          params={{
            title: 'Atualizar plano',
            color: 'bg-green-600',
          }}
        />
      </div>
    </div>
  )
}

export default Plans

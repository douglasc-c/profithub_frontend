'use client'

import React, { useState } from 'react'
import Input from '@/components/inputs/input'
import ButtonGlobal from '../buttons/global'
import { RiseLoader } from 'react-spinners'
import { useLayoutContext } from '@/context/layout-context'

const PersonalData: React.FC = () => {
  const { textSettings } = useLayoutContext()

  const [formData, setFormData] = useState({ email: '', name: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert('Dados salvos com sucesso!')
    }, 2000)
  }

  return (
    <div className="p-6 bg-zinc-800 rounded-xl max-w-lg w-full">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dados Pessoais</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              {textSettings.name}
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="rounded-md"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              {textSettings.email}
            </label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-40">
            <ButtonGlobal
              type="submit"
              disabled={loading}
              params={{
                title: loading ? (
                  <RiseLoader
                    color="#fff"
                    loading={loading}
                    size={6}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  textSettings.save
                ),
                color: 'bg-green-600',
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalData

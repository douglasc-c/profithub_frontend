'use client'

import React, { useState } from 'react'
import Input from '@/components/inputs/input'
import ButtonGlobal from '../buttons/global'
import { RiseLoader } from 'react-spinners'
import { useLayoutContext } from '@/context/layout-context'

const Security: React.FC = () => {
  const { textSettings } = useLayoutContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      setError(textSettings.theNewPasswordsDontMatch)
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert('Senha alterada com sucesso!')

      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setError(null)
    }, 2000)
  }

  return (
    <div className="p-6 bg-zinc-800 rounded-xl max-w-lg w-full">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{textSettings.security}</h2>
        <div className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {textSettings.currentPassword}
              </label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-md"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {textSettings.newPassword}
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                className="rounded-md"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {textSettings.confirmeNewPassword}
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="rounded-md"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
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
                    textSettings.changePassword
                  ),
                  color: 'bg-red-600',
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Security

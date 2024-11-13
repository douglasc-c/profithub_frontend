import React, { useState, useEffect } from 'react'

interface NumericInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  className,
}) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(value ? value.toString() : '')
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedInput = e.target.value.replace(/[^0-9.]/g, '')

    if (/^\d*\.?\d*$/.test(cleanedInput)) {
      setInputValue(cleanedInput)
      onChange(cleanedInput === '' ? NaN : parseFloat(cleanedInput))
    }
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      className={`mt-1 p-[0.3rem] border border-gray-600 rounded-md text-sm w-full bg-stone-950 ${className}`}
    />
  )
}

export default NumericInput

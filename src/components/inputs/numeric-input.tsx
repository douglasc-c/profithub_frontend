import React, { useState } from 'react'

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
  const [inputValue, setInputValue] = useState(value.toString())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setInputValue(inputValue)

      onChange(inputValue === '' ? 0 : parseFloat(inputValue))
    }
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      className={`mt-1 p-2 border border-gray-600 rounded-md w-full bg-stone-950 ${className}`}
    />
  )
}

export default NumericInput

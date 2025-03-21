import { Button, Input } from '@heroui/react'
import { Icon } from '@iconify/react'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setInputValue(value)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onChange(inputValue)
    }
  }

  const onSearch = () => {
    onChange(inputValue)
  }

  return (
    <div className="flex flex-row">
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endContent={<Icon icon="mdi:search" width="24" height="24" />}
        classNames={{
          inputWrapper: "rounded-e-none"
        }}
      />
      <Button
        onPress={onSearch}
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, }}
      >
        Search
      </Button>
    </div>
  )
}

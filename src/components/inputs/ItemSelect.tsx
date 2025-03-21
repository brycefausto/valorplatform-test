/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectOption } from '@/types';
import serverFetch, { getErrorMessage } from '@/lib/serverFetch'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { OptionProps, components } from 'react-select';
import { Item } from '@/model/item';

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

export interface ItemSelectProps {
  id?: string
  value?: Item
  onChange?: (value: Item) => void
}

export interface ItemSelectOption extends SelectOption {
  item: Item
}

export default function ItemSelect({ id, value, onChange }: ItemSelectProps) {
  const defaultValue = value ? { label: value.name, value: value.id, item: value } : null;
  const [optionValue, setOptionValue] = useState<ItemSelectOption | null>(defaultValue)
  const fetchData = async (query: string) => {
    try {
      const { data } = await serverFetch.get<Item[]>('/items/search?q=' + query)

      return data.map(it => ({ label: it.name, value: it.id, item: it }))
    } catch (error: any) {
      console.log(error.message)
      alert(getErrorMessage(error))
    }
  }

  const promiseOptions = async (inputValue: string) => {
    return (await fetchData(inputValue)) || []
  }

  const handleChange = (value: ItemSelectOption) => {
    setOptionValue(value)
    onChange?.(value.item)
  }

  const Option = (props: OptionProps<ItemSelectOption>) => {
    const { data: { item } } = props
    return (
      <div>
        <components.Option {...props}>
          <div>{item.name}</div>
        </components.Option>
      </div>
    );
  };

  return (
    <AsyncSelect
      id={id}
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      value={optionValue}
      onChange={(newVal) => handleChange(newVal as ItemSelectOption)}
      components={{
        Option: (props) => Option(props as OptionProps<ItemSelectOption>)
      }}
    />
  )
}

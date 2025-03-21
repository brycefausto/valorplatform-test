/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppUser } from '@/model/user'
import { SelectOption } from '@/types';
import serverFetch, { getErrorMessage } from '@/lib/serverFetch'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { OptionProps, components } from 'react-select';

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

export interface UsersSelectProps {
  id?: string
  value?: AppUser
  onChange?: (value: AppUser) => void
}

export interface UserSelectOption extends SelectOption {
  user: AppUser
}

export default function UserSelect({ id, value, onChange }: UsersSelectProps) {
  const defaultValue = value ? { label: value.name, value: value.id, user: value } : null;
  const [optionValue, setOptionValue] = useState<UserSelectOption | null>(defaultValue)
  const fetchData = async (query: string) => {
    try {
      const { data } = await serverFetch.get<AppUser[]>('/users/search?q=' + query)

      return data.map(it => ({ label: it.name, value: it.id, user: it }))
    } catch (error: any) {
      console.log(error.message)
      alert(getErrorMessage(error))
    }
  }

  const promiseOptions = async (inputValue: string) => {
    return (await fetchData(inputValue)) || []
  }

  const handleChange = (value: UserSelectOption) => {
    setOptionValue(value)
    onChange?.(value.user)
  }

  const Option = (props: OptionProps<UserSelectOption>) => {
    const { data: { user } } = props
    return (
      <div>
        <components.Option {...props}>
          <div>{user.name}</div>
          <div>{user.email}</div>
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
      onChange={(newVal) => handleChange(newVal as UserSelectOption)}
      components={{
        Option: (props) => Option(props as OptionProps<UserSelectOption>)
      }}
    />
  )
}

import React from 'react'
import UserDetailsForm from './UserDetails'
import { userService } from '@/service/user.service'
import { notFound } from 'next/navigation'
import { ParamsWithId } from '@/types'
import FormLayout from '@/components/layouts/FormLayout'

export default async function UserPage({ params }: ParamsWithId) {
    const { id } = await params
    const user = await userService.findUser(id)
  
    if (!user) {
      notFound()
    }

  return (
    <FormLayout>
      <UserDetailsForm user={user} />
    </FormLayout>
  )
}

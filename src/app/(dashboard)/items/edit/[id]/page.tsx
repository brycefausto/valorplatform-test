import FormLayout from '@/components/layouts/FormLayout'
import React from 'react'
import EditItemForm from './EditItemForm'
import { ParamsWithId } from '@/types'
import { itemService } from '@/service/item.service'
import { notFound } from 'next/navigation'

export default async function CreateUserPage({ params }: ParamsWithId) {
  const { id } = await params
  const item = await itemService.findOne(id)

  if (!item) {
    notFound()
  }

  return (
    <FormLayout>
      <EditItemForm item={item} />
    </FormLayout>
  )
}

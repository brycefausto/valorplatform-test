import { ParamsWithQuery } from '@/types'
import React from 'react'
import ItemList from './ItemList'
import { itemService } from '@/service/item.service'

export default async function ItemsPage({ searchParams }: ParamsWithQuery) {
  const { page, search } = await searchParams
  const data = await itemService.findAll({ page, search })

  return (
    <ItemList data={data} page={page || 0} search={search || ""} />
  )
}

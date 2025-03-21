import { inventoryService } from '@/service/inventory.service'
import { ParamsWithQuery } from '@/types'
import InventoryList from './InventoryList'

export default async function InventoryPage({ searchParams }: ParamsWithQuery) {
  const { page, search } = await searchParams
  const data = await inventoryService.findAll({ page, search })

  return (
    <InventoryList data={data} page={page || 0} search={search || ""} />
  )
}

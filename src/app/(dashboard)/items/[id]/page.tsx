import FormLayout from '@/components/layouts/FormLayout'
import { itemService } from '@/service/item.service'
import { ParamsWithId } from '@/types'
import { notFound } from 'next/navigation'
import ItemDetailsForm from './ItemDetails'

export default async function ItemPage({ params }: ParamsWithId) {
    const { id } = await params
    const item = await itemService.findOne(id)
  
    if (!item) {
      notFound()
    }

  return (
    <FormLayout>
      <ItemDetailsForm item={item} />
    </FormLayout>
  )
}

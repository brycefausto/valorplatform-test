"use client"

import ImageSelector from '@/components/image-selector/ImageSelector'
import { BASE_ITEMS_IMAGE_URL } from '@/config/env'
import { ItemVariant } from '@/model/item'
import { useAlertModal } from '@/providers/alert.modal.provider'
import { Button, Input, NumberInput } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export type ItemVariantData = ItemVariant & { imageFile?: File }

export interface ItemVariantFormProps {
  value?: ItemVariant[]
  onChange: (value: ItemVariantData[]) => void
}

const emptyVariant = {
  name: "",
  image: "",
  price: 0
}

export default function ItemVariantForm({ value, onChange }: ItemVariantFormProps) {
  const [itemVariants, setItemVariants] = useState<ItemVariantData[]>(value && value.length ? value : [emptyVariant])
  const alertModal = useAlertModal()

  const handleAddVariant = () => {
    itemVariants.push({ ...emptyVariant })
    setItemVariants(itemVariants.slice())
  }

  const handleChangeName = (value: string, index: number) => {
    const newItemVariants = itemVariants.slice()
    newItemVariants[index].name = value
    setItemVariants(newItemVariants)
    onChange?.(newItemVariants)
  }

  const handleChangePrice = (value: number, index: number) => {
    const newItemVariants = itemVariants.slice()
    newItemVariants[index].price = value
    setItemVariants(newItemVariants)
    onChange?.(newItemVariants)
  }

  const handleChangeImageFile = (value: File, index: number) => {
    const newItemVariants = itemVariants.slice()
    newItemVariants[index].imageFile = value
    setItemVariants(newItemVariants)
    onChange?.(newItemVariants)
  }

  const handleDeleteVariant = (index: number) => {
    if (itemVariants.length > 1) {
      alertModal.showDeleteModal("variant", () => {
        const newItemVariants = itemVariants.slice()
        newItemVariants.splice(index, 1)
        setItemVariants(newItemVariants)
        onChange?.(newItemVariants)
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">
        Item Variants
      </div>
      <div className="flex flex-col gap-4">
        {itemVariants.map((variant, i) => (
          <div key={i} className="flex flex-row gap-4">
            <ImageSelector image={variant.image} baseUrl={BASE_ITEMS_IMAGE_URL} width={100} required onChangeFile={(value) => handleChangeImageFile(value, i)} />
            <div className="flex flex-auto flex-col gap-2 items-start">
              <Input label="Name" value={variant.name} onValueChange={(value) => handleChangeName(value, i)} />
              <NumberInput
                label="Price"
                placeholder="0.00"
                required
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₱</span>
                  </div>
                }
                value={variant.price}
                onValueChange={(value) => handleChangePrice(value, i)}
              />
            </div>
            <div className="flex justify-end">
              <Button isIconOnly variant="bordered" color={itemVariants.length <= 1 ? "secondary" : "default"} disabled={itemVariants.length <= 1} onPress={() => handleDeleteVariant(i)}>
                <Icon icon="mdi:minus-circle-outline" width="24" height="24" />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex flex-col">
          <div className="items-center">
            <Button onPress={handleAddVariant}>Add Variant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

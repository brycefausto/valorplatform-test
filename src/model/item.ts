export interface ItemVariant {
  name: string
  image: string
  price: number
}

export interface Item {
  id: string
  name: string
  brand: string
  category: string
  description: string
  image: string
  variants: ItemVariant[]
}

export type CreateItemDto = Omit<Item, "id"> & { vendorId: string }

export type UpdateItemDto = Omit<Item, "id">

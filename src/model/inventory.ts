import { Item } from "./item"
import { AppUser } from "./user"

export interface CreateInventoryItemDto {
  itemId: string
  vendorId: string
  variantName: string
  stock: number
  price: number
}

export interface UpdateInventoryItemDto {
  stock: number
  price: number
}

export interface InventoryItem {
  id: string
  item?: Item
  vendor?: AppUser
  variantName: string
  image: string
  stock: number
  price: number
}

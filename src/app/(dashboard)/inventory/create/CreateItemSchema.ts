import { z } from "zod";

export const createInventorySchema = z.object({
  stock: z.number().min(1),
  price: z.number().min(0),
})

export type CreateInventoryItemData = z.output<typeof createInventorySchema> & { 
  itemId?: string
  vendorId?: string
  variantName?: string
}

import { ItemVariant } from "@/model/item";
import { z } from "zod";

export const updateItemSchema = z.object({
  name: z.string().min(2).max(50),
  brand: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  description: z.string().max(500).optional(),
})

export type UpdateItemData = z.output<typeof updateItemSchema> & { image?: string, variants?: ItemVariant[] }

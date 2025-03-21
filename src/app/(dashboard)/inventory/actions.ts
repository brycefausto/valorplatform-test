/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { InventoryItem, UpdateInventoryItemDto } from "@/model/inventory";
import { inventoryService } from "@/service/inventory.service";
import { ActionResultState } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateInventoryItemAction(id: string, data: UpdateInventoryItemDto): Promise<ActionResultState> {

  try {
    await inventoryService.update(id, data)
  } catch (error: any) {
    console.log({ error: error.message })
    return {
      error: error.message,
    };
  }
  revalidatePath("/inventory")

  return {}
}


export async function deleteInventoryItemAction(inventory: InventoryItem) {
  try {
    await inventoryService.delete(inventory.id)
  } catch (error: any) {
    console.log({ error: error.message })
    return {
      error: error.message,
    };
  }

  revalidatePath("/inventory")
}

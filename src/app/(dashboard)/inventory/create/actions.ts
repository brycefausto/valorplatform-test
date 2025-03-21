/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { inventoryService } from "@/service/inventory.service";
import { ActionResultState } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateInventoryItemDto } from "./CreateItemForm";
import { CreateInventoryItemData } from "./CreateItemSchema";
import { getErrorMessage } from "@/lib/serverFetch";

export async function createItemAction(data: CreateInventoryItemData): Promise<ActionResultState> {
  const createItemDto = data as CreateInventoryItemDto;

  try {
    await inventoryService.create(createItemDto)
  } catch (error: any) {
    console.log({ error: getErrorMessage(error) })
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath("/inventory")
  redirect("/inventory")
}

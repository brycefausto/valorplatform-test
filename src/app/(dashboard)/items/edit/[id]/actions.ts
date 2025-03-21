/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { UpdateItemDto } from "@/model/item";
import { itemService } from "@/service/item.service";
import { ActionResultState } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateItemData } from "./UpdateItemSchema";

export async function editItemAction(id: string, data: UpdateItemData): Promise<ActionResultState> {
  const updateItemDto = data as UpdateItemDto;

  try {
    await itemService.update(id, updateItemDto)
  } catch (error: any) {
    console.log({ error: error.message })
    return {
      error: error.message,
    };
  }

  revalidatePath("/items")
  redirect("/items")
}

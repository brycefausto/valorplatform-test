/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { CreateItemDto } from "@/model/item";
import { itemService } from "@/service/item.service";
import { ActionResultState } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateItemData } from "./CreateItemSchema";

export async function createItemAction(data: CreateItemData): Promise<ActionResultState> {
  const createItemDto = data as CreateItemDto;

  try {
    await itemService.create(createItemDto)
  } catch (error: any) {
    console.log({ error: error.message })
    return {
      error: error.message,
    };
  }

  revalidatePath("/items")
  redirect("/items")
}

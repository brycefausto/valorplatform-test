"use server";

import { deleteImage } from "@/app/api/imagekit/actions";
import { Item } from "@/model/item";
import { itemService } from "@/service/item.service";
import { revalidatePath } from "next/cache";

export async function deleteItemAction(item: Item) {
  if (item.image) {
    await deleteImage(item.image)
  }
  for (const variant of item.variants) {
    await deleteImage(variant.image)
  }

  await itemService.delete(item.id)
  revalidatePath("/items")
}

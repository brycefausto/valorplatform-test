"use server";

import { deleteImage } from "@/lib/imagekitLib";
import { AppUser } from "@/model/user";
import { userService } from "@/service/user.service";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(user: AppUser) {
  if (user.image) {
    await deleteImage(user.image)
  }
  await userService.delete(user.id)
  revalidatePath("/users")
}

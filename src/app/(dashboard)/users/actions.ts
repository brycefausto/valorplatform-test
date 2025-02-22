"use server";

import { userService } from "@/service/user.service";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(id: string) {
  await userService.deleteUser(id)
  revalidatePath("/users")
}

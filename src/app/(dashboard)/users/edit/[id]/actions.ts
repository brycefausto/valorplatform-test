/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { UserDto } from "@/model/user"
import { userService } from "@/service/user.service"
import { revalidatePath } from "next/cache"
import { UpdateUserData } from "./UpdateUserSchema"
import { ActionResultState } from "@/types"

export async function updateUserAction(id: string, data: UpdateUserData): Promise<ActionResultState> {
  const userDto = data as UserDto

  try {
    const user = await userService.updateUser(id, userDto)

    if (user) {
      revalidatePath("/users")
      return {
        message: "Successfully saved user"
      }
    } else {
      return {
        error: "User not found"
      }
    }
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { UpdateUserDto } from "@/model/user"
import { userService } from "@/service/user.service"
import { ActionResultState } from "@/types"
import { revalidatePath } from "next/cache"
import { UpdateUserData } from "./UpdateUserSchema"

export async function updateUserAction(id: string, data: UpdateUserData): Promise<ActionResultState> {
  const userDto = data as UpdateUserDto
  try {
    if (!userDto.image) {
      userDto.image = null
    }

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

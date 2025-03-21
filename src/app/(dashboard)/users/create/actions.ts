/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { CreateUserDto } from "@/model/user";
import { userService } from "@/service/user.service";
import { ActionResultState } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateUserData } from "./CreateUserSchema";

export async function createUserAction(data: CreateUserData): Promise<ActionResultState> {
  const createUserDto = data as CreateUserDto;

  try {
    await userService.create(createUserDto)
  } catch (error: any) {
    console.log({ error: error.message })
    return {
      error: error.message,
    };
  }

  revalidatePath("/users")
  redirect("/users")
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createSession, deleteSession } from "@/lib/session";
import { RegisterDto } from "@/model/user";
import { authService } from "@/service/auth.service";
import { ActionResultState } from "@/types";
import { redirect } from "next/navigation";
import { SignUpData } from "./signUpSchema";

export async function signUpAction(data: SignUpData): Promise<ActionResultState> {
  const registerDto = data as RegisterDto;

  try {
    const user = await authService.registerUser(registerDto)

    await createSession(user.id);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

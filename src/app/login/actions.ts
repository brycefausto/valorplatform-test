/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createSession, deleteSession } from "@/lib/session";
import { authService } from "@/service/auth.service";
import { ActionResultState } from "@/types";
import { redirect } from "next/navigation";
import { LoginData } from "./loginSchema";

export async function loginAction(data: LoginData): Promise<ActionResultState> {
  const { email, password } = data

  try {
    const user = await authService.loginUser(email, password)

    if (!user) {
      return {
        error: "Invalid email or password",
      }
    }

    await createSession(user.id);
  } catch (error: any) {
    return {
      error: error.message,
    }
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

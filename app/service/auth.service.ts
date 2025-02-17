import type { RegisterDto } from "~/types/auth-types";
import { addUser, users } from "./user.service";

export const registerUser = async (registerDto: RegisterDto) => {
  const user = addUser(registerDto)

  return user
}

export const loginUser = async (email: string, password: string) => {
  const user = users.find(user => user.email === email && user.password === password)
  return user
}

export const checkAuth = async (id?: string | null) => {
  if (!id) {
    return null
  }

  return users.find(user => user.id === id)
}
import prisma from "@/lib/prisma";
import { RegisterDto } from "@/model/user";
import { userService } from "./user.service";

class AuthService {
  registerUser = async (registerDto: RegisterDto) => {
    const user = await userService.createUser(registerDto)

    return user
  }

  loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findFirst({ where: { email, password } })

    if (user) {
      return userService.convertToAppUser(user)
    }
  }

  checkAuth = async (id?: string | null) => {
    if (!id) {
      return null
    }

    const user = await prisma.user.findFirst({ where: { id: parseInt(id) } })

    if (user) {
      return userService.convertToAppUser(user)
    }
  }
}

export const authService = new AuthService()

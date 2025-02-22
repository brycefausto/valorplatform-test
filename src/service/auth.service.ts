import prisma from "@/lib/prisma";
import { RegisterDto } from "@/model/user";
import { userService } from "./user.service";

class AuthService {
  registerUser = async (registerDto: RegisterDto) => {
    const user = await userService.createUser(registerDto)

    return user
  }

  loginUser = async (email: string, password: string) => {
    return await prisma.user.findFirst({ where: { email, password } })
  }

  checkAuth = async (id?: string | null) => {
    if (!id) {
      return null
    }

    return await prisma.user.findFirst({ where: { id: parseInt(id) } })
  }
}

export const authService = new AuthService()

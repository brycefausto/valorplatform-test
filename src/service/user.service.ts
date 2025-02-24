import prisma from "@/lib/prisma";
import { AppUser, CreateUserDto, UserDto } from "@/model/user";
import { User } from "@prisma/client";

class UsersService {

  convertToAppUser = (user: User) => {
    return user as AppUser
  }

  createUser = async (userDto: CreateUserDto) => {
    const existingUser = await prisma.user.findFirst({ where: { email: userDto.email } })
    if (existingUser) {
      throw new Error("Email already exists!")
    }

    delete userDto["confirmPassword"]
    userDto.email = userDto.email.toLowerCase()

    const createdUser = await prisma.user.create({ data: userDto })
  
    return createdUser
  }
  
  findUser = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } })
    
    if (user) {
      return this.convertToAppUser(user)
    }
  }
  
  getUsers = async () => {
    const users = await prisma.user.findMany()

    return users.map(this.convertToAppUser)
  }
  
  updateUser = async (id: string, userDto: UserDto) => {
    userDto.email = userDto.email.toLowerCase()
    return this.convertToAppUser(await prisma.user.update({ where: { id }, data: userDto }))
  }
  
  deleteUser = async (id: string) => {
   await prisma.user.delete({ where: { id } })
  }
}

export const userService = new UsersService()

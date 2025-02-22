import prisma from "@/lib/prisma";
import { AppUser, CreateUserDto, UserDto } from "@/model/user";
import { User } from "@prisma/client";

class UsersService {

  convertToAppUser = ({ id, ...userData }: User) => {
    return { ...userData, id: id.toString() } as AppUser
  }

  createUser = async (newUser: CreateUserDto) => {
    const existingUser = await prisma.user.findFirst({ where: { email: newUser.email } })
    if (existingUser) {
      throw new Error("Email already exists!")
    }

    const createdUser = await prisma.user.create({ data: newUser })
  
    console.log({ createdUser })
  
    return createdUser
  }
  
  findUser = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
    
    if (user) {
      return this.convertToAppUser(user)
    }
  }
  
  getUsers = async () => {
    const users = await prisma.user.findMany()

    return users.map(this.convertToAppUser)
  }
  
  updateUser = async (id: string, userDto: UserDto) => {
    return this.convertToAppUser(await prisma.user.update({ where: { id: parseInt(id) }, data: userDto }))
  }
  
  deleteUser = async (id: string) => {
   await prisma.user.delete({ where: { id: parseInt(id) } })
  }
}

export const userService = new UsersService()

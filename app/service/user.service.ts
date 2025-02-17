import type { User } from "~/model/user";
import type { UserDto } from "~/types/user-types";

export const users: User[] = [
  { id: "1", name: "John Doe", email: "admin@test.com", password: "adminpass123" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", password: "jane123" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", password: "bob123" },
]

let idCounter = users.length;

export const addUser = async (newUser: Omit<User, "id">) => {
  idCounter++
  const createdUser = { id: idCounter.toString(), ...newUser }
  users.push(createdUser)

  return createdUser
}

export const findUser = async (id: string) => {
  return users.find(it => it.id == id)
}

export const editUser = async (id: string, updatedUser: UserDto) => {
  const user = await findUser(id)

  if (user) {
    const index = users.indexOf(user)
    users[index] = { ...users[index], ...updatedUser }

    return updatedUser
  }

  return null
}

export const deleteUser = async (id: string) => {
  const user = await findUser(id)

  if (user) {
    const index = users.indexOf(user)
    users.splice(index, 1)
  }
}


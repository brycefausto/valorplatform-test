import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  { name: "John Doe", email: "admin@testmail.com", password: "adminpass123", role: "Admin", phone: "1234567890", address: "123 Main St" },
  { name: "Jane Smith", email: "jane@example.com", password: "jane123", role: "Editor", phone: "1234567891", address: "124 Abc St"},
  { name: "Bob Johnson", email: "bob@example.com", password: "bob123", role: "Editor", phone: "1234567892", address: "125 Xyz St" },
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

main()
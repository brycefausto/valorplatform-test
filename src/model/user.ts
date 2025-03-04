export interface AppUser {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  image?: string
  role?: UserRole
}

export enum UserRole {
  ADMIN = "Admin",
  DISTRIBUTOR = "Distributor",
  RESELLER = "Reseller",
  VIP = "VIP",
  CUSTOMER = "Customer"
}

export const userRoles = Object.values(UserRole)

export type LoginDto = {
  email: string;
  password: string;
}

export type RegisterDto = Omit<AppUser, "id"> & {
  password: string
  confirmPassword: string
}

export type CreateUserDto = Omit<AppUser, "id"> & {
  password: string,
  confirmPassword?: string
}

export type UpdateUserDto = Omit<AppUser, "id" | "password" | "image"> & {
  image?: string | null
}

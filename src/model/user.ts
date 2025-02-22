export interface AppUser {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  image?: string
  role?: string
}

export type LoginDto = {
  email: string;
  password: string;
}

export type RegisterDto = Omit<AppUser, "id"> & {
  password: string
  confirmPassword: string
}

export type CreateUserDto = Omit<AppUser, "id"> & { password: string }

export type EditUserDto = Omit<AppUser, "id" | "password">

export type UserDto = Omit<AppUser, "id" | "password">
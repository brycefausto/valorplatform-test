import type { User } from "~/model/user";

export type UserDto = Omit<User, "password">
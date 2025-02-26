import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  name: z.string().min(2).max(50),
  phone: z.string().max(25).optional(),
  address: z.string().max(25).optional(),
})

export type UpdateUserData = z.output<typeof updateUserSchema>

import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  name: z.string().min(2).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
  confirmPassword: z.string().max(25),
  phone: z.string().max(25).optional(),
  address: z.string().max(25).optional(),
})
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpData = z.output<typeof signUpSchema>

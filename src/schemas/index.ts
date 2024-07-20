import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, { message: "Too short password" }),
})

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Min 6 characters required" }),
  name: z.string().min(1, { message: "not valid name" }),
})

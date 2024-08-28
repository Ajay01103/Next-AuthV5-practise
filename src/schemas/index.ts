import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, { message: "Too short password" }),
  code: z.optional(z.string()),
})

export const ResetSchema = z.object({
  email: z.string().email(),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6),
})

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Min 6 characters required" }),
  name: z.string().min(1, { message: "not valid name" }),
})

export const settingsSchema = z.object({
  name: z.optional(z.string()),
})

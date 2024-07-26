"use server"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/utils/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import * as z from "zod"
import { generatePasswordResetToken } from "@/utils/tokens"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Email" }
  }

  const { email } = validatedFields.data

  const existingEmail = await getUserByEmail(email)

  if (!existingEmail) {
    return { error: "Email not Found" }
  }

  //generate token and send email
  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: "Reset email sent!" }
}

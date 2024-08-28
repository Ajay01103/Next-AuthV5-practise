"use server"

import * as z from "zod"

import { settingsSchema } from "@/schemas"
import { getUserById } from "@/utils/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id!)

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  })

  return { success: "Updated successfully" }
}

"use client"

import { logout } from "@/actions/logout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut, useSession } from "next-auth/react"
import { useState, useTransition } from "react"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { settingsSchema } from "@/schemas"
import { settings } from "@/actions/settings"
import { Input } from "@/components/ui/input"

//this is how we protect client component in Authjs

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()

  const user = useCurrentUser()

  // logout at client side or client level
  const onClick = () => {
    signOut()
  }

  //logout at server side and as well as client side
  // const onClick = async () => {
  //   logout()
  // }

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Something went wrong"))
    })
  }

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>Settings</p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edit Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsPage

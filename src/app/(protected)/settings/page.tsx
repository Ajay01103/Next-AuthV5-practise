"use client"

import { logout } from "@/actions/logout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut, useSession } from "next-auth/react"
import { useState, useTransition } from "react"

import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { settingsSchema } from "@/schemas"
import { settings } from "@/actions/settings"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormSuccess } from "@/components/form/form-success"
import { FormError } from "@/components/form/form-error"
import { UserRole } from "@prisma/client"

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
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
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

                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password (Optional)</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="******"
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password (Optional)</FormLabel>

                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="******"
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>

                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flow-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Auth</FormLabel>
                        <FormDescription>
                          Enable or disable two factor auth for you account
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button
              disabled={isPending}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsPage

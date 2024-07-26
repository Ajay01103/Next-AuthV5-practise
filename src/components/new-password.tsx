"use client"

import { CardWrapper } from "./card-wrapper"
import { NewPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { FormError } from "./form/form-error"
import { FormSuccess } from "./form/form-success"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <CardWrapper
        headerLabel="Set your new assword"
        backButtonLabel="Back to Login"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              disabled={isPending}
              className="grid w-full"
              type="submit"
              size="default"
            >
              Confirm Password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

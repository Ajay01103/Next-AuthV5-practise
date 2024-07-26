"use client"

import { CardWrapper } from "./card-wrapper"
import { ResetSchema } from "@/schemas"
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
import { Button, buttonVariants } from "./ui/button"
import { FormError } from "./form/form-error"
import { FormSuccess } from "./form/form-success"
import { reset } from "@/actions/reset-password"

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <CardWrapper
        headerLabel="Forgotten the password ?"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="joe@gmail.com"
                        type="email"
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
              Send reset email
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

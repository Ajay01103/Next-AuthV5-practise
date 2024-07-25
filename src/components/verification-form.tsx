"use client"

import { Loader2 } from "lucide-react"
import { CardWrapper } from "./card-wrapper"

import { emailVerification } from "@/actions/email-verification"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FormError } from "./form/form-error"
import { FormSuccess } from "./form/form-success"

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError("missing-token")
      return
    }

    emailVerification(token)
      .then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
      .catch(() => setError("Something went wrong"))
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col gap-4 items-center w-full justify-center">
        {!success && !error && <Loader2 className="size-10 animate-spin" />}
        <FormSuccess message={success} />

        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}

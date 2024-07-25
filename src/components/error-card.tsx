import { Header } from "@/components/header"
import { BackButton } from "@/components/back-button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

import React from "react"

export const ErrorCard = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <Header label="OOPs something went wrong!" />
        </CardHeader>

        <CardFooter>
          <BackButton
            label="Back to login"
            href="/auth/login"
          />
        </CardFooter>
      </Card>
    </div>
  )
}

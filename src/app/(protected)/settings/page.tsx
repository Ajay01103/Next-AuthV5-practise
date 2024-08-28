"use client"

import { logout } from "@/actions/logout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut, useSession } from "next-auth/react"
import { useTransition } from "react"

//this is how we protect client component in Authjs

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition()

  // const user = useCurrentUser()
  const { update } = useSession()

  // logout at client side or client level
  const onClick = () => {
    signOut()
  }

  //logout at server side and as well as client side
  // const onClick = async () => {
  //   logout()
  // }

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>Settings</p>
      </CardHeader>

      <CardContent>
        <Button>Edit Name</Button>
      </CardContent>
    </Card>
  )
}

export default SettingsPage

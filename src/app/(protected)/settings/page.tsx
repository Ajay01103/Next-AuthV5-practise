"use client"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut } from "next-auth/react"

//this is how we protect client component in Authjs

const SettingsPage = () => {
  const user = useCurrentUser()

  // logout at client side or client level
  const onClick = () => {
    signOut()
  }

  //logout at server side and as well as client side
  // const onClick = async () => {
  //   logout()
  // }

  return (
    <div>
      <div className="bg-white py-10 rounded-xl"></div>

      <Button
        onClick={onClick}
        type="submit"
        variant="destructive"
      >
        Logout
      </Button>
    </div>
  )
}

export default SettingsPage

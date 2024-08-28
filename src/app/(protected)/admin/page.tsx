"use client"

import { admin } from "@/actions/admin"
import { FormSuccess } from "@/components/form/form-success"
import { RoleGate } from "@/components/role-gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
//To get the role of the authenticated user on client side
//To get the role of the authenticated user on server side
//refer to the lib/auth file

import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

const AdminPage = () => {
  //   const role = useCurrentRole()

  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed", {
          description: "You are allowed to access admin api",
        })
      } else {
        toast.error("Not Allowed", {
          description: "You dont have admin rights to access the api",
        })
      }
    })
  }

  const onserverActionRoleClick = async () => {
    admin().then((res) => {
      if (res.success) {
        toast.success(res.success, {
          description: "You are allowed to access admin api",
        })
      } else {
        toast.error(res.error, {
          description: "You dont have admin rights to access the api",
        })
      }
    })
  }

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>Admin Page</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this page" />
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin only Server Action</p>
          <Button onClick={onserverActionRoleClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage

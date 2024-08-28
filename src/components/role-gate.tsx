"use client"

import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { FormError } from "./form/form-error"

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return <FormError message="You dont have permission to access this page" />
  }
  return <>{children}</>
}

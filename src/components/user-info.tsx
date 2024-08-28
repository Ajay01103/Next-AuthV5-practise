import { ExtendedUser } from "../../next-auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserInfoProps {
  user?: ExtendedUser
  label: string
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-row bg-slate-200/50 items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="text-sm">{user?.id}</p>
        </div>

        <div className="flex flex-row bg-slate-200/50 items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="text-sm">{user?.name}</p>
        </div>

        <div className="flex flex-row bg-slate-200/50 items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm">{user?.email}</p>
        </div>

        <div className="flex flex-row bg-slate-200/50 items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        <div className="flex flex-row bg-slate-200/50 items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge
            className="px-4 py-1.5"
            variant={user?.isTwoFactorEnabled ? "default" : "destructive"}
          >
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

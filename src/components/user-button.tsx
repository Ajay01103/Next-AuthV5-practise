"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/use-current-user"

import { LogoutButton } from "./logout-button"

export const UserButton = () => {
  const user = useCurrentUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>
            <FaUser className="text-slate-700" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-[200px]"
      >
        <DropdownMenuItem className="cursor-pointer">
          <LogoutButton>logout</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

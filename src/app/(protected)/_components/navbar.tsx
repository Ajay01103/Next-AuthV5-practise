"use client"

import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/user-button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className="bg-slate-300 flex justify-between items-center p-4 w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          variant={pathname === "/settings" ? "default" : "outline"}
          asChild
        >
          <Link href="/settings">settings</Link>
        </Button>

        <Button
          variant={pathname === "/server" ? "default" : "outline"}
          asChild
        >
          <Link href="/server">server</Link>
        </Button>

        <Button
          variant={pathname === "/client" ? "default" : "outline"}
          asChild
        >
          <Link href="/client">client</Link>
        </Button>

        <Button
          variant={pathname === "/admin" ? "default" : "outline"}
          asChild
        >
          <Link href="/admin">admin</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}

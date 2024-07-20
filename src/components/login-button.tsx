"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const LoginButton = ({ children, asChild, mode = "redirect" }: LoginButtonProps) => {
  const router = useRouter()

  if (mode === "modal") {
    return <span>Implement it</span>
  }

  const onClick = () => {
    router.push("/auth/login")
  }

  return (
    <span
      onClick={onClick}
      className="cursor-pointer"
    >
      {children}
    </span>
  )
}

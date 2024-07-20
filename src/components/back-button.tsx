"use client"

import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface BackButtonProps {
  href: string
  label: string
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link
      className={buttonVariants({
        variant: "link",
        className: "font-normal w-full",
      })}
      href={href}
    >
      {label}
    </Link>
  )
}

import { cn } from "@/lib/utils"

interface HeaderProps {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className={cn("text-3xl font-semibold")}>🔐 Auth</h1>
      <p className="text-muted-foreground text-sm py-2">{label}</p>
    </div>
  )
}

import { LoginButton } from "@/components/login-button"
import Particles from "@/components/particles"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  const divStyle = {
    background:
      "radial-gradient(at 50% 40%, rgb(255, 255, 255), transparent 80%) 0% 0% repeat scroll, " +
      "radial-gradient(at 50% -47%, rgb(172, 224, 249), transparent 80%) 0% 0% repeat scroll, " +
      "radial-gradient(at 0% 0%, rgb(232, 225, 255) 0px, transparent 32%) 0% 0% repeat scroll, " +
      "radial-gradient(at 100% 98%, rgb(255, 241, 235), transparent) 0% 0% repeat scroll, " +
      "radial-gradient(at 0px 97%, rgb(227, 235, 255), white) 0% 0% repeat scroll rgba(0, 0, 0, 0)",
    zIndex: 30,
  }

  return (
    <main
      style={divStyle}
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={"#060270"}
        refresh
      />
      <div className="space-y-6 text-center z-30">
        <h1 className={cn("text-6xl font-semibold drop-shadow-md")}>🔐 Auth JS</h1>
        <p className="text-slate-800 text-lg">Simple authentication in auth.js</p>
        <LoginButton>
          <Button size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  )
}

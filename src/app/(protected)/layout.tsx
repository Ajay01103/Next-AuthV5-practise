import { Navbar } from "./_components/navbar"

interface ProptectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProptectedLayoutProps) => {
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
    <div
      style={divStyle}
      className="min-h-screen w-full flex flex-col gap-y-10 items-center justify-center"
    >
      <Navbar />
      {children}
    </div>
  )
}

export default ProtectedLayout

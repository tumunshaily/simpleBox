import SignUpModal from '@/features/auth/signupModal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signUp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=' backdrop-blur-[10px] bg-black/70 min-h-screen min-w-screen flex'>
    <SignUpModal/>
    </div>
}


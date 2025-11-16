import SignInModal from '@/features/auth/signInModal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signIn')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=' backdrop-blur-[10px] bg-black/70 min-h-screen min-w-screen flex'>
    <SignInModal/>
    </div>
}


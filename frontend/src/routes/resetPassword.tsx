import ForgotPasswordModal from '@/features/auth/forgotPasswordModal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resetPassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=' backdrop-blur-[10px] bg-black/70 min-h-screen min-w-screen flex'>
    <ForgotPasswordModal/>
    </div>
}


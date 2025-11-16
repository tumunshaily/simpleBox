import ResetPasswordModal from '@/features/auth/resetPassword';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reset-password/$resettoken')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resettoken } = Route.useParams();

  return <div className=' backdrop-blur-[10px] bg-black/70 min-h-screen min-w-screen flex'>
    <ResetPasswordModal token={resettoken}/>
    </div>
}

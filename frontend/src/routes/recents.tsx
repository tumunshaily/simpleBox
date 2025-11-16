import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import LoginModal from '../features/auth/signInModal'

function AboutComponent() {
  return (
    <div className=' backdrop-blur-[10px] bg-black/70 min-h-screen min-w-screen flex'>
    <LoginModal/>
    </div>
  )
}

export const Route = createFileRoute('/recents')({
  component: AboutComponent,
})


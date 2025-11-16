import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Sidebar, { SidebarItem } from '../features/layout/SideNavbar'
import { Clock10, File, Home, Image, Upload } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

// active state is buggy need to fix
function RootComponent() {
   const currentPath = location.pathname;
  return (
   
    <>
    <div id="modal"></div>
    <div className='flex overflow-hidden'>
    <Sidebar userName={''} userEmail={''}>
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Home/>} active={currentPath === "/"} text='Home' />
        </Link>
             <Link
          to="/files"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<File/>} active={currentPath === "/files"} text='Files' />
        </Link>
             <Link
          to="/images"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Image/>} active={currentPath === "/images"} text='Images' />
        </Link>
             <Link
          to="/recents"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Clock10/>} active={currentPath === "/recents"} text='Recents' />
        </Link>
        <Link
          to="/upload"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Upload />} active={currentPath === "/upload"} text='upload' />
        </Link>
    </Sidebar>
    <div className='flex overflow-auto'>
      <Outlet />
      </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
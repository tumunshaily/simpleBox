import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Sidebar, { SidebarItem } from '../features/layout/SideNavbar'
import { Clock10, File, Home, Image, Upload } from 'lucide-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
    <div id="modal"></div>
    <div className='flex overflow-hidden'>
    <Sidebar>
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Home/>} text='Home' />
        </Link>
             <Link
          to="/files"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<File/>} text='Files' />
        </Link>
             <Link
          to="/images"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Image/>} text='Images' />
        </Link>
             <Link
          to="/recents"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Clock10/>} text='Recents' />
        </Link>
        <Link
          to="/upload"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        ><SidebarItem icon={<Upload />} text='upload' />
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
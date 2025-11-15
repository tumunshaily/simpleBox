import './App.css'
import FileCard from './components/FileCard'
import SideNavbar, { SidebarItem } from './components/SideNavbar'
import {Folder, File, Image, CircleGauge, HomeIcon} from "lucide-react"
import FilesContainer from './containers/Files'

function App() {

  return (
    <main className='flex'>
  <SideNavbar>
    <SidebarItem icon={<HomeIcon/>} text="HOME"></SidebarItem>
    <SidebarItem icon={<Folder/>} text="FILES"></SidebarItem>
    <SidebarItem icon={<Image/>} text="PHOTOS"></SidebarItem>
    <SidebarItem icon={<File/>} text="PDFS"></SidebarItem>
    <SidebarItem icon={<CircleGauge/>} text="RECENT"></SidebarItem>
  </SideNavbar>
  <FilesContainer/>
      </main>
  )
}

export default App

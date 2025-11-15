import './App.css'
import SideNavbar, { SidebarItem } from './Components/SideNavbar'
import {Folder, File, Image, CircleGauge, HomeIcon} from "lucide-react"

function App() {

  return (
    <>
  <SideNavbar>
    <SidebarItem icon={<HomeIcon/>} text="HOME"></SidebarItem>
    <SidebarItem icon={<Folder/>} text="FILES"></SidebarItem>
    <SidebarItem icon={<Image/>} text="PHOTOS"></SidebarItem>
    <SidebarItem icon={<File/>} text="PDFS"></SidebarItem>
    <SidebarItem icon={<CircleGauge/>} text="RECENT"></SidebarItem>
  </SideNavbar>
    </>
  )
}

export default App

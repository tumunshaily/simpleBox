import { MoreVertical, ChevronLast, ChevronFirst, UserRound, Box } from "lucide-react"
import { useContext, createContext, useState, type  ReactNode  } from "react"
const SidebarContext = createContext({expanded:false})

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <aside className="flex h-screen items-center">
      <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {expanded && <div className=" text-gray-600 flex items-center gap-1" >
            <Box size={50}/>
            <h1 >Simple Box</h1>
          </div>}
         
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst color="black"   /> : <ChevronLast color="black"  />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 p-3 items-center justify-between">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <button><UserRound size={30} color="grey"/></button>
          {expanded && <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all $ w-52 ml-3
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} color="grey" />
          </div>
}
        </div>
      </nav>
    </aside>
  )
}

type SidebarItemProps = {
  icon: ReactNode,
   text:string, 
   active?:boolean, 
   alert?:boolean
}

export function SidebarItem({ icon, text, active, alert }:SidebarItemProps) {
  
  const { expanded } = useContext(SidebarContext);
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1 pb-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-4 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}
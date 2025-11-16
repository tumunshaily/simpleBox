import React, { type ReactNode } from 'react'
import { Image, File, FileText, FileQuestionMark, Trash, Eye, Download} from "lucide-react"

type FileCardProp = {
    type: ReactNode,
    fileName:string,
    fileSize:string,
    fileDownloadLink?:string
}
const FileCard = ({type,fileName,fileSize,fileDownloadLink}:FileCardProp) => {
    let FileType = <FileQuestionMark size={20}/>;
    switch(type) {
                  case "pdf":   FileType= <File size={200}/>; break;
                  case "image":   FileType= <Image size={200}/>;break;
                  case "text":    FileType= <FileText size={200}/>;break;
                  default:   FileType= <FileQuestionMark size={200}/>;
                }
  return (
    <div className='  p-3 inline-flex flex-col h-fit w-fit bg-white border-2 rounded-xl '>
        <div className='flex-2 text-gray-200 p-3  '>
               <span className="flex w-full justify-center">
                <span className=' border-2 rounded-3xl' >{FileType}</span>
                
            </span>
            <span className="flex text-black p-2">
                {fileName}
            </span>
        </div>
        <span className=' border-1 mb-2 text-black'></span>
        <div className='flex flex-1 justify-between text-black '>
                <span className='flex gap-2'>
                    <h3>Filesize:</h3>
                    {fileSize}
                </span>
                <span className='flex gap-6 mr-2 my-auto'>
                <button className=' hover:bg-gray-300 h-fit p-1 rounded-sm '><Eye/></button>
                <button className=' hover:bg-gray-300 h-fit  p-1 rounded-sm'><Download/></button>
                <button className=' hover:bg-gray-300 h-fit  p-1 rounded-sm'><Trash/></button>
                </span>
                
            </div>
    </div>
  )
}

export default FileCard
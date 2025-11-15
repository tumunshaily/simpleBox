import React from 'react'
import FileCard from '../components/FileCard'

const FilesContainer = () => {
  return (
    <div className='grid grid-cols-3 gap-4 h-screen overflow-auto mx-auto'>
        <FileCard type={"pdf"} fileName={"check asd asda sdads heck asd asda sdads heck asd asda sdads"} fileSize={"2.6MB"}/>
  <FileCard type={"text"} fileName={"check asd asda sdads heck asd asda sdads heck asd asda sdads"} fileSize={"2.6MB"}/>
  <FileCard type={"image"} fileName={"check asd asda sdads heck asd asda sdads heck asd asda sdads"} fileSize={"2.6MB"}/>
  <FileCard type={"image"} fileName={"check asd asda sdads heck asd asda sdads heck asd asda sdads"} fileSize={"2.6MB"}/>
  <FileCard type={"image"} fileName={"check asd asda sdads heck asd asda sdads heck asd asda sdads"} fileSize={"2.6MB"}/>
  <FileCard type={"image"} fileName={"check asd asda sdads heck asd asda sdads heck asd asda sdads"} fileSize={"2.6MB"}/>
     </div>
  )
}

export default FilesContainer
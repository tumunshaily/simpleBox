import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import FileCard from '../features/dashboard/FileCard'

type file = {
  name:string,
  size:string,
  type:string,
  downloadUrl:string
}

type fileContainerProps = {
  fileList:file[]
}

const dummyData = [
  {
    name:"Tumun",
  size:"2.4kb",
  type:"image",
  downloadUrl:"None"
  },
    {
    name:"sss",
  size:"2.4mb",
  type:"pdf",
  downloadUrl:"None"
  },
    {
    name:"Tuaaaaaaaaaaaaadasdmun",
  size:"2.4kb",
  type:"text",
  downloadUrl:"None"
  },
    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  type:"video",
  downloadUrl:"None"
  },
]


const FileContainer = ({fileList}:fileContainerProps) => {
  console.log(fileList)
  return (
    <>
    {fileList.map((ele,index) => {
      return <FileCard key={index} type={ele.type} fileName={ele.name} fileSize={ele.size} fileDownloadLink={ele.downloadUrl} />
    })}
    </>
  )
}

export const Route = createFileRoute('/files')({
  component: () => <FileContainer fileList={dummyData} />,
})


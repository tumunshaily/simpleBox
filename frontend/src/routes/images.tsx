import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import FileCard from '../features/dashboard/FileCard'

type image = {
  name:string,
  size:string,
  downloadUrl:string
}

type imageContainerProps = {
  imageList:image[]
}
const dummyData = [
  {
    name:"Tumun",
  size:"2.4kb",
  downloadUrl:"None"
  },
    {
    name:"sss",
  size:"2.4mb",
  downloadUrl:"None"
  },
    {
    name:"Tuaaaaaaaaaaaaadasdmun",
  size:"2.4kb",
  downloadUrl:"None"
  },
    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  },    {
    name:"asdasdadsasd asdasdasdas",
  size:"2.4kb",
  downloadUrl:"None"
  }
]


const ImangeContainer = ({imageList}:imageContainerProps) => {
  console.log(imageList)
  return (
    <div className='flex flex-wrap  gap-2.5 p-2 '>
    {imageList.map((ele,index) => {
      return <FileCard key={index} type={"image"} fileName={ele.name} fileSize={ele.size} fileDownloadLink={ele.downloadUrl} />
    })}
    </div>
  )
}

export const Route = createFileRoute('/images')({
  component: () => <ImangeContainer imageList={dummyData} />,
})


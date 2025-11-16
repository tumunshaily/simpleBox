import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router'
import { Upload } from 'lucide-react'
import { useState } from 'react';
import Dropzone from 'react-dropzone'

const ImageUpload = () => {
const [file, setFile] = useState<File | null>(null);

const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]); // allow ONLY one file
    }
  };

return <div className=' m-auto w-screen flex  items-center flex-col text-blue-950 text-2xl '><Dropzone multiple={false} onDrop={handleDrop}>
  {({getRootProps, getInputProps}) => (
    <section className=' w-fit border-4 p-5 rounded-2xl items-center flex flex-col align-middle justify-center' >
      <div {...getRootProps()}  >
        <input {...getInputProps()} className='bg-amber-400 w-full '/>
       
        <Upload size={50} className=" cursor-pointer"/>
      </div>
       <h1>Drag 'n' drop files, or click to select files</h1>
    </section>
  )}
</Dropzone>

 {file && (
  <>
        <div className="mt-6 p-4 bg-blue-100 rounded-lg w-[300px] shadow-sm">
          <h2 className="font-bold text-blue-900 mb-2">Uploaded File</h2>
          <p className="text-sm">
            <span className="font-medium">Name:</span> {file.name}
          </p>
          <p className="text-sm">
            <span className="font-medium">Size:</span>{" "}
            {(file.size / 1024).toFixed(2)} KB
          </p>
          
        </div>
        <Button variant="outline" className='mt-2'> Upload to server</Button>
        </>
      )}
</div>
}

export const Route = createFileRoute('/upload')({
  component: ImageUpload,
})


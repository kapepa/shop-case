"use client"

import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { RoutesPaths } from "@/types/enums";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Dropzone, {FileRejection} from 'react-dropzone';


const UploadPage: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast()
  const [progress, setProgress] = useState<number>(0)
  const [isPending, startTransition] = useTransition()
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`${RoutesPaths.ConfigureDesign}?id=${configId}`)
      })
    },
    onUploadProgress(p) {
      setProgress(p)
    },
  });

  const onDropRejected = (rejecttedFiles: FileRejection[]) => {
    const [file] = rejecttedFiles;

    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported.`,
      description: `Please choose a PNG, JPG or jPEG image instead.`,
      variant: "destructive",
    })
  }
  
  const onDropAccepted = (acceptedFile: File[]) => {
    startUpload(acceptedFile, { configId: undefined });
    setIsDragOver(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 right-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div
        className="relative flex flex-1 flex-col items-center justify-center w-full"
      >
        <Dropzone
          accept={{
            'image/png': [".png"],
            'image/jpeg': [".jpeg"],
            'image/jpg': [".jpg"],
          }}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({getRootProps, getInputProps}) => (
            <div 
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {
                isDragOver 
                ? (
                  <MousePointerSquareDashed
                    className="h-6 w-6"
                  />
                )
                : isUploading || isPending ? <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2"/> : <Image className="h-6 w-6 text-zinc-500 mb-2"/> 
              }
              <div
                className="flex flex-col justify-center mb-2 text-sm text-zinc-700"
              >
                {
                  isUploading
                  ? (
                    <div
                      className="flex flex-col items-center"
                    >
                      <p>
                        Uploading...
                      </p>
                      <Progress 
                        value={progress} 
                        className="mt-2 w-40 h-2 bg-gray-300" 
                      />
                    </div>
                  )
                  : (
                    isPending
                    ? (
                      <div
                        className="flex flex-col items-center"
                      >
                        <p>
                          Redirecting, please wait...
                        </p>
                      </div>
                    )
                    : (
                      isDragOver
                      ? (
                        <p>
                          <span
                            className="font-semibold"
                          >
                            Drop file
                          </span> to upload
                        </p>
                      )
                      : (
                        <p>
                          <span
                            className="font-semibold"
                          >
                           Click to upload
                          </span> or drag and drop
                        </p>
                      )
                    )
                  )
                }
              </div>
              {
                isPending  
                ? "" 
                : (
                  <p
                    className="text-xs text-zinc-500"
                  >
                    PNG, JPG, JPEG
                  </p>
                )
              }
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default UploadPage;
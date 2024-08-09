import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

type DisignTypes = Pick<Configuration,  "width" | "height">

interface DisignConfigurationProps {
  configId: Configuration["id"],
  imageUrl: Configuration["imageUrl"],
  imageDimensions: DisignTypes,
}

const DisignConfiguration: FC<DisignConfigurationProps> = ({ configId, imageUrl, imageDimensions }) => {
  return (
    <div
      className="relative mt-20 grid grid-cols-3 mb-20 pb-20"
    >
      <div
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus: ring-offset-2"
      >
        <div
          className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]"
        >
          <AspectRatio 
            ratio={896/1831}
            className="pointer-events-none relative z-50 aspect-[896/1831]"
          >
            <Image 
              fill
              src="/phone-template.png" 
              alt="phone image" 
              className="rounded-md object-cover z-50 select-none" 
            />
          </AspectRatio>
          <div
            className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)"
          />
          <div
            className={cn(
              'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',

            )}
          />
        </div>

        <div
          className="relative w-full h-full"
        >
          <Image
            fill
            src={imageUrl}
            alt="your image"
            className="pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}

export { DisignConfiguration }
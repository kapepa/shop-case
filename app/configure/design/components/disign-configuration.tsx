"use client"

import { HandleComponent } from "@/components/handle-component";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import { Rnd } from "react-rnd"
import { RadioGroup } from '@headlessui/react'
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/app/validators/option-validator";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";


type DisignTypes = Pick<Configuration,  "width" | "height">

interface DisignConfigurationProps {
  configId: Configuration["id"],
  imageUrl: Configuration["imageUrl"],
  imageDimensions: DisignTypes,
}

interface OptionsState {
  color: (typeof COLORS)[number], 
  model: (typeof MODELS.options)[number], 
  material: (typeof MATERIALS.options)[number], 
  finish: (typeof FINISHES.options)[number],
}

const DisignConfiguration: FC<DisignConfigurationProps> = ({ configId, imageUrl, imageDimensions }) => {
  const [options, setOptions] = useState<OptionsState>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })


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
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          className="absolute z-20 border-[3px] border-primary"
          default={{
            x: 150,
            y: 205,
            width: imageDimensions.width / 4,
            height: imageDimensions.height /4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent/>,
            bottomLeft: <HandleComponent/>,
            topRight: <HandleComponent/>,
            topLeft: <HandleComponent/>,
          }}
        >
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
        </Rnd>
      </div>

      <div 
        className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'
      >
        <ScrollArea className='relative flex-1 overflow-auto'>
          <div
            aria-hidden='true'
            className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none'
          />

          <div className='px-8 pb-12 pt-8'>
            <h2 className='tracking-tight font-bold text-3xl'>
              Customize your case
            </h2>

            <div className='w-full h-px bg-zinc-200 my-6' />

            <div className='relative mt-4 h-full flex flex-col justify-between'>
              <div className='flex flex-col gap-6'>
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }))
                  }}>
                  <Label>Color: {options.color.label}</Label>
                  <div className='mt-3 flex items-center space-x-3'>
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            `relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-solid border-2 border-transparent`,
                            {
                              [`border-${color.tw}`]: active || checked,
                            }
                          )
                        }>
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div
                  className="relative flex flex-col gap-3 w-full"
                >
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronDown
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {
                        MODELS.options.map((item, index) => (
                          <DropdownMenuItem
                            key={`${item}-${index}`}
                            onClick={() => {
                              setOptions(prev => ({
                                ...prev,
                                model: item,
                              }))
                            }}
                            className={cn(
                              "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                              {
                                ["bg-zinc-100"]: item.label === options.model.label,
                              }
                            )}
                          >
                            <Check
                              className={cn(
                                "mr-4 h-4 w-4",
                                item.label === options.model.label ? "opacity-100" : "opacity-0"
                              )}
                            />
                            { item.label }
                          </DropdownMenuItem>
                        ))
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map((group, index) => (
                  <RadioGroup
                    key={`${group.name}-${index}`}
                    value={options[group.name]}
                    onChange={(val) => {
                      setOptions(prev => ({
                        ...prev,
                        [group.name]: val
                      }))
                    }}
                  >
                    <Label>
                      {group.name.slice(0,1).toUpperCase() + group.name.slice(1)}
                    </Label>
                    <div
                      className="mt-4 space-y-4"
                    >
                      {
                        group.options.map((option, index) => (
                          <RadioGroup.Option
                            key={`${option.value}-${index}`}
                            value={option}
                            className={({ active, checked }) => cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none right-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              {
                                "border-primary": active || checked,
                              }
                            )}
                          >
                            <span
                              className="flex items-center"
                            >
                              <span
                                className="flex flex-col text-sm"
                              >
                                <RadioGroup.Label
                                  className="font-medium text-gray-900"
                                  as="span"
                                >
                                  { option.label }
                                </RadioGroup.Label>
                                {
                                  option.description 
                                  ? (
                                    <RadioGroup.Description
                                      as="span"
                                      className="text-gray-500"
                                    >
                                      <span
                                        className="block sm:inline"
                                      >
                                        {option.description}
                                      </span>
                                    </RadioGroup.Description>
                                  )
                                  : null
                                }
                              </span>
                            </span>
                          </RadioGroup.Option>
                        ))
                      }
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export { DisignConfiguration }
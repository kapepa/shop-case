import { PRODUCT_PRICES } from "@/config/product";
import { CaseFinish } from "@prisma/client";

export const COLORS = [
  {
    label: "Black",
    value: "black",
    bg: "bg-zinc-900",
    border: "border-zinc-900"
  },
  {
    label: "Blue",
    value: "blue",
    bg: "bg-blue-950",
    border: "border-blue-950",
  },
  {
    label: "Rose",
    value: "rose",
    bg: "bg-rose-950",
    border: "border-rose-950",
  }
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone X",
      value: "iphonex"
    },
    {
      label: "iPhone 11",
      value: "iphone11"
    },
    {
      label: "iPhone 12",
      value: "iphone12"
    },
    {
      label: "iPhone 13",
      value: "iphone13"
    },
    {
      label: "iPhone 14",
      value: "iphone14"
    },
    {
      label: "iPhone 15",
      value: "iphone15"
    },
  ]
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCT_PRICES.material.silicone
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate
    },
  ]
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: CaseFinish.smooth,
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth
    },
    {
      label: "Texture Finish",
      value: CaseFinish.textured,
      description: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.textured
    },
  ]
} as const;
import { FC } from "react"

interface HandleComponentProps {
  
}

const HandleComponent: FC<HandleComponentProps> = ({}) => {
  return (
    <div
      className="w-5 h-5 rounded-full shadow border bg-white border-zinc-200 transition hover:bg-primary"
    />
  )
}

export { HandleComponent }
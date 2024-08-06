import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useCallback } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string,
  dark?: boolean,
}

const Phone: FC<PhoneProps> = ({ imgSrc, dark = false, className, ...props }) => {

  const PhoneImage = useCallback(() => {
    switch (dark) {
      case true : return "/phone-template-white-edges.png";
      default: return "/phone-template-white-edges.png";
    }
  }, [dark])

  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={PhoneImage()}
        alt="phone image"
      />
      <div
        className="absolute -z-10 inset-0"
      >
        <img
          className="object-cover"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  )
}

export { Phone }
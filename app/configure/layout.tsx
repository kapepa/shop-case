import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Steps } from "@/components/steps";
import { FC, ReactNode } from "react";

interface ConfigureLayoutProps {
  children: ReactNode,
}

const ConfigureLayout: FC<ConfigureLayoutProps> = ({ children }) => {
  return (
    <MaxWidthWrapper
      className="flex-1 flex flex-col"
    >
      <Steps/>
      { children }
    </MaxWidthWrapper>
  )
}

export default ConfigureLayout;
"use client"

import { Dispatch, FC, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { Label } from "./ui/label";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

interface LoginModalProps {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const LoginModal: FC<LoginModalProps> = (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent 
        className="absolute z-[9999]"
      >
        <DialogHeader>
          <div
            className="relative mx-auto w-24 h-24 mb-2"
          >
            <Image
              src="/snake-1.png"
              alt="snake image"
              className="object-contain"
              fill
            />
          </div>
          <DialogTitle
            className="text-3xl text-center font-bold tracking-tight text-gray-900"
          >
            Log in to continue
          </DialogTitle>
          <DialogDescription
            className="text-base text-center py-2"
          >
            <span
              className="font-medium text-zinc-900"
            >
              Your configuration was saved
            </span>
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter
          className="grid grid-cols-2 gap-6 divide-x divide-gray-200"
        >
          <LoginLink
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </LoginLink>
          <RegisterLink
            className={buttonVariants({ variant: "default" })}
          >
            Register
          </RegisterLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { LoginModal }
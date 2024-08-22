"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client"
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import { FC } from "react"
import { changeorderStatus } from "../actions";
import { useRouter } from "next/navigation";

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awating_shipment: "Awaiting shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped"
}

interface StatusDropdownProps {
  id: string,
  status: OrderStatus,
}

const StatusDropdown: FC<StatusDropdownProps> = (props) => {
  const { id, status } = props;
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeorderStatus,
    onSuccess: () => router.refresh()
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button
          variant="outline"
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[status]}
          <ChevronDown
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-0"
      >
        {
          Object.keys(OrderStatus).map((sta) => (
            <DropdownMenuItem
              key={sta}
              className={cn(
                "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
                {
                  "bg-zinc-100": status === sta
                }
              )}
              onClick={() => mutate({id, newStatus: sta as OrderStatus})}
            >
              <Check
                className={
                  cn(
                    "mr-2 h-4 w-4 text-primary",
                    status === sta ? "opacity-100" : "opacity-0"
                  )
                }
              />
              {LABEL_MAP[sta as OrderStatus]}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { StatusDropdown }
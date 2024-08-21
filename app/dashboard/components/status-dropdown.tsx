import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@prisma/client"
import { FC } from "react"

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
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

export { StatusDropdown }
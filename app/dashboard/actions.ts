import prisma from "@/db"
import { OrderStatus } from "@prisma/client"

interface ChangeorderStatusProps {
  id: string,
  newStatus: OrderStatus,
}

const changeorderStatus = async ({ id, newStatus }: ChangeorderStatusProps) => {
  await prisma.order.update({
    where: { id },
    data: { status: newStatus },
  })
}

export { changeorderStatus }
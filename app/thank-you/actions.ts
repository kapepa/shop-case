"use server"

import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const getPaymentStatus = async ({ orderId }: {orderId: string}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if(!user?.id || !user?.email) throw new Error("You need to be logged in to view this page.");

  const order = await prisma.order.findFirst({
    where: {
      id: orderId, userId: user.id,
    },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    }
  })

  if (order?.isPaid) {
    return order;
  } else {
    return false;
  }
};

export { getPaymentStatus }
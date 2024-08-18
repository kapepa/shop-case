"use server"

import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user.email) throw new Error("Invalid user data");

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    }
  })

  if (!existingUser) await prisma.user.create({
    data: {
      id: user.id,
      email: user.email,
    }
  })

  return { success: true }
}

export { getAuthStatus }
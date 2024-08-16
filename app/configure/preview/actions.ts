"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import prisma from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createCheckoutSession = async ({ configId } : { configId: string }) => {
  const configuration = await prisma.configuration.findUnique({
    where: {
      id: configId,
    }
  });

  if (!configuration) throw new Error("No such configuration found");

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("You need to be logged in");

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

  
}
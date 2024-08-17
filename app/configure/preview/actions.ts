"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import prisma from "@/db"
import { stripe } from "@/lib/stripe";
import { RoutesPaths } from "@/types/enums";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({ configId } : { configId: string }) => {
  const configuration = await prisma.configuration.findUnique({
    where: {
      id: configId,
    }
  });

  if (!configuration) throw new Error("No such configuration found");

  const { getUser } = getKindeServerSession();
  const user = await getUser()

  if (!user) throw new Error("You need to be logged in");

  // const existUser = await prisma.user.findUnique({
  //   where: {
  //     id: user.id,
  //   }
  // })

  // if (!existUser) {
  //   await prisma.user.create({
  //     data: {
  //       id: user.id,
  //       email: user.email!
  //     }
  //   })
  // }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    }
  });

  if (!!existingOrder) order = existingOrder
  else order = await prisma.order.create({
    data: {
      amount: price / 100,
      userId: user.id,
      configurationId: configuration.id,
    },
  })

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    }
  });

  const stripSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${configuration.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}${RoutesPaths.ConfigurePreview}?id=${configuration.id}`,
    payment_method_types: ["card", "paypal"],
    mode: "payment",
    // shipping_address_collection: {},
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      {price: product.default_price as string, quantity: 1}
    ]
  })

  return { url: stripSession.url };
}
import prisma from "@/db";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import { DisignConfiguration } from "./components/disign-configuration";

interface DesignPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined,
  }
}

const DesignPage: NextPage<DesignPageProps> = async ({ searchParams }) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const configuration = await prisma.configuration.findUnique({
    where: {
      id
    }
  })
  if (!configuration) return notFound();

  const { imageUrl, width, height } = configuration;

  return (
    <DisignConfiguration
      imageUrl={imageUrl}
      configId={id}
      imageDimensions={{ height, width }}
    />
  )
}

export default DesignPage;
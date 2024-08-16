import prisma from "@/db";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import { DesignPreview } from "./components/design-preview";

interface PreviewPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined,
  }
}

const PreviewPage: NextPage<PreviewPageProps> = async ({ searchParams }) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const configuration = await prisma.configuration.findUnique({
    where: { id }
  })
  if (!configuration) return notFound();

  return (
    <DesignPreview
      configuration={configuration}
    />
  )
}

export default PreviewPage;
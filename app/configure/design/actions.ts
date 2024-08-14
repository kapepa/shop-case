"use server"

import { SaveConfigDto } from "@/app/dto/save-config.dto";
import prisma from "@/db";

export async function saveConfig({ configId, ...other }: SaveConfigDto) {
  await prisma.configuration.update({
    where: { 
      id: configId
    },
    data: other,
  })
}
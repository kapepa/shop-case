import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client";

export interface SaveConfigDto {
  color: CaseColor,
  model: PhoneModel,
  material: CaseMaterial,
  finish: CaseFinish,
  configId: string,  
}
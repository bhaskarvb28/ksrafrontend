// discipline.service.ts

import { api } from "@/shared/lib/api"

import type {
  DisciplinesResponse,
} from "../types/discipline.types"

export async function getDisciplines(): Promise<DisciplinesResponse> {
  return api<DisciplinesResponse>(
    "/disciplines",
    {
      method: "GET",
    },
  )
}
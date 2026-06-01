import { api } from "@/shared/lib/api"

import type {
  StatesResponse,
} from "../types/states.types"

export async function getStates(): Promise<StatesResponse> {
  return api<StatesResponse>(
    "/states",
    {
      method: "GET",
    },
  )
}
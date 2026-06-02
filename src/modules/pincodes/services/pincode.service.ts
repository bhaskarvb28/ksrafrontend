import { api }
from "@/shared/lib/api"

import type {
  Pincode,
} from "../types/pincode.types"

interface GetPincodesResponse {
  success: boolean

  message: string

  data: Pincode[]
}

export async function getPincodes() {
  const response =
    await api<GetPincodesResponse>(
      "/pincodes"
    )

  return response.data
}
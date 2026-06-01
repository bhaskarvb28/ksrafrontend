import { api } from "@/shared/lib/api"

import type { District } from "../types/district.types"

interface GetDistrictsResponse {
  success: boolean

  message: string

  data: District[]
}

export async function getDistricts(stateID: number) {
  const response =
    await api<GetDistrictsResponse>(
      `/districts/states/${stateID}`
    )

  return response.data
}
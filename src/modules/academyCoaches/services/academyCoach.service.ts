import { api }
from "@/shared/lib/api"

import type {
  AcademyCoachProfile,
  AssignCoachPayload,
  GetAcademyCoachesParams,
  PaginatedAcademyCoachesResponse,
} from "../types/academyCoach.types"

type ApiResponse<T> = {
  success: boolean

  message: string

  data: T
}

export async function getAcademyCoaches(
  params: GetAcademyCoachesParams
) {

  const searchParams =
    new URLSearchParams()

  if (params.page) {
    searchParams.set(
      "page",
      String(params.page)
    )
  }

  if (params.limit) {
    searchParams.set(
      "limit",
      String(params.limit)
    )
  }

  if (params.search) {
    searchParams.set(
      "search",
      params.search
    )
  }

  return api<
    ApiResponse<
      PaginatedAcademyCoachesResponse
    >
  >(
    `/academies/coaches?${searchParams.toString()}`
  )
}

export async function getAcademyCoach(
  coachID: string
) {

  return api<
    ApiResponse<AcademyCoachProfile>
  >(
    `/academies/coaches/${coachID}`
  )
}

export async function assignCoach(
  playerID: string,
  payload: AssignCoachPayload
) {

  return api(
    `/academies/players/${playerID}/assign-coach`,
    {
      method: "POST",

      body: JSON.stringify(
        payload
      ),
    }
  )
}

export async function removeCoach(
  playerID: string
) {

  return api(
    `/academies/players/${playerID}/coach`,
    {
      method: "DELETE",
    }
  )
}
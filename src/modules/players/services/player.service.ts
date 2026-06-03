import { api }
from "@/shared/lib/api"

import type {
  PaginatedPlayersResponse,
  PlayerProfileResponse,
}
from "../types/player.types"

type GetPlayersParams = {
  page?: number

  limit?: number

  search?: string

  discipline_id?: number

  coach_assigned?: boolean

  status?: string
}

export async function getAcademyPlayers(
  params: GetPlayersParams = {}
) {
  const searchParams =
    new URLSearchParams()

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null
      ) {
        searchParams.append(
          key,
          String(value)
        )
      }
    }
  )

  return api<{
    success: boolean

    message: string

    data: PaginatedPlayersResponse
  }>(
    `/academies/players?${searchParams.toString()}`
  )
}

export async function getAcademyPlayer(
  playerId: string
) {
  return api<{
    success: boolean

    message: string

    data: PlayerProfileResponse
  }>(
    `/academies/players/${playerId}`
  )
}
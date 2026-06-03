import { useQuery }
from "@tanstack/react-query"

import { getAcademyPlayers }
from "../services/player.service"

type UseAcademyPlayersParams = {
  page?: number

  limit?: number

  search?: string

  discipline_id?: number

  coach_assigned?: boolean

  status?: string
}

export function useAcademyPlayers(
  params: UseAcademyPlayersParams = {}
) {
  return useQuery({
    queryKey: [
      "academy-players",
      params,
    ],

    queryFn: () =>
      getAcademyPlayers(params),

    staleTime: 1000 * 60,
  })
}
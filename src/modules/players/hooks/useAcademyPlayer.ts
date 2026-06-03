import { useQuery }
from "@tanstack/react-query"

import { getAcademyPlayer }
from "../services/player.service"

export function useAcademyPlayer(
  playerId?: string
) {
  return useQuery({
    queryKey: [
      "academy-player",
      playerId,
    ],

    queryFn: () =>
      getAcademyPlayer(playerId!),

    enabled: !!playerId,

    staleTime: 1000 * 60,
  })
}
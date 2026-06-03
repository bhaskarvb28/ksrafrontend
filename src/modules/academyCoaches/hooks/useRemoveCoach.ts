import { useMutation }
from "@tanstack/react-query"

import { useQueryClient }
from "@tanstack/react-query"

import {
  removeCoach,
} from "../services/academyCoach.service"

export function useRemoveCoach() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: (
      playerID: string
    ) =>
      removeCoach(playerID),

    onSuccess: (
      _,
      playerID,
    ) => {

      queryClient.invalidateQueries({
        queryKey: [
          "academy-player",
          playerID,
        ],
      })

      queryClient.invalidateQueries({
        queryKey: [
          "academy-players",
        ],
      })

      queryClient.invalidateQueries({
        queryKey: [
          "academy-coaches",
        ],
      })
    },
  })
}
import { useMutation }
from "@tanstack/react-query"

import { useQueryClient }
from "@tanstack/react-query"

import {
  assignCoach,
} from "../services/academyCoach.service"

export function useAssignCoach() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      playerID,
      coachUserID,
    }: {
      playerID: string

      coachUserID: string
    }) =>
      assignCoach(
        playerID,
        {
          coach_user_id:
            coachUserID,
        }
      ),

    onSuccess: (
      _,
      variables,
    ) => {

      queryClient.invalidateQueries({
        queryKey: [
          "academy-player",
          variables.playerID,
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
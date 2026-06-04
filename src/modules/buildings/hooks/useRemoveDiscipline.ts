import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { toast }
from "sonner"

import {
  BuildingService,
} from "../services/building.service"

type Input = {
  buildingID: string

  disciplineID: number
}

export function useRemoveDiscipline() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        buildingID,
        disciplineID,
      }: Input) =>
        BuildingService.removeDiscipline(
          buildingID,
          disciplineID,
        ),

    async onSuccess(
      response: any,
      variables,
    ) {

      await queryClient.invalidateQueries(
        {
          queryKey: [
            "academy-building",
            variables.buildingID,
          ],
        }
      )

      toast.success(
        response.message ||
          "Discipline removed successfully"
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to remove discipline"
      )
    },
  })
}
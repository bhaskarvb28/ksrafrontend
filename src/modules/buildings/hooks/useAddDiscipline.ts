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

  discipline_id: number
}

export function useAddDiscipline() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        buildingID,
        discipline_id,
      }: Input) =>
        BuildingService.addDiscipline(
          buildingID,
          {
            discipline_id,
          }
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
          "Discipline added successfully"
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to add discipline"
      )
    },
  })
}
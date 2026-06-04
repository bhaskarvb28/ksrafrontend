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

  laneID: number
}

export function useDeleteLane() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        laneID,
      }: Input) =>
        BuildingService.deleteLane(
          laneID,
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
        },
      )

      toast.success(
        response.message ||
          "Lane deleted successfully",
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to delete lane",
      )
    },
  })
}
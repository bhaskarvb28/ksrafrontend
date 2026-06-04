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

  lane_name: string

  is_under_maintenance: boolean
}

export function useUpdateLane() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        laneID,
        lane_name,
        is_under_maintenance,
      }: Input) =>
        BuildingService.updateLane(
          laneID,
          {
            lane_name,
            is_under_maintenance,
          },
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
          "Lane updated successfully",
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to update lane",
      )
    },
  })
}
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

  lane_name: string
}

export function useCreateLane() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        buildingID,
        lane_name,
      }: Input) =>
        BuildingService.createLane(
          buildingID,
          {
            lane_name,
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
          "Lane created successfully",
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to create lane",
      )
    },
  })
}
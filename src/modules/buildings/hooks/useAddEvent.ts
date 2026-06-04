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

  shooting_event_id: number
}

export function useAddEvent() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        buildingID,
        shooting_event_id,
      }: Input) =>
        BuildingService.addEvent(
          buildingID,
          {
            shooting_event_id,
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
          "Building event added successfully",
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to add building event",
      )
    },
  })
}
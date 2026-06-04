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

  eventID: number
}

export function useRemoveEvent() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        buildingID,
        eventID,
      }: Input) =>
        BuildingService.removeEvent(
          buildingID,
          eventID,
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
          "Building event removed successfully",
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to remove building event",
      )
    },
  })
}
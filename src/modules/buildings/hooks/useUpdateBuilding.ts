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

  payload: {
    building_name?: string

    is_active?: boolean
  }
}

export function useUpdateBuilding() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      ({
        buildingID,
        payload,
      }: Input) =>
        BuildingService.updateBuilding(
          buildingID,
          payload
        ),

    async onSuccess(
      response: any,
      variables
    ) {

      await Promise.all([
        queryClient.invalidateQueries(
          {
            queryKey: [
              "academy-buildings",
            ],
          }
        ),

        queryClient.invalidateQueries(
          {
            queryKey: [
              "academy-building",
              variables.buildingID,
            ],
          }
        ),
      ])

      toast.success(
        response.message ||
          "Building updated successfully"
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to update building"
      )
    },
  })
}
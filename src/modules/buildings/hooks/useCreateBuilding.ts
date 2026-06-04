import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { toast }
from "sonner"

import {
  BuildingService,
} from "../services/building.service"

export function useCreateBuilding() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      BuildingService.createBuilding,

    async onSuccess(
      response: any
    ) {

      await queryClient.invalidateQueries(
        {
          queryKey: [
            "academy-buildings",
          ],
        }
      )

      toast.success(
        response.message ||
          "Building created successfully"
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
          "Failed to create building"
      )
    },
  })
}
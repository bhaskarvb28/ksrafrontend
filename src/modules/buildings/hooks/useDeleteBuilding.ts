import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { toast }
from "sonner"

import {
  BuildingService,
} from "../services/building.service"

export function useDeleteBuilding() {

  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      BuildingService.deleteBuilding,

    async onSuccess(
      response: any,
    ) {

      await queryClient.invalidateQueries(
        {
          queryKey: [
            "academy-buildings",
          ],
        },
      )

      toast.success(
        response.message ??
        "Building deleted successfully",
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ??
        "Failed to delete building",
      )
    },
  })
}
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { toast } from "sonner"

import { InviteService } from "../services/invites.service"

export function useDeleteInvite() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      InviteService.deleteInvite,

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["invites"],
      })

      toast.success(
        "Invitation deleted"
      )
    },

    onError() {
      toast.error(
        "Failed to delete invitation"
      )
    },
  })
}
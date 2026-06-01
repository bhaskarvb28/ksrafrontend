import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"

import { InviteService } from "../services/invites.service"

export function useCreateInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: InviteService.createInvite,

    async onSuccess(response) {
      // refresh invites table
      await queryClient.invalidateQueries({
        queryKey: ["invites"],
      })

      toast.success(response.message || "Invite sent successfully")

      setTimeout(() => {
        toast.success("Email sent successfully")
      }, 1200)
    },

    onError(error: any) {
      toast.error(error?.data?.message || "Failed to send invite")
    },
  })
}

import { useMutation } from "@tanstack/react-query"

import { toast } from "sonner"

import { InviteService } from "../services/invites.service"

export function useAcceptInvitation() {
  return useMutation({
    mutationFn:
      InviteService.acceptInvitation,

    onSuccess() {
      toast.success(
        "Account setup completed"
      )

      window.location.href =
        "/login"
    },

    onError() {
      toast.error(
        "Failed to complete setup"
      )
    },
  })
}
import { useMutation } from "@tanstack/react-query"

import { toast } from "sonner"

import { router } from "@/app/router"

import { completeStateAdminProfile } from "../services/profile.service"

export function useCompleteStateAdminProfile() {
  return useMutation({
    mutationFn:
      completeStateAdminProfile,

    onSuccess() {
      toast.success(
        "Profile completed successfully"
      )

      router.navigate("/")
    },
  })
}
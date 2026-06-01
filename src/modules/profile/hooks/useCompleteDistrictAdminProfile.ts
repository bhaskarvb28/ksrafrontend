import { useMutation } from "@tanstack/react-query"

import { toast } from "sonner"

import { router } from "@/app/router"

import { completeDistrictAdminProfile } from "../services/profile.service"

export function useCompleteDistrictAdminProfile() {
  return useMutation({
    mutationFn:
      completeDistrictAdminProfile,

    onSuccess() {
      toast.success(
        "Profile completed successfully"
      )

      router.navigate("/")
    },
  })
}
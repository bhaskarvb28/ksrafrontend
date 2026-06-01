import { useMutation } from "@tanstack/react-query"

import { toast } from "sonner"

import { router } from "@/app/router"

import { completeDistrictCoachProfile } from "../services/profile.service"

export function useCompleteDistrictCoachProfile() {
  return useMutation({
    mutationFn:
      completeDistrictCoachProfile,

    onSuccess() {
      toast.success(
        "Profile completed successfully"
      )

      router.navigate("/")
    },
  })
}

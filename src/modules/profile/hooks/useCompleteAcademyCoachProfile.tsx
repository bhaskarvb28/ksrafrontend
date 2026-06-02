import { useMutation }
from "@tanstack/react-query"

import { toast }
from "sonner"

import { router }
from "@/app/router"

import { queryClient }
from "@/shared/lib/query-client"

import { useAuthStore }
from "@/shared/store/auth.store"

import { completeAcademyCoachProfile }
from "../services/profile.service"

export function useCompleteAcademyCoachProfile() {
  return useMutation({
    mutationFn:
      completeAcademyCoachProfile,

    async onSuccess() {
      toast.success(
        "Profile completed successfully"
      )

      await queryClient.refetchQueries({
        queryKey: [
          "current-user",
        ],
      })

      const profile =
        useAuthStore
          .getState()
          .profile

      if (profile) {
        useAuthStore
          .getState()
          .setProfile({
            ...profile,

            profile_completed:
              true,
          })
      }

      await router.navigate(
        "/dashboard"
      )
    },
  })
}
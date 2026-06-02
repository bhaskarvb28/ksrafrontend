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

import { completePlayerProfile }
from "../services/profile.service"

export function useCompletePlayerProfile() {
  return useMutation({
    mutationFn:
      completePlayerProfile,

    async onSuccess() {
      toast.success(
        "Profile completed successfully"
      )

      // Refetch latest user
      await queryClient.refetchQueries({
        queryKey: [
          "current-user",
        ],
      })

      // Update zustand profile
      const currentProfile =
        useAuthStore
          .getState()
          .profile

      if (currentProfile) {
        useAuthStore
          .getState()
          .setProfile({
            ...currentProfile,

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
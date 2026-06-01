// use-create-academy.ts

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { toast }
from "sonner"

import {
  AcademyService,
} from "../services/academies.service"

export function useCreateAcademy() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      AcademyService.createAcademy,

    async onSuccess(response) {

      // ------------------------------------------------------
      // Refresh Academy Queries
      // ------------------------------------------------------

      await Promise.all([

        queryClient.invalidateQueries({
          queryKey: ["academies"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["district-admin-academies"],
        }),
      ])

      // ------------------------------------------------------
      // Success Toast
      // ------------------------------------------------------

      toast.success(
        response.message ||
        "Academy created successfully",
      )
    },

    onError(error: any) {

      toast.error(
        error?.data?.message ||
        error?.message ||
        "Failed to create academy",
      )
    },
  })
}
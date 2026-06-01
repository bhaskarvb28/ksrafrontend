import { useMutation } from "@tanstack/react-query"

import { toast } from "sonner"

import { login }
from "../services/auth.service"

export function useLogin() {
  return useMutation({
    mutationFn: login,

    onSuccess() {
      toast.success(
        "Logged in successfully"
      )
    },

    onError(error: any) {
      toast.error(
        error?.data?.message ??
          "Invalid credentials"
      )
    },
  })
}
import { api } from "@/shared/lib/api"

import type {
  LoginPayload,
  LoginResponse,
} from "../types/auth.types"

export async function login(
  payload: LoginPayload
) {
  return api<LoginResponse>(
    "/auth/login",
    {
      method: "POST",

      body: JSON.stringify(payload),
    }
  )
}
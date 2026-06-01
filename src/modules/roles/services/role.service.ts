import { api } from "@/shared/lib/api"

import type {
  RolesResponse,
} from "../types/role.types"

export async function getRoles(): Promise<RolesResponse> {
  return api<RolesResponse>(
    "/roles/invitable",
    {
      method: "GET",
    },
  )
}
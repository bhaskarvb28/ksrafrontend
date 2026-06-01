import { api } from "@/shared/lib/api"

import type { CurrentUserResponse }
from "../types/current-user.types"

export async function getCurrentUser() {
  return api<CurrentUserResponse>(
    "/me/profile"
  )
}
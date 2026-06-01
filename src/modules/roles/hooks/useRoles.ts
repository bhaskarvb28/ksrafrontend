import { useQuery } from "@tanstack/react-query"

import { getRoles } from "../services/role.service"

import type {
  Role,
} from "../types/role.types"

export function useRoles() {
  return useQuery<Role[]>({
    queryKey: ["roles"],

    queryFn: async () => {
      const response =
        await getRoles()

      return response.data.roles
    },
  })
}
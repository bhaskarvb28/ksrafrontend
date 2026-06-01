import { useQuery } from "@tanstack/react-query"

import { InviteService } from "../services/invites.service"

export function useInvite(
  token: string | null
) {
  return useQuery({
    queryKey: [
      "token",
      token,
    ],

    queryFn: () =>
      InviteService.getInvite(
        token!
      ),

    enabled: !!token,
  })
}
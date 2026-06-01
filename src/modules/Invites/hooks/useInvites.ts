import { useQuery } from "@tanstack/react-query"

import { InviteService } from "../services/invites.service"

import type {
  InviteQueryParams,
} from "../types/invite-query.types"

export function useInvites(
  params: InviteQueryParams
) {
  return useQuery({
    queryKey: [
      "invites",
      params,
    ],

    queryFn: () =>
      InviteService.getInvites(
        params
      ),
  })
}
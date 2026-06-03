import { useQuery }
from "@tanstack/react-query"

import {
  getAcademyCoaches,
} from "../services/academyCoach.service"

import type {
  GetAcademyCoachesParams,
} from "../types/academyCoach.types"

export function useAcademyCoaches(
  params: GetAcademyCoachesParams
) {

  return useQuery({
    queryKey: [
      "academy-coaches",
      params,
    ],

    queryFn: () =>
      getAcademyCoaches(params),

    staleTime:
      1000 * 60,
  })
}
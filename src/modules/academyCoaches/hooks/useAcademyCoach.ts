import { useQuery }
from "@tanstack/react-query"

import {
  getAcademyCoach,
} from "../services/academyCoach.service"

export function useAcademyCoach(
  coachID?: string
) {

  return useQuery({
    queryKey: [
      "academy-coach",
      coachID,
    ],

    queryFn: () =>
      getAcademyCoach(
        coachID!
      ),

    enabled: !!coachID,

    staleTime:
      1000 * 60,
  })
}
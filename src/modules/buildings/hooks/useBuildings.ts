import { useQuery }
from "@tanstack/react-query"

import {
  BuildingService,
} from "../services/building.service"

export function useBuildings() {

  return useQuery({
    queryKey: [
      "academy-buildings",
    ],

    queryFn: () =>
      BuildingService.getBuildings(),

    staleTime:
      1000 * 60,
  })
}
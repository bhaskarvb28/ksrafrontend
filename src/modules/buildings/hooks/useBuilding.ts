import { useQuery }
from "@tanstack/react-query"

import {
  BuildingService,
} from "../services/building.service"

export function useBuilding(
  buildingID?: string
) {

  return useQuery({
    queryKey: [
      "academy-building",
      buildingID,
    ],

    queryFn: () =>
      BuildingService.getBuilding(
        buildingID!
      ),

    enabled:
      !!buildingID,

    staleTime:
      1000 * 60,
  })
}
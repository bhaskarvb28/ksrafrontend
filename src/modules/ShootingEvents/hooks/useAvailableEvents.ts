import {
  useQuery,
} from "@tanstack/react-query"

import {
  EventService,
} from "../service/event.service"

import type {
  Event,
} from "../types/event.types"

export function useAvailableEvents(
  buildingID?: string,
) {

  return useQuery<Event[]>({
    queryKey: [
      "available-events",
      buildingID,
    ],

    enabled:
      !!buildingID,

    queryFn: async () => {

      const response =
        await EventService
          .getAvailableEvents(
            buildingID!,
          )

      return response.data
    },
  })
}
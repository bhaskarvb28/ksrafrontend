import { api }
from "@/shared/lib/api"

import type {
  Event,
} from "../types/event.types"

type AvailableEventsResponse = {
  success: boolean

  message: string

  data: Event[]
}

export class EventService {

  static async getAvailableEvents(
    buildingID: string,
  ) {

    return api<
      AvailableEventsResponse
    >(
      `/academies/buildings/${buildingID}/available-events`,
    )
  }
}
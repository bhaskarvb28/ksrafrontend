import { api }
from "@/shared/lib/api"

import type {
  Building,
  BuildingProfileResponse,
  CreateBuildingPayload,
  UpdateBuildingPayload,
} from "../types/building.types"

export async function getBuildings() {
  return api<{
    success: boolean

    message: string

    data: Building[]
  }>(
    "/academies/buildings"
  )
}

export async function getBuilding(
  buildingID: string
) {
  return api<{
    success: boolean

    message: string

    data: BuildingProfileResponse
  }>(
    `/academies/buildings/${buildingID}`
  )
}

export async function createBuilding(
  payload:
    CreateBuildingPayload
) {
  return api(
    "/academies/buildings",
    {
      method: "POST",

      body: JSON.stringify(
        payload
      ),
    }
  )
}

export async function updateBuilding(
  buildingID: string,
  payload:
    UpdateBuildingPayload
) {
  return api(
    `/academies/buildings/${buildingID}`,
    {
      method: "PATCH",

      body: JSON.stringify(
        payload
      ),
    }
  )
}

export async function addDiscipline(
  buildingID: string,
  payload: {
    discipline_id: number
  },
) {
  return api(
    `/academies/buildings/${buildingID}/disciplines`,
    {
      method: "POST",

      body: JSON.stringify(
        payload,
      ),
    },
  )
}

export async function removeDiscipline(
  buildingID: string,
  disciplineID: number,
) {
  return api(
    `/academies/buildings/${buildingID}/disciplines/${disciplineID}`,
    {
      method: "DELETE",
    },
  )
}

export async function createLane(
  buildingID: string,
  payload: {
    lane_name: string
  },
) {
  return api(
    `/academies/buildings/${buildingID}/lanes`,
    {
      method: "POST",

      body: JSON.stringify(
        payload,
      ),
    },
  )
}

export async function updateLane(
  laneID: number,
  payload: {
    lane_name?: string

    is_under_maintenance?: boolean
  },
) {
  return api(
    `/academies/buildings/lanes/${laneID}`,
    {
      method: "PATCH",

      body: JSON.stringify(
        payload,
      ),
    },
  )
}

export async function deleteLane(
  laneID: number,
) {
  return api(
    `/academies/buildings/lanes/${laneID}`,
    {
      method: "DELETE",
    },
  )
}

export async function addEvent(
  buildingID: string,
  payload: {
    shooting_event_id: number
  },
) {
  return api(
    `/academies/buildings/${buildingID}/events`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  )
}

export async function removeEvent(
  buildingID: string,
  eventID: number,
) {
  return api(
    `/academies/buildings/${buildingID}/events/${eventID}`,
    {
      method: "DELETE",
    },
  )
}

export async function deleteBuilding(
  buildingID: string,
) {
  return api(
    `/academies/buildings/${buildingID}`,
    {
      method: "DELETE",
    },
  )
}
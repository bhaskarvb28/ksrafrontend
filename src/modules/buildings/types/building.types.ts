export type BuildingDiscipline = {
  id: number

  code: string

  display_name: string
}

export type BuildingEvent = {
  id: number

  code: string

  display_name: string
}

export type BuildingLane = {
  id: number

  academy_building_id: number

  lane_name: string

  is_under_maintenance: boolean
}

export type Building = {
  id: number

  academy_id: string

  building_name: string

  is_active: boolean

  disciplines: BuildingDiscipline[]

  events: BuildingEvent[]
}

export type BuildingProfileResponse = {
  id: number

  academy_id: string

  building_name: string

  is_active: boolean

  disciplines: BuildingDiscipline[]

  events: BuildingEvent[]

  lanes: BuildingLane[]
}

export type CreateBuildingPayload = {
  building_name: string
}

export type UpdateBuildingPayload = {
  building_name?: string

  is_active?: boolean
}
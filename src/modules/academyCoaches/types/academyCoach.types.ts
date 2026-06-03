export type DisciplineSummary = {
  id: number

  code: string

  display_name: string
}

export type AcademyCoachListItem = {
  user_id: string

  full_name: string

  coach_code: string

  disciplines: DisciplineSummary[]

  assigned_players_count: number
}

export type PaginatedAcademyCoachesResponse = {
  items: AcademyCoachListItem[]

  page: number

  limit: number

  total: number

  total_pages: number

  has_next: boolean

  has_previous: boolean
}

export type AcademyCoachProfile = {
  user_id: string

  first_name: string

  last_name: string

  full_name: string

  email: string

  coach_code: string

  joined_at: string

  disciplines: DisciplineSummary[]

  assigned_players_count: number
}

export type GetAcademyCoachesParams = {
  page?: number

  limit?: number

  search?: string
}

export type AssignCoachPayload = {
  coach_user_id: string
}
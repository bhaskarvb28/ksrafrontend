export type Discipline = {
  id: number

  code: string

  display_name: string

  is_primary?: boolean
}

export type CoachSummary = {
  user_id: string

  full_name: string

  coach_code?: string
}

export type PlayerListItem = {
  id: string

  first_name: string

  last_name: string

  email: string

  gender: string

  status: string

  joined_at: string

  profile_completed: boolean

  primary_discipline?: Discipline

  current_coach?: CoachSummary
}


export type PaginatedPlayersResponse = {
  items: PlayerListItem[]

  page: number

  limit: number

  total: number

  total_pages: number

  has_next: boolean

  has_previous: boolean
}

export type AcademySummary = {
  id: string

  name: string

  address: string

  pincode_id: number

  pincode: string

  district: string

  state: string
}

export type PlayerProfileResponse = {
  profile_completed: boolean

  dpdp_consent: boolean

  status: string

  joined_at: string

  academy: AcademySummary

  current_coach: CoachSummary | null

  personal_info: any

  sports_profile: any

  disciplines: Discipline[]

  passport: any

  guardians: any[]
}
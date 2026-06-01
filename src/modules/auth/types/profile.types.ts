export interface BaseProfile {
  profile_completed: boolean

  dpdp_consent?: boolean
}

export interface DistrictAdminProfile
  extends BaseProfile {
  district_id: number

  district_name: string

  state_id: number

  state_name: string
}

export interface Discipline {
  id: number

  code: string

  display_name: string
}

export interface AcademyAdminProfile
  extends BaseProfile {
  academy_id: string

  academy_name: string

  academy_address: string

  district_id: number

  district_name: string

  state_id: number

  state_name: string
}

export interface AcademyCoachProfile
  extends BaseProfile {
  coach_code: string

  coaching_certificate_proof: string

  academy_id: string

  academy_name: string

  academy_address: string

  district_id: number

  district_name: string

  state_id: number

  state_name: string

  disciplines: Discipline[]
}
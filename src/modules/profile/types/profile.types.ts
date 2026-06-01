export interface CompleteStateAdminProfilePayload {
  dpdp_consent: boolean
}

export interface CompleteDistrictAdminProfilePayload {
  dpdp_consent: boolean
  coach_code: string
  coaching_certificate_proof: string
  discipline_ids: number[]
}

export interface CompleteDistrictCoachProfilePayload {
  dpdp_consent: boolean
  coach_code: string
  coaching_certificate_proof: string
  discipline_ids: number[]
}
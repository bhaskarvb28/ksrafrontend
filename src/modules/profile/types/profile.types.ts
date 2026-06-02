export interface CompleteStateAdminProfilePayload {
  dpdp_consent: boolean
}

export interface CompleteDistrictAdminProfilePayload {
  dpdp_consent: boolean
}

export interface CompleteDistrictCoachProfilePayload {
  dpdp_consent: boolean

  coach_code: string

  coaching_certificate_proof: string

  discipline_ids: number[]
}

export interface CompleteAcademyAdminProfilePayload {
  dpdp_consent: boolean

  gstin: string

  registration_proof: string
}

export interface CompleteAcademyCoachProfilePayload {
  dpdp_consent: boolean

  coach_code: string

  coaching_certificate_proof: string

  discipline_ids: number[]
}

export interface CompletePlayerProfilePayload {
  dpdp_consent: boolean

  personal_info: {
    date_of_birth: string

    gender:
      | "male"
      | "female"
      | "other"

    nationality: string

    place_of_birth?: string

    city?: string

    residential_address?: string

    pincode_id: number

    education?: string

    institution_name?: string

    occupation?: string

    temporary_sport_id?: string
  }

  sports_profile: {
    unit_of_representation?: string

    dominant_hand:
      | "left"
      | "right"
      | "ambidextrous"

    height_cm?: number

    weight_kg?: number

    shoe_size?: string

    tracksuit_size?: string
  }

  disciplines: {
    discipline_id: number

    is_primary: boolean
  }[]

  passport: {
    passport_number?: string

    passport_issue_date?: string

    passport_expiry_date?: string

    passport_issuing_authority?: string

    passport_place_of_issue?: string
  }

  guardians: {
    full_name: string

    relationship?: string

    contact_number: string

    alternative_contact?: string

    parental_consent: boolean

    is_primary: boolean
  }[]
}
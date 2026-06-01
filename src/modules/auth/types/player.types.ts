import type { BaseProfile } from "./profile.types"

export interface PlayerProfile
  extends BaseProfile {
  status: string

  joined_at: string

  academy: {
    id: string

    name: string

    address: string

    district: string

    state: string
  }

  personal_info: {
    date_of_birth: string

    gender: string

    nationality: string

    city: string

    temporary_sport_id: string
  }

  sports_profile: {
    dominant_hand: string

    height_cm: number

    weight_kg: number
  }
}
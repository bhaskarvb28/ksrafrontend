import type { User } from "./auth.types"

import type {
  DistrictAdminProfile,
  AcademyAdminProfile,
  AcademyCoachProfile,
} from "./profile.types"

import type { PlayerProfile } from "./player.types"

export type Profile =
  | DistrictAdminProfile
  | AcademyAdminProfile
  | AcademyCoachProfile
  | PlayerProfile

export interface CurrentUserResponse {
  success: boolean

  message: string

  data: {
    user: User

    profile: Profile
  }
}
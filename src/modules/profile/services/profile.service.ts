import { api } from "@/shared/lib/api"

import type {
  CompleteStateAdminProfilePayload,
  CompleteDistrictAdminProfilePayload,
} from "../types/profile.types"

export async function completeStateAdminProfile(
  payload: CompleteStateAdminProfilePayload
) {
  return api("/me/profile", {
    method: "PATCH",

    body: JSON.stringify(payload),
  })
}

export async function completeDistrictAdminProfile(
  payload: CompleteDistrictAdminProfilePayload
) {
  return api("/me/profile", {
    method: "PATCH",

    body: JSON.stringify(payload),
  })
}

export async function completeDistrictCoachProfile(
  payload: CompleteDistrictCoachProfilePayload
) {
  return api("/me/profile", {
    method: "PATCH",

    body: JSON.stringify(payload),
  })
}
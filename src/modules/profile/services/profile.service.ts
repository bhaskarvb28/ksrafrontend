import { api } from "@/shared/lib/api"

import type {
  CompleteStateAdminProfilePayload,
  CompleteDistrictAdminProfilePayload,
  CompleteDistrictCoachProfilePayload,
  CompleteAcademyAdminProfilePayload,
  CompleteAcademyCoachProfilePayload,
  CompletePlayerProfilePayload,
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

export async function completeAcademyAdminProfile(
  payload: CompleteAcademyAdminProfilePayload
) {
  return api("/me/profile", {
    method: "PATCH",

    body: JSON.stringify(payload),
  })
}

export async function completeAcademyCoachProfile(
  payload: CompleteAcademyCoachProfilePayload
) {
  return api("/me/profile", {
    method: "PATCH",

    body: JSON.stringify(payload),
  })
}

export async function completePlayerProfile(
  payload: CompletePlayerProfilePayload
) {
  return api("/me/profile", {
    method: "PATCH",

    body: JSON.stringify(payload),
  })
}
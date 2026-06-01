// academies.service.ts

import { api }
from "@/shared/lib/api"

import type {
  AcademiesResponse,
  Academy,
} from "../types/academies.types"

import type {
  AcademyQueryParams,
} from "../types/academy-query.types"

export interface CreateAcademyPayload {
  name: string

  address: string
}

export interface CreateAcademyResponse {
  success: boolean

  message: string

  data: Academy
}

export class AcademyService {

  // ----------------------------------------------------------
  // Get All Academies
  // ----------------------------------------------------------

  static async getAcademies(
    params: AcademyQueryParams = {},
  ) {

    const searchParams =
      new URLSearchParams()

    Object.entries(params).forEach(
      ([key, value]) => {

        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {

          searchParams.set(
            key,
            String(value),
          )
        }
      },
    )

    const query =
      searchParams.toString()

    return api<AcademiesResponse>(
      query
        ? `/academies?${query}`
        : "/academies",
    )
  }

  // ----------------------------------------------------------
  // Get District Admin Academies
  // ----------------------------------------------------------

  static async getDistrictAdminAcademy(
    params: AcademyQueryParams = {},
  ) {

    const searchParams =
      new URLSearchParams()

    Object.entries(params).forEach(
      ([key, value]) => {

        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {

          searchParams.set(
            key,
            String(value),
          )
        }
      },
    )

    const query =
      searchParams.toString()

    return api<AcademiesResponse>(
      query
        ? `/academies/my-district?${query}`
        : "/academies/my-district",
    )
  }

  // ----------------------------------------------------------
  // Create Academy
  // ----------------------------------------------------------

  static async createAcademy(
    payload: CreateAcademyPayload,
  ) {

    return api<CreateAcademyResponse>(
      "/academies",
      {
        method: "POST",

        body: JSON.stringify(
          payload,
        ),
      },
    )
  }
}
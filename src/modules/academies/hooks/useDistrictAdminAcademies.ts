// useDistrictAdminAcademies.ts

import { useQuery }
from "@tanstack/react-query"

import { AcademyService }
from "../services/academies.service"

import type {
  AcademyQueryParams,
} from "../types/academy-query.types"

interface Props
  extends AcademyQueryParams {

  enabled?: boolean
}

export function useDistrictAdminAcademy({
  enabled = true,
  ...params
}: Props) {

  return useQuery({

    enabled,

    queryKey: [
      "district-admin-academies",

      params.page,

      params.limit,

      params.search,

      params.sort_by,

      params.order_by,
    ],

    queryFn: () =>
      AcademyService.getDistrictAdminAcademy(
        params,
      ),
  })
}
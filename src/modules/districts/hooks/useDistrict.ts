import { useQuery } from "@tanstack/react-query"

import { getDistricts } from "../services/district.service"

interface Props {
  stateID?: number

  enabled?: boolean
}

export function useDistricts({
  stateID,
  enabled = true,
}: Props = {}) {
  return useQuery({
    queryKey: ["districts", stateID],

    queryFn: () => getDistricts(stateID!),

    enabled: enabled && !!stateID,
  })
}
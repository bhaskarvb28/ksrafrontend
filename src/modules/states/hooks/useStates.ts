import { useQuery } from "@tanstack/react-query"

import { getStates } from "../services/state.service"

import type {
  State,
} from "../types/states.types"

interface Props {
  enabled?: boolean
}

export function useStates({
  enabled = true,
}: Props = {}) {
  return useQuery<State[]>({
    queryKey: ["states"],

    queryFn: async () => {
      const response =
        await getStates()

      return response.data
    },

    enabled,
  })
}
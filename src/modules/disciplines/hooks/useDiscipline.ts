// use-disciplines.ts

import { useQuery } from "@tanstack/react-query"

import { getDisciplines } from "../services/discipline.service"

import type {
  Discipline,
} from "../types/discipline.types"

export function useDisciplines() {
  return useQuery<Discipline[]>({
    queryKey: ["disciplines"],

    queryFn: async () => {
      const response =
        await getDisciplines()

      return response.data
    },
  })
}
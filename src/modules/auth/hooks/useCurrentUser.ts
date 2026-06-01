import { useEffect } from "react"

import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "../services/profile.service"

import { useAuthStore } from "@/shared/store/auth.store"

export function useCurrentUser() {
  const token = useAuthStore(
    (state) => state.token
  )

  const setSession =
    useAuthStore(
      (state) => state.setSession
    )

  const query = useQuery({
    queryKey: ["current-user"],

    queryFn: getCurrentUser,

    enabled: !!token,

    retry: false,
  })

  // ----------------------------------------------------------
  // Sync User + Profile To Zustand
  // ----------------------------------------------------------

  useEffect(() => {
    if (!query.data?.data) return

    const { user, profile } =
      query.data.data

    setSession(
      token!,
      user,
      profile
    )
  }, [
    query.data,
    setSession,
    token,
  ])

  return query
}
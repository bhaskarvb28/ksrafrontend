import { create } from "zustand"

import { persist } from "zustand/middleware"

import type { User }
from "@/modules/auth/types/auth.types"

import type { Profile }
from "@/modules/auth/types/current-user.types"

type AuthState = {
  token: string | null

  user: User | null

  profile: Profile | null

  setSession: (
    token: string,
    user: User,
    profile?: Profile | null
  ) => void

  setProfile: (
    profile: Profile | null
  ) => void

  clearSession: () => void
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        token: null,

        user: null,

        profile: null,

        setSession: (
          token,
          user,
          profile = null
        ) =>
          set({
            token,
            user,
            profile,
          }),

        setProfile: (
          profile
        ) =>
          set({
            profile,
          }),

        clearSession: () =>
          set({
            token: null,
            user: null,
            profile: null,
          }),
      }),

      {
        name: "auth-storage",
      }
    )
  )
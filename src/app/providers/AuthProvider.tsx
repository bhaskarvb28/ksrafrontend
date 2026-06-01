import { useEffect } from "react"

import { toast } from "sonner"

import { router } from "../router"

import { useAuthStore } from "@/shared/store/auth.store"

import { useCurrentUser } from "@/modules/auth/hooks/useCurrentUser"

import { ROLE_CODES } from "@/modules/auth/types/role.types"

const PROFILE_COMPLETION_ROUTES = {
  [ROLE_CODES.PLAYER]: "/complete/player-profile",

  [ROLE_CODES.ACADEMY_COACH]: "/complete/coach-profile",

  [ROLE_CODES.ACADEMY_ADMIN]: "/complete/admin-profile",

  [ROLE_CODES.DISTRICT_COACH]: "/complete/coach-profile",

  [ROLE_CODES.DISTRICT_ADMIN]: "/complete/admin-profile",

  [ROLE_CODES.STATE_ADMIN]: "/complete/admin-profile",
} as const

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const token = useAuthStore((state) => state.token)

  const clearSession = useAuthStore((state) => state.clearSession)

  const { data, error, isSuccess } = useCurrentUser()

  // ----------------------------------------------------------
  // Session Expired
  // ----------------------------------------------------------

  useEffect(() => {
    if (!token) return

    if (!error) return

    clearSession()

    toast.error("Session expired. Please login again.")

    router.navigate("/login")
  }, [token, error, clearSession])

  // ----------------------------------------------------------
  // Profile Completion Guard
  // ----------------------------------------------------------

  useEffect(() => {
    if (!token) return

    if (!isSuccess) return

    if (!data?.data) return

    const currentUser = data.data.user

    const profile = data.data.profile

    const completionRoute =
      PROFILE_COMPLETION_ROUTES[
        currentUser.role.code as keyof typeof PROFILE_COMPLETION_ROUTES
      ]

    const isCompletionRoute = location.pathname.startsWith("/complete")

    // ------------------------------------------------------
    // Force Profile Completion
    // ------------------------------------------------------

    if (!profile.profile_completed && completionRoute && !isCompletionRoute) {
      toast.info("Please complete your profile")

      router.navigate(completionRoute)

      return
    }

    // ------------------------------------------------------
    // Prevent Access To Completion Pages
    // ------------------------------------------------------

    if (profile.profile_completed && isCompletionRoute) {
      router.navigate("/dashboard")

      return
    }

    // ------------------------------------------------------
    // Prevent Logged-in Users From Visiting Login
    // ------------------------------------------------------

    if (location.pathname === "/login") {
      router.navigate("/dashboard")

      return
    }
  }, [token, data, isSuccess])

  return children
}

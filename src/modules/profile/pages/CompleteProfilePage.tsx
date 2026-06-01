import { useAuthStore } from "@/shared/store/auth.store"
import { ROLE_CODES } from "@/modules/auth/types/role.types"

import { StateAdminProfileForm } from "../components/StateAdminProfileForm"
import { DistrictAdminProfileForm } from "../components/DistrictAdminProfileForm"
import { DistrictCoachProfileForm } from "../components/DistrictCoachProfileForm"

export function CompleteProfilePage() {
  const role = useAuthStore((state) => state.user?.role)

  const isStateAdmin = role?.code === ROLE_CODES.STATE_ADMIN
  const isDistrictAdmin = role?.code === ROLE_CODES.DISTRICT_ADMIN
  const isDistrictCoach = role?.code === ROLE_CODES.DISTRICT_COACH

  let title = "onboarding"
  if (isStateAdmin) {
    title = "state administrator"
  } else if (isDistrictAdmin) {
    title = "district administrator"
  } else if (isDistrictCoach) {
    title = "district coach"
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Complete your profile</h1>

          <p className="text-muted-foreground">
            Finish setting up your {title} profile to continue.
          </p>
        </div>

        {isStateAdmin && <StateAdminProfileForm />}
        {isDistrictAdmin && <DistrictAdminProfileForm />}
        {isDistrictCoach && <DistrictCoachProfileForm />}
      </div>
    </div>
  )
}

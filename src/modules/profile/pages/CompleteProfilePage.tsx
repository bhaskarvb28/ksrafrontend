import { useAuthStore } from "@/shared/store/auth.store"

import { ROLE_CODES } from "@/modules/auth/types/role.types"

import { StateAdminProfileForm } from "../components/StateAdminProfileForm"

import { DistrictAdminProfileForm } from "../components/DistrictAdminProfileForm"

import { DistrictCoachProfileForm } from "../components/DistrictCoachProfileForm"

import { AcademyAdminProfileForm } from "../components/AcademyAdminProfileForm"

import { AcademyCoachProfileForm } from "../components/AcademyCoachProfileForm"

import { PlayerProfileForm } from "../components/PlayerProfileForm"

export function CompleteProfilePage() {
  const role = useAuthStore((state) => state.user?.role)

  const isStateAdmin = role?.code === ROLE_CODES.STATE_ADMIN

  const isDistrictAdmin = role?.code === ROLE_CODES.DISTRICT_ADMIN

  const isDistrictCoach = role?.code === ROLE_CODES.DISTRICT_COACH

  const isAcademyAdmin = role?.code === ROLE_CODES.ACADEMY_ADMIN

  const isAcademyCoach = role?.code === ROLE_CODES.ACADEMY_COACH

  const isPlayer = role?.code === ROLE_CODES.PLAYER

  let title = "onboarding"

  if (isStateAdmin) {
    title = "state administrator"
  } else if (isDistrictAdmin) {
    title = "district administrator"
  } else if (isDistrictCoach) {
    title = "district coach"
  } else if (isAcademyAdmin) {
    title = "academy administrator"
  } else if (isAcademyCoach) {
    title = "academy coach"
  } else if (isPlayer) {
    title = "player"
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

        {isAcademyAdmin && <AcademyAdminProfileForm />}

        {isAcademyCoach && <AcademyCoachProfileForm />}

        {isPlayer && <PlayerProfileForm />}
      </div>
    </div>
  )
}

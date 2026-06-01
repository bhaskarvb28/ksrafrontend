import { useAuthStore } from "@/shared/store/auth.store"
import { ROLE_CODES } from "@/modules/auth/types/role.types"

import { StateAdminProfileForm } from "../components/StateAdminProfileForm"

import { DistrictAdminProfileForm } from "../components/DistrictAdminProfileForm"

export function CompleteProfilePage() {
  const role = useAuthStore((state) => state.user?.role)

  const isStateAdmin = role?.code === ROLE_CODES.STATE_ADMIN

  const title = isStateAdmin ? "state administrator" : "district administrator"

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Complete your profile</h1>

          <p className="text-muted-foreground">
            Finish setting up your {title} profile to continue.
          </p>
        </div>

        {isStateAdmin ? (
          <StateAdminProfileForm />
        ) : (
          <DistrictAdminProfileForm />
        )}
      </div>
    </div>
  )
}

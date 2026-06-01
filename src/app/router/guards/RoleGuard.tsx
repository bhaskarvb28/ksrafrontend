// role-guard.tsx

import { Navigate, Outlet }
from "react-router-dom"

import { useAuthStore }
from "@/shared/store/auth.store"

import type { RoleCode }
from "@/modules/auth/types/role.types"

interface Props {
  allowedRoles: RoleCode[]
}

export default function RoleGuard({
  allowedRoles,
}: Props) {
  const user =
    useAuthStore((state) => state.user)

  const role =
    user?.role.code

  if (
    !role ||
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  return <Outlet />
}
import {
  Navigate,
  Outlet,
} from "react-router-dom"

import { useAuthStore }
from "@/shared/store/auth.store"

export default function GuestGuard() {
  const token =
    useAuthStore(
      (state) => state.token
    )

  if (token) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  return <Outlet />
}
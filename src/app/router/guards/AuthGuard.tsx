import {
  Navigate,
  Outlet,
} from "react-router-dom"

import { useAuthStore }
from "@/shared/store/auth.store"

export default function AuthGuard() {
  const token =
    useAuthStore(
      (state) => state.token
    )

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return <Outlet />
}
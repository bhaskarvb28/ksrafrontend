import AppLayout from "@/app/layouts/AppLayout"

import AuthGuard from "../guards/AuthGuard"

import DashboardPage from "@/modules/dashboard/pages/Dashboard"

import InvitesPage from "@/modules/Invites/pages/Invites"

import { CompleteProfilePage } from "@/modules/profile/pages/CompleteProfilePage"

export const protectedRoutes = [
  {
    element: <AuthGuard />,

    children: [
      // ------------------------------------------------------
      // Profile Completion Routes
      // ------------------------------------------------------

      {
        path: "/complete/admin-profile",

        element: <CompleteProfilePage />,
      },

      // ------------------------------------------------------
      // Main App Routes
      // ------------------------------------------------------

      {
        element: <AppLayout />,

        children: [
          {
            path: "/dashboard",

            element: <DashboardPage />,
          },

          {
            path: "/invites",

            element: <InvitesPage />,
          },
        ],
      },
    ],
  },
]

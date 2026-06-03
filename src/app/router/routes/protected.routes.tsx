/* eslint-disable react-refresh/only-export-components */

import AppLayout from "@/app/layouts/AppLayout"

import AuthGuard from "../guards/AuthGuard"

import RoleGuard from "../guards/RoleGuard"

import DashboardPage from "@/modules/dashboard/pages/Dashboard"

import InvitesPage from "@/modules/Invites/pages/Invites"

import { CompleteProfilePage } from "@/modules/profile/pages/CompleteProfilePage"

import { ROLE_CODES } from "@/modules/auth/types/role.types"
import AcademiesPage from "@/modules/academies/pages/AcademiesPage"
import { PlayersPage } from "@/modules/players/pages/PlayersPage"

import { PlayerProfilePage } from "@/modules/players/pages/PlayerProfilePage"

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

      {
        path: "/complete/coach-profile",

        element: <CompleteProfilePage />,
      },

      {
        path: "/complete/player-profile",

        element: <CompleteProfilePage />,
      },

      // ------------------------------------------------------
      // Main App Routes
      // ------------------------------------------------------

      {
        element: <AppLayout />,

        children: [
          // ------------------------------------------------
          // Dashboard
          // ------------------------------------------------

          {
            path: "/dashboard",

            element: <DashboardPage />,
          },

          // ------------------------------------------------
          // Invites
          // ------------------------------------------------

          {
            element: (
              <RoleGuard
                allowedRoles={[
                  ROLE_CODES.SUPER_ADMIN,
                  ROLE_CODES.STATE_ADMIN,
                  ROLE_CODES.DISTRICT_ADMIN,
                  ROLE_CODES.ACADEMY_ADMIN,
                ]}
              />
            ),

            children: [
              {
                path: "/invites",

                element: <InvitesPage />,
              },
            ],
          },

          // ------------------------------------------------
          // Academies
          // ------------------------------------------------

          {
            element: <RoleGuard allowedRoles={[ROLE_CODES.DISTRICT_ADMIN]} />,

            children: [
              {
                path: "/academies",
                element: <AcademiesPage />,
              },
            ],
          },

          // ------------------------------------------------
          // Players
          // ------------------------------------------------

          {
            element: <RoleGuard allowedRoles={[ROLE_CODES.ACADEMY_ADMIN]} />,

            children: [
              {
                path: "/players",
                element: <PlayersPage />,
              },

              {
                path: "/players/:playerID",
                element: <PlayerProfilePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]

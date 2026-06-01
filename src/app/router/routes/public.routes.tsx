/* eslint-disable react-refresh/only-export-components */

import AuthLayout from "@/app/layouts/AuthLayout"

import GuestGuard from "../guards/GuestGuard"

import LoginPage from "@/modules/auth/pages/LoginPage"

import { AcceptInvitationPage } from "@/modules/Invites/pages/AcceptInvitationPage"

export const publicRoutes = [
  {
    element: <GuestGuard />,

    children: [
      // ------------------------------------------------
      // Auth Routes
      // ------------------------------------------------

      {
        element: <AuthLayout />,

        children: [
          {
            path: "/login",

            element: <LoginPage />,
          },
        ],
      },

      // ------------------------------------------------
      // Invitation Routes
      // ------------------------------------------------

      {
        path:
          "/accept-invitation",

        element:
          <AcceptInvitationPage />,
      },
    ],
  },
]
// sidebar-routes.ts

import {
  DashboardSquare01Icon,
  GlobalEducationIcon,
  SentIcon,
} from "@hugeicons/core-free-icons"

import type { RoleCode }
from "@/modules/auth/types/role.types"

import { ROLE_CODES }
from "@/modules/auth/types/role.types"

type SidebarItem = {
  title: string

  path: string

  icon: any

  allowedRoles: RoleCode[]
}

type SidebarGroupType = {
  title: string

  items: SidebarItem[]
}

export const sidebarRoutes:
  SidebarGroupType[] = [
  {
    title: "Workspace",

    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: DashboardSquare01Icon,

        allowedRoles: [
          ROLE_CODES.SUPER_ADMIN,
          ROLE_CODES.STATE_ADMIN,
          ROLE_CODES.DISTRICT_ADMIN,
          ROLE_CODES.DISTRICT_COACH,
          ROLE_CODES.ACADEMY_ADMIN,
          ROLE_CODES.ACADEMY_COACH,
          ROLE_CODES.PLAYER,
        ],
      },

      {
        title: "Invites",
        path: "/invites",
        icon: SentIcon,

        allowedRoles: [
          ROLE_CODES.SUPER_ADMIN,
          ROLE_CODES.STATE_ADMIN,
          ROLE_CODES.DISTRICT_ADMIN,
        ],
      },

      {
        title: "Academies",
        path: "/academies",
        icon: GlobalEducationIcon,

        allowedRoles: [
          ROLE_CODES.SUPER_ADMIN,
          ROLE_CODES.STATE_ADMIN,
          ROLE_CODES.DISTRICT_ADMIN,
        ],
      },
    ],
  },
]
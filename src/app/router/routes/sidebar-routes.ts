import {
  DashboardSquare01Icon,
  // ChartHistogramIcon,
  // Folder01Icon,
  // UserGroupIcon,
  // Settings05Icon,
  SentIcon
} from "@hugeicons/core-free-icons"

export const sidebarRoutes = [
  {
    title: "Workspace",

    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: DashboardSquare01Icon,
      },

      {
        title: "Invites",
        path: "/invites",
        icon: SentIcon,
      },

      // {
      //   title: "Analytics",
      //   path: "/analytics",
      //   icon: ChartHistogramIcon,
      // },

      // {
      //   title: "Projects",
      //   path: "/projects",
      //   icon: Folder01Icon,
      // },
    ],
  },

  // {
  //   title: "Management",

  //   items: [
  //     {
  //       title: "Team",
  //       path: "/team",
  //       icon: UserGroupIcon,
  //     },

  //     {
  //       title: "Settings",
  //       path: "/settings",
  //       icon: Settings05Icon,
  //     },
  //   ],
  // },
]
// app-sidebar.tsx

import * as React from "react"

import { NavLink } from "react-router-dom"

import { NavMain } from "@/app/layouts/components/nav-main"

import { NavUser } from "@/app/layouts/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

import { HugeiconsIcon } from "@hugeicons/react"

import { CommandIcon }
from "@hugeicons/core-free-icons"

import { useAuthStore }
from "@/shared/store/auth.store"

import { sidebarRoutes }
from "@/app/router/routes/sidebar-routes"

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user =
    useAuthStore((state) => state.user)

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <NavLink to="/dashboard">
                <HugeiconsIcon
                  icon={CommandIcon}
                  strokeWidth={2}
                  className="size-5!"
                />

                <span className="text-base font-semibold">
                  KSRA
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={sidebarRoutes}
          role={user.role.code}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
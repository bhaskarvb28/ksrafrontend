import { NavLink, useLocation }
from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

import { HugeiconsIcon }
from "@hugeicons/react"

import type { RoleCode }
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

interface Props {
  items: SidebarGroupType[]

  role: RoleCode
}

export function NavMain({
  items,
  role,
}: Props) {
  const location = useLocation()

  return (
    <>
      {items.map((group) => {
        const filteredItems =
          group.items.filter((item) =>
            item.allowedRoles.includes(role),
          )

        if (filteredItems.length === 0) {
          return null
        }

        return (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {filteredItems.map((item) => {
                  const isActive =
                    location.pathname === item.path

                  return (
                    <SidebarMenuItem
                      key={item.title}
                    >
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className="data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
                      >
                        <NavLink to={item.path}>
                          <HugeiconsIcon
                            icon={item.icon}
                            strokeWidth={2}
                            className="size-5"
                          />

                          <span>
                            {item.title}
                          </span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )
      })}
    </>
  )
}
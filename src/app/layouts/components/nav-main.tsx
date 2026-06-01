import { NavLink, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

import { HugeiconsIcon } from "@hugeicons/react"

type SidebarGroupType = {
  title: string

  items: {
    title: string
    path: string
    icon: any
  }[]
}

export function NavMain({ items }: { items: SidebarGroupType[] }) {
  const location = useLocation()

  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = location.pathname === item.path

                return (
                  <SidebarMenuItem key={item.title}>
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

                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

import { Outlet, useLocation } from "react-router-dom"

import { AppSidebar } from "@/app/layouts/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar"

import { Separator } from "@/shared/components/ui/separator"

function formatPageName(
  pathname: string
) {

  if (
    pathname.startsWith("/players/")
  ) {

    return "Player Profile"
  }

  const segment =
    pathname
      .split("/")
      .filter(Boolean)
      .pop() ?? "dashboard"

  return segment
    .replace(/-/g, " ")
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    )
}

export default function AppLayout() {
  const location = useLocation()

  const pageName = formatPageName(location.pathname)

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-background/80 backdrop-blur-xl">
          <div className="flex w-full items-center justify-between px-6">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />

              <Separator orientation="vertical" className="h-8" />

              <div className="flex flex-col">
                <h1 className="text-sm font-semibold tracking-tight">
                  {pageName}
                </h1>

                <p className="text-xs text-muted-foreground">
                  Manage and monitor {pageName.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

import { RefreshCcw, Building2 } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

import { Card, CardContent } from "@/shared/components/ui/card"

import { useBuildings } from "../hooks/useBuildings"

import { BuildingsGrid } from "../components/BuildingsGrid"

import { EmptyBuildings } from "../components/EmptyBuildings"

import { BuildingsGridSkeleton } from "../components/BuildingsGridSkeleton"

import { CreateBuildingDialog } from "../components/CreateBuildingDialog"

export function BuildingsPage() {
  const { data, isLoading, isError, refetch } = useBuildings()

  const buildings = data?.data ?? []

  const totalBuildings = buildings.length

  const activeBuildings = buildings.filter(
    (building) => building.is_active
  ).length

  const inactiveBuildings = buildings.filter(
    (building) => !building.is_active
  ).length

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader />

        <div className="rounded-2xl border p-10 text-center">
          Failed to load buildings
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader />

        <div className="flex items-center gap-3">
          <CreateBuildingDialog />

          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-xl"
            onClick={() => refetch()}
          >
            <RefreshCcw className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Total Buildings"
          value={totalBuildings}
          icon={<Building2 className="size-5" />}
        />

        <StatsCard
          title="Active Buildings"
          value={activeBuildings}
          icon={<Building2 className="size-5" />}
        />

        <StatsCard
          title="Inactive Buildings"
          value={inactiveBuildings}
          icon={<Building2 className="size-5" />}
        />
      </div>

      {isLoading ? (
        <BuildingsGridSkeleton />
      ) : buildings.length === 0 ? (
        <EmptyBuildings />
      ) : (
        <BuildingsGrid buildings={buildings} />
      )}
    </div>
  )
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Buildings</h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Manage academy buildings, disciplines, events, and lanes
      </p>
    </div>
  )
}

type StatsCardProps = {
  title: string

  value: number

  icon: React.ReactNode
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="rounded-2xl border-border/50">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-1 text-3xl font-semibold">{value}</h3>
        </div>

        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

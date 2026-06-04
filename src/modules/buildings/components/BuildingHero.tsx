import { Building2 } from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"

import type { BuildingProfileResponse } from "../types/building.types"

import { UpdateBuildingDialog } from "./UpdateBuildingDialog"

type Props = {
  building: BuildingProfileResponse

  buildingID: string
}

export function BuildingHero({ building }: Props) {
  return (
    <div className="rounded-2xl border p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Building2 className="size-6 text-primary" />

            <h1 className="text-3xl font-semibold">{building.building_name}</h1>
          </div>

          <p className="text-sm text-muted-foreground">
            Building ID: {building.id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={building.is_active ? "default" : "secondary"}>
            {building.is_active ? "Active" : "Inactive"}
          </Badge>

          <UpdateBuildingDialog building={building} />
        </div>
      </div>
    </div>
  )
}

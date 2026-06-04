import { Link } from "react-router-dom"

import { ArrowRight, Building } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

import { Card, CardContent } from "@/shared/components/ui/card"

import { Badge } from "@/shared/components/ui/badge"

import type { Building as BuildingType } from "../types/building.types"

import { UpdateBuildingDialog } from "./UpdateBuildingDialog"

import { DeleteBuildingDialog } from "./DeleteBuildingDialog"

type Props = {
  building: BuildingType
}

export function BuildingCard({ building }: Props) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">
                {building.building_name}
              </h3>

              <Badge variant={building.is_active ? "default" : "secondary"}>
                {building.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {building.disciplines.slice(0, 3).map((discipline) => (
                <Badge key={discipline.id} variant="secondary">
                  {discipline.display_name}
                </Badge>
              ))}

              {building.disciplines.length > 3 && (
                <Badge variant="outline">
                  +{building.disciplines.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <Building className="size-5 text-muted-foreground" />
        </div>

        <div className="mt-5 flex gap-4 text-sm text-muted-foreground">
          <span>{building.events.length} Events</span>

          <span>{building.disciplines.length} Disciplines</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Link to={`/academies/buildings/${building.id}`}>
            <Button variant="outline" size="sm">
              Open
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>

          <div className="flex gap-2">
            <UpdateBuildingDialog building={building} />

            <DeleteBuildingDialog buildingID={String(building.id)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

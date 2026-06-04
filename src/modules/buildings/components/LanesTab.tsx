import {
  Card,
  CardContent,
} from "@/shared/components/ui/card"

import {
  Badge,
} from "@/shared/components/ui/badge"

import type {
  BuildingProfileResponse,
} from "../types/building.types"

import {
  AddLaneDialog,
} from "./AddLaneDialog"

import {
  EditLaneDialog,
} from "./EditLaneDialog"

import {
  DeleteLaneDialog,
} from "./DeleteLaneDialog"

type Props = {
  building: BuildingProfileResponse
}

export function LanesTab({
  building,
}: Props) {

  return (
    <div className="space-y-4">

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <h3
          className="
            text-lg
            font-semibold
          "
        >
          Lanes
        </h3>

        <AddLaneDialog
          buildingID={String(
            building.id,
          )}
        />
      </div>

      {building.lanes.length ===
        0 && (
        <Card>
          <CardContent
            className="
              p-10
              text-center
              text-muted-foreground
            "
          >
            No lanes created
          </CardContent>
        </Card>
      )}

      {building.lanes.map(
        lane => (
          <Card
            key={lane.id}
          >
            <CardContent
              className="
                flex
                items-center
                justify-between
                p-5
              "
            >
              <div>
                <h3
                  className="
                    font-medium
                  "
                >
                  {lane.lane_name}
                </h3>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <Badge
                  variant={
                    lane.is_under_maintenance
                      ? "destructive"
                      : "default"
                  }
                >
                  {lane.is_under_maintenance
                    ? "Maintenance"
                    : "Available"}
                </Badge>

                <EditLaneDialog
                  buildingID={String(
                    building.id,
                  )}
                  lane={lane}
                />

                <DeleteLaneDialog
                  buildingID={String(
                    building.id,
                  )}
                  laneID={lane.id}
                />
              </div>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  )
}
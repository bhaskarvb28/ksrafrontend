import {
  Trash2,
} from "lucide-react"

import {
  Button,
} from "@/shared/components/ui/button"

import {
  Badge,
} from "@/shared/components/ui/badge"

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card"

import type {
  BuildingProfileResponse,
} from "../types/building.types"

import {
  AddEventDialog,
} from "./AddEventDialog"

import {
  useRemoveEvent,
} from "../hooks/useRemoveEvent"

type Props = {
  building: BuildingProfileResponse
}

export function EventsTab({
  building,
}: Props) {

  const removeMutation =
    useRemoveEvent()

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
          Events
        </h3>

        <AddEventDialog
          buildingID={String(
            building.id,
          )}
        />
      </div>

      {building.events.length === 0 && (
        <Card>
          <CardContent
            className="
              p-10
              text-center
              text-muted-foreground
            "
          >
            No events assigned
          </CardContent>
        </Card>
      )}

      {building.events.map(
        event => (
          <Card
            key={event.id}
          >
            <CardContent
              className="
                flex
                items-center
                justify-between
                p-5
              "
            >
              <Badge
                variant="secondary"
              >
                {
                  event.display_name
                }
              </Badge>

              <Button
                size="icon"
                variant="ghost"
                disabled={
                  removeMutation.isPending
                }
                onClick={() =>
                  removeMutation.mutate(
                    {
                      buildingID:
                        String(
                          building.id,
                        ),

                      eventID:
                        event.id,
                    },
                  )
                }
              >
                <Trash2
                  className="
                    size-4
                    text-destructive
                  "
                />
              </Button>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  )
}
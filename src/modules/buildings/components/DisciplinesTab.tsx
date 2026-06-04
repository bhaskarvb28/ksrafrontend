import { Trash2 } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

import { Card, CardContent } from "@/shared/components/ui/card"

import { Badge } from "@/shared/components/ui/badge"

import type { BuildingProfileResponse } from "../types/building.types"

import { AddDisciplineDialog } from "./AddDisciplineDialog"

import { useRemoveDiscipline } from "../hooks/useRemoveDiscipline"

type Props = {
  building: BuildingProfileResponse
}

export function DisciplinesTab({ building }: Props) {
  const removeMutation = useRemoveDiscipline()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Disciplines</h3>

        <AddDisciplineDialog buildingID={String(building.id)} />
      </div>

      {building.disciplines.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            No disciplines assigned
          </CardContent>
        </Card>
      )}

      {building.disciplines.map((discipline) => (
        <Card key={discipline.id}>
          <CardContent className="flex items-center justify-between p-5">
            <Badge>{discipline.display_name}</Badge>

            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                removeMutation.mutate({
                  buildingID: String(building.id),

                  disciplineID: discipline.id,
                })
              }
            >
              <Trash2 className="size-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

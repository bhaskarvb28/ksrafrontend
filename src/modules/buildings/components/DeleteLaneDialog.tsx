import {
  Trash2,
} from "lucide-react"

import {
  Button,
} from "@/shared/components/ui/button"

import {
  useDeleteLane,
} from "../hooks/useDeleteLane"

type Props = {
  buildingID: string

  laneID: number
}

export function DeleteLaneDialog({
  buildingID,
  laneID,
}: Props) {

  const mutation =
    useDeleteLane()

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() =>
        mutation.mutate({
          buildingID,
          laneID,
        })
      }
    >
      <Trash2
        className="
          size-4
          text-destructive
        "
      />
    </Button>
  )
}
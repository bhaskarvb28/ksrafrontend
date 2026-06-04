import {
  Pencil,
} from "lucide-react"

import {
  Switch,
} from "@/shared/components/ui/switch"

import {
  Button,
} from "@/shared/components/ui/button"

import {
  Input,
} from "@/shared/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

import {
  useForm,
} from "react-hook-form"

import {
  useUpdateLane,
} from "../hooks/useUpdateLane"

import type {
  BuildingLane,
} from "../types/building.types"

type Props = {
  buildingID: string

  lane: BuildingLane
}

export function EditLaneDialog({
  buildingID,
  lane,
}: Props) {

  const mutation =
    useUpdateLane()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      lane_name:
        lane.lane_name,

      is_under_maintenance:
        lane.is_under_maintenance,
    },
  })

  async function onSubmit(
    values: any,
  ) {

    await mutation.mutateAsync(
      {
        buildingID,

        laneID:
          lane.id,

        ...values,
      },
    )
  }

  return (
    <Dialog>

      <DialogTrigger
        asChild
      >
        <Button
          size="icon"
          variant="ghost"
        >
          <Pencil
            className="
              size-4
            "
          />
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit Lane
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-4"
        >

          <Input
            {...register(
              "lane_name",
            )}
          />

          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <span>
              Maintenance
            </span>

            <Switch
              checked={watch(
                "is_under_maintenance",
              )}
              onCheckedChange={(
                value,
              ) =>
                setValue(
                  "is_under_maintenance",
                  value,
                )
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Save Changes
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}
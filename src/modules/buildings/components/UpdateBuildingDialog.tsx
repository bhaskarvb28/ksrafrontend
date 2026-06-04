import {
  useForm,
} from "react-hook-form"

import {
  zodResolver,
} from "@hookform/resolvers/zod"

import {
  Pencil,
} from "lucide-react"

import {
  Button,
} from "@/shared/components/ui/button"

import {
  Input,
} from "@/shared/components/ui/input"

import {
  Switch,
} from "@/shared/components/ui/switch"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

import type {
  Building,
} from "../types/building.types"

import {
  updateBuildingSchema,
  type UpdateBuildingSchema,
} from "../schemas/building.schema"

import {
  useUpdateBuilding,
} from "../hooks/useUpdateBuilding"

type Props = {
  building: Building
}

export function UpdateBuildingDialog({
  building,
}: Props) {

  const mutation =
    useUpdateBuilding()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
    },
  } = useForm<UpdateBuildingSchema>(
    {
      resolver:
        zodResolver(
          updateBuildingSchema,
        ),

      defaultValues: {
        building_name:
          building.building_name,

        is_active:
          building.is_active,
      },
    },
  )

  async function onSubmit(
    values:
      UpdateBuildingSchema,
  ) {

    await mutation.mutateAsync(
      {
        buildingID:
          String(
            building.id,
          ),

        payload:
          values,
      },
    )
  }

  return (
    <Dialog>

      <DialogTrigger
        asChild
      >
        <Button
          variant="outline"
        >
          <Pencil
            className="
              mr-2
              size-4
            "
          />

          Edit Building
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Update Building
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-4"
        >

          <div
            className="
              space-y-2
            "
          >
            <label
              className="
                text-sm
                font-medium
              "
            >
              Building Name
            </label>

            <Input
              {...register(
                "building_name",
              )}
            />

            {errors.building_name && (
              <p
                className="
                  text-sm
                  text-destructive
                "
              >
                {
                  errors
                    .building_name
                    .message
                }
              </p>
            )}
          </div>

          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <label
              className="
                text-sm
                font-medium
              "
            >
              Active
            </label>

            <Switch
              checked={watch(
                "is_active",
              )}
              onCheckedChange={(
                value,
              ) =>
                setValue(
                  "is_active",
                  value,
                  {
                    shouldValidate:
                      true,
                  },
                )
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              mutation.isPending
            }
          >
            {mutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}
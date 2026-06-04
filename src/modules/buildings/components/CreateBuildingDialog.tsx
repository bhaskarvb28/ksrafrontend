import {
  useForm,
} from "react-hook-form"

import {
  zodResolver,
} from "@hookform/resolvers/zod"

import {
  Plus,
} from "lucide-react"

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
  createBuildingSchema,
  type CreateBuildingSchema,
} from "../schemas/building.schema"

import {
  useCreateBuilding,
} from "../hooks/useCreateBuilding"

export function CreateBuildingDialog() {

  const mutation =
    useCreateBuilding()

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<CreateBuildingSchema>({
    resolver:
      zodResolver(
        createBuildingSchema,
      ),

    defaultValues: {
      building_name: "",
    },
  })

  async function onSubmit(
    values: CreateBuildingSchema,
  ) {

    await mutation.mutateAsync(
      values,
    )

    reset()
  }

  return (
    <Dialog>

      <DialogTrigger
        asChild
      >
        <Button>
          <Plus
            className="
              mr-2
              size-4
            "
          />

          Create Building
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Create Building
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
              placeholder="
                Main Indoor Range
              "
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

          <Button
            type="submit"
            className="w-full"
            disabled={
              mutation.isPending
            }
          >
            {mutation.isPending
              ? "Creating..."
              : "Create Building"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}
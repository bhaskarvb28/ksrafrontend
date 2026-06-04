import {
  useForm,
} from "react-hook-form"

import {
  z,
} from "zod"

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
  useCreateLane,
} from "../hooks/useCreateLane"

const schema = z.object({
  lane_name: z
    .string()
    .min(1, {
      message:
        "Lane name is required",
    }),
})

type FormValues =
  z.infer<typeof schema>

type Props = {
  buildingID: string
}

export function AddLaneDialog({
  buildingID,
}: Props) {

  const mutation =
    useCreateLane()

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<FormValues>({
    resolver:
      zodResolver(schema),

    defaultValues: {
      lane_name: "",
    },
  })

  async function onSubmit(
    values: FormValues,
  ) {

    await mutation.mutateAsync(
      {
        buildingID,

        lane_name:
          values.lane_name,
      },
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

          Add Lane
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Create Lane
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
              Lane Name
            </label>

            <Input
              placeholder="
                Competition Lane 1
              "
              {...register(
                "lane_name",
              )}
            />

            {errors.lane_name && (
              <p
                className="
                  text-sm
                  text-destructive
                "
              >
                {
                  errors
                    .lane_name
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
              : "Create Lane"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}
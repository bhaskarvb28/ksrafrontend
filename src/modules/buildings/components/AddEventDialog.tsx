import {
  useForm,
} from "react-hook-form"

import { z }
from "zod"

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

import {
  useAddEvent,
} from "../hooks/useAddEvent"

import {
  useAvailableEvents,
} from "@/modules/ShootingEvents/hooks/useAvailableEvents"

const schema = z.object({
  shooting_event_id:
    z.coerce
      .number()
      .min(1, {
        message:
          "Event is required",
      }),
})

type FormValues =
  z.infer<typeof schema>

type Props = {
  buildingID: string
}

export function AddEventDialog({
  buildingID,
}: Props) {

  const mutation =
    useAddEvent()

  const {
    data: events = [],
    isLoading,
  } = useAvailableEvents(
    buildingID,
  )

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
    },
  } = useForm<FormValues>({
    resolver:
      zodResolver(schema),

    defaultValues: {
      shooting_event_id: 0,
    },
  })

  async function onSubmit(
    values: FormValues,
  ) {

    await mutation.mutateAsync({
      buildingID,

      shooting_event_id:
        values.shooting_event_id,
    })

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

          Add Event
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Add Event
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
              Event
            </label>

            <Select
              value={
                watch(
                  "shooting_event_id",
                ) > 0
                  ? String(
                      watch(
                        "shooting_event_id",
                      ),
                    )
                  : undefined
              }
              onValueChange={(
                value,
              ) =>
                setValue(
                  "shooting_event_id",
                  Number(
                    value,
                  ),
                  {
                    shouldValidate:
                      true,
                  },
                )
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="
                    Select Event
                  "
                />
              </SelectTrigger>

              <SelectContent>

                {events.map(
                  event => (
                    <SelectItem
                      key={
                        event.id
                      }
                      value={String(
                        event.id,
                      )}
                    >
                      {
                        event.display_name
                      }
                    </SelectItem>
                  ),
                )}

              </SelectContent>
            </Select>

            {errors.shooting_event_id && (
              <p
                className="
                  text-sm
                  text-destructive
                "
              >
                {
                  errors
                    .shooting_event_id
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              mutation.isPending ||
              isLoading
            }
          >
            {mutation.isPending
              ? "Adding..."
              : "Add Event"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}
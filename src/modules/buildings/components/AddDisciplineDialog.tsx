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
  useAddDiscipline,
} from "../hooks/useAddDiscipline"

import {
  useDisciplines,
} from "@/modules/disciplines/hooks/useDiscipline"

const schema = z.object({
  discipline_id: z
    .coerce
    .number()
    .min(1, {
      message:
        "Discipline is required",
    }),
})

type FormValues =
  z.infer<typeof schema>

type Props = {
  buildingID: string
}

export function AddDisciplineDialog({
  buildingID,
}: Props) {

  const mutation =
    useAddDiscipline()

  const {
    data: disciplines = [],
    isLoading,
  } = useDisciplines()

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
    },
  } = useForm<FormValues>({
    resolver:
      zodResolver(schema),

    defaultValues: {
      discipline_id: 0,
    },
  })

  async function onSubmit(
    values: FormValues,
  ) {

    await mutation.mutateAsync({
      buildingID,

      discipline_id:
        values.discipline_id,
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

          Add Discipline
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Add Discipline
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
              Discipline
            </label>

            <Select
              value={
                watch(
                  "discipline_id",
                ) > 0
                  ? String(
                      watch(
                        "discipline_id",
                      ),
                    )
                  : undefined
              }
              onValueChange={(
                value,
              ) =>
                setValue(
                  "discipline_id",
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
                    Select Discipline
                  "
                />
              </SelectTrigger>

              <SelectContent>
                {disciplines.map(
                  discipline => (
                    <SelectItem
                      key={
                        discipline.id
                      }
                      value={String(
                        discipline.id,
                      )}
                    >
                      {
                        discipline.display_name
                      }
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>

            {errors.discipline_id && (
              <p
                className="
                  text-sm
                  text-destructive
                "
              >
                {
                  errors
                    .discipline_id
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
              : "Add Discipline"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}
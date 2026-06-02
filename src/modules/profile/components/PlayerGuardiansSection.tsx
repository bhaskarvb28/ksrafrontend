import {
  useFieldArray,
  type UseFormReturn,
} from "react-hook-form"

import { Button }
from "@/shared/components/ui/button"

import { Input }
from "@/shared/components/ui/input"

import { Checkbox }
from "@/shared/components/ui/checkbox"

import { Label }
from "@/shared/components/ui/label"

import { Separator }
from "@/shared/components/ui/separator"

import type {
  PlayerProfileSchema,
} from "../schemas/player-profile.schema"

interface Props {
  form:
    UseFormReturn<PlayerProfileSchema>
}

export function PlayerGuardiansSection({
  form,
}: Props) {
  const {
    register,
    control,
    watch,
    setValue,
  } = form

  const guardians =
    watch("guardians")

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,

    name: "guardians",
  })

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          Guardians
        </h2>

        <p className="text-sm text-muted-foreground">
          Add guardian details
        </p>
      </div>

      <Separator />

      <div className="space-y-5">
        {fields.map(
          (field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-2xl border p-4"
            >
              <Input
                placeholder="Full Name"
                {...register(
                  `guardians.${index}.full_name`
                )}
              />

              <Input
                placeholder="Relationship"
                {...register(
                  `guardians.${index}.relationship`
                )}
              />

              <Input
                placeholder="Contact Number"
                {...register(
                  `guardians.${index}.contact_number`
                )}
              />

              <Input
                placeholder="Alternative Contact"
                {...register(
                  `guardians.${index}.alternative_contact`
                )}
              />

              <div className="flex items-center gap-3">
                <Checkbox
                  checked={
                    guardians[
                      index
                    ]
                      ?.parental_consent
                  }
                  onCheckedChange={(
                    checked
                  ) =>
                    setValue(
                      `guardians.${index}.parental_consent`,
                      !!checked
                    )
                  }
                />

                <Label>
                  Parental Consent
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  checked={
                    guardians[
                      index
                    ]?.is_primary
                  }
                  onCheckedChange={() => {
                    setValue(
                      "guardians",
                      guardians.map(
                        (
                          guardian,
                          guardianIndex
                        ) => ({
                          ...guardian,

                          is_primary:
                            guardianIndex ===
                            index,
                        })
                      )
                    )
                  }}
                />

                <Label>
                  Primary Guardian
                </Label>
              </div>

              {fields.length >
                1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    remove(
                      index
                    )
                  }
                >
                  Remove Guardian
                </Button>
              )}
            </div>
          )
        )}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              full_name: "",

              relationship: "",

              contact_number: "",

              alternative_contact:
                "",

              parental_consent: false,

              is_primary: false,
            })
          }
        >
          Add Guardian
        </Button>
      </div>
    </div>
  )
}
import type { UseFormReturn }
from "react-hook-form"

import { Checkbox }
from "@/shared/components/ui/checkbox"

import { Label }
from "@/shared/components/ui/label"

import { Separator }
from "@/shared/components/ui/separator"

import { useDisciplines }
from "@/modules/disciplines/hooks/useDiscipline"

import type {
  PlayerProfileSchema,
} from "../schemas/player-profile.schema"

interface Props {
  form:
    UseFormReturn<PlayerProfileSchema>
}

export function PlayerDisciplinesSection({
  form,
}: Props) {
  const disciplines =
    useDisciplines()

  const selected =
    form.watch(
      "disciplines"
    )

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          Disciplines
        </h2>

        <p className="text-sm text-muted-foreground">
          Select player disciplines
        </p>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        {disciplines.data?.map(
          (discipline) => {
            const exists =
              selected.some(
                (d) =>
                  d.discipline_id ===
                  discipline.id
              )

            return (
              <div
                key={
                  discipline.id
                }
                className="flex items-center gap-3 rounded-2xl border p-4"
              >
                <Checkbox
                  checked={exists}
                  onCheckedChange={(
                    checked
                  ) => {
                    if (checked) {
                      form.setValue(
                        "disciplines",
                        [
                          ...selected,
                          {
                            discipline_id:
                              discipline.id,

                            is_primary:
                              selected.length ===
                              0,
                          },
                        ]
                      )
                    } else {
                      form.setValue(
                        "disciplines",
                        selected.filter(
                          (
                            d
                          ) =>
                            d.discipline_id !==
                            discipline.id
                        )
                      )
                    }
                  }}
                />

                <div className="space-y-1">
                  <Label>
                    {
                      discipline.display_name
                    }
                  </Label>

                  <button
                    type="button"
                    className="text-xs text-muted-foreground"
                    onClick={() => {
                      form.setValue(
                        "disciplines",
                        selected.map(
                          (d) => ({
                            ...d,

                            is_primary:
                              d.discipline_id ===
                              discipline.id,
                          })
                        )
                      )
                    }}
                  >
                    Set Primary
                  </button>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
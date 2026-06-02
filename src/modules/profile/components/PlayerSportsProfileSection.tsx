import type { UseFormReturn }
from "react-hook-form"

import {
  Controller,
} from "react-hook-form"

import { Input }
from "@/shared/components/ui/input"

import { Label }
from "@/shared/components/ui/label"

import { Separator }
from "@/shared/components/ui/separator"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

import type {
  PlayerProfileSchema,
} from "../schemas/player-profile.schema"

interface Props {
  form:
    UseFormReturn<PlayerProfileSchema>
}

export function PlayerSportsProfileSection({
  form,
}: Props) {
  const {
    register,
    control,
  } = form

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          Sports Profile
        </h2>

        <p className="text-sm text-muted-foreground">
          Provide sports related
          details
        </p>
      </div>

      <Separator />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>
            Unit of Representation
          </Label>

          <Input
            {...register(
              "sports_profile.unit_of_representation"
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Dominant Hand
          </Label>

          <Controller
            control={control}
            name="sports_profile.dominant_hand"
            render={({
              field,
            }) => (
              <Select
                value={
                  field.value
                }
                onValueChange={
                  field.onChange
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="left">
                    Left
                  </SelectItem>

                  <SelectItem value="right">
                    Right
                  </SelectItem>

                  <SelectItem value="ambidextrous">
                    Ambidextrous
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Height (cm)
          </Label>

          <Input
            type="number"
            step="0.1"
            {...register(
              "sports_profile.height_cm",
              {
                valueAsNumber: true,
              }
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Weight (kg)
          </Label>

          <Input
            type="number"
            step="0.1"
            {...register(
              "sports_profile.weight_kg",
              {
                valueAsNumber: true,
              }
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Shoe Size
          </Label>

          <Input
            {...register(
              "sports_profile.shoe_size"
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Tracksuit Size
          </Label>

          <Input
            {...register(
              "sports_profile.tracksuit_size"
            )}
          />
        </div>
      </div>
    </div>
  )
}
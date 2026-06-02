import type { UseFormReturn }
from "react-hook-form"

import { Input }
from "@/shared/components/ui/input"

import { Separator }
from "@/shared/components/ui/separator"

import type {
  PlayerProfileSchema,
} from "../schemas/player-profile.schema"

interface Props {
  form:
    UseFormReturn<PlayerProfileSchema>
}

export function PlayerPassportSection({
  form,
}: Props) {
  const {
    register,
  } = form

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          Passport Information
        </h2>

        <p className="text-sm text-muted-foreground">
          Optional passport
          details
        </p>
      </div>

      <Separator />

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          placeholder="Passport Number"
          {...register(
            "passport.passport_number"
          )}
        />

        <Input
          type="date"
          {...register(
            "passport.passport_issue_date"
          )}
        />

        <Input
          type="date"
          {...register(
            "passport.passport_expiry_date"
          )}
        />

        <Input
          placeholder="Issuing Authority"
          {...register(
            "passport.passport_issuing_authority"
          )}
        />

        <Input
          placeholder="Place of Issue"
          {...register(
            "passport.passport_place_of_issue"
          )}
        />
      </div>
    </div>
  )
}
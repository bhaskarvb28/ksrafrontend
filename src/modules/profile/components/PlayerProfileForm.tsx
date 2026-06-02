import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import { Button } from "@/shared/components/ui/button"

import { Checkbox } from "@/shared/components/ui/checkbox"

import {
  playerProfileSchema,
  type PlayerProfileSchema,
} from "../schemas/player-profile.schema"

import { useCompletePlayerProfile } from "../hooks/useCompletePlayerProfile"

import { PlayerPersonalInfoSection } from "./PlayerPersonalInforSection"

import { PlayerSportsProfileSection } from "./PlayerSportsProfileSection"

import { PlayerDisciplinesSection } from "./PlayerDisciplinesSection"

import { PlayerPassportSection } from "./PlayerPassportSection"

import { PlayerGuardiansSection } from "./PlayerGuardiansSection"

function getFirstError(errors: any): string | null {
  for (const key in errors) {
    const value = errors[key]

    if (value?.message) {
      return value.message
    }

    if (typeof value === "object") {
      const nested = getFirstError(value)

      if (nested) {
        return nested
      }
    }
  }

  return null
}

export function PlayerProfileForm() {
  const mutation = useCompletePlayerProfile()

  const form = useForm<PlayerProfileSchema>({
    resolver: zodResolver(playerProfileSchema),

    defaultValues: {
      dpdp_consent: false,

      personal_info: {
        gender: "male",

        nationality: "Indian",
      },

      sports_profile: {
        dominant_hand: "right",
      },

      disciplines: [],

      passport: {},

      guardians: [
        {
          full_name: "",

          relationship: "",

          contact_number: "",

          alternative_contact: "",

          parental_consent: false,

          is_primary: true,
        },
      ],
    },
  })

  function onSubmit(values: PlayerProfileSchema) {
    mutation.mutate({
      ...values,

      personal_info: {
        ...values.personal_info,

        date_of_birth: new Date(
          values.personal_info.date_of_birth
        ).toISOString(),
      },

      passport: {
        ...values.passport,

        passport_issue_date: values.passport.passport_issue_date
          ? new Date(values.passport.passport_issue_date).toISOString()
          : undefined,

        passport_expiry_date: values.passport.passport_expiry_date
          ? new Date(values.passport.passport_expiry_date).toISOString()
          : undefined,
      },
    })
  }

  return (
    <form
      onSubmit={form.handleSubmit(
        onSubmit,

        (errors) => {
          const message = getFirstError(errors)

          toast.error(message ?? "Please complete all required fields")

          console.log(errors)
        }
      )}
      className="space-y-8"
    >
      <PlayerPersonalInfoSection form={form} />

      <PlayerSportsProfileSection form={form} />

      <PlayerDisciplinesSection form={form} />

      <PlayerPassportSection form={form} />

      <PlayerGuardiansSection form={form} />

      {/* DPDP CONSENT */}
      <div className="rounded-3xl border border-border bg-card/40 p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={form.watch("dpdp_consent")}
            onCheckedChange={(checked) =>
              form.setValue("dpdp_consent", !!checked, {
                shouldValidate: true,
              })
            }
          />

          <div className="space-y-2">
            <h3 className="font-medium">DPDP Consent</h3>

            <p className="text-sm text-muted-foreground">
              I consent to the processing and storage of my personal data in
              accordance with the Digital Personal Data Protection (DPDP) Act.
            </p>

            {form.formState.errors.dpdp_consent && (
              <p className="text-sm text-destructive">
                {form.formState.errors.dpdp_consent.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Completing Profile..." : "Complete Profile"}
      </Button>
    </form>
  )
}

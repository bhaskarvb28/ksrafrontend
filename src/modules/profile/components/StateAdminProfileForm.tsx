import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui/button"

import { Checkbox } from "@/shared/components/ui/checkbox"

import { Label } from "@/shared/components/ui/label"

import {
  stateAdminProfileSchema,
  type StateAdminProfileSchema,
} from "../schemas/state-admin-profile.schema"

import { useCompleteStateAdminProfile } from "../hooks/useCompleteStateAdminProfile"

export function StateAdminProfileForm() {
  const mutation =
    useCompleteStateAdminProfile()

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } =
    useForm<StateAdminProfileSchema>({
      resolver: zodResolver(
        stateAdminProfileSchema
      ),

      defaultValues: {
        dpdp_consent: false,
      },
    })

  const dpdpConsent =
    watch("dpdp_consent")

  function onSubmit(
    values: StateAdminProfileSchema
  ) {
    mutation.mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6"
    >
      <div className="rounded-3xl border border-border bg-card/40 p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={dpdpConsent}
            onCheckedChange={(
              checked
            ) =>
              setValue(
                "dpdp_consent",
                !!checked,
                {
                  shouldValidate: true,
                }
              )
            }
          />

          <div className="space-y-2">
            <Label className="text-sm leading-6">
              I consent to the processing
              and storage of my personal
              data in accordance with the
              Digital Personal Data
              Protection (DPDP) Act.
            </Label>

            {errors.dpdp_consent && (
              <p className="text-sm text-destructive">
                {
                  errors
                    .dpdp_consent
                    .message
                }
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-2xl"
        disabled={
          mutation.isPending
        }
      >
        {mutation.isPending
          ? "Completing profile..."
          : "Complete Profile"}
      </Button>
    </form>
  )
}
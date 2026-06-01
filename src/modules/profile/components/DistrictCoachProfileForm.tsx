import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui/button"

import { Checkbox } from "@/shared/components/ui/checkbox"

import { Label } from "@/shared/components/ui/label"

import { Input } from "@/shared/components/ui/input"

import { Separator } from "@/shared/components/ui/separator"

import {
  districtCoachProfileSchema,
  type DistrictCoachProfileSchema,
} from "../schemas/district-coach-profile.schema"

import { useCompleteDistrictCoachProfile } from "../hooks/useCompleteDistrictCoachProfile"

export function DistrictCoachProfileForm() {
  const mutation =
    useCompleteDistrictCoachProfile()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } =
    useForm<DistrictCoachProfileSchema>({
      resolver: zodResolver(
        districtCoachProfileSchema
      ),

      defaultValues: {
        dpdp_consent: false,
        coach_code: "",
        coaching_certificate_proof: "",
        discipline_ids: [1, 2],
      },
    })

  const dpdpConsent =
    watch("dpdp_consent")

  function onSubmit(
    values: DistrictCoachProfileSchema
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
      {/* Profile Details Card */}
      <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-5 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            District Coach Profile
          </h2>

          <p className="text-sm text-muted-foreground">
            Provide the required details to complete your profile setup
          </p>
        </div>

        <Separator className="bg-border" />

        <div className="space-y-4">
          {/* Coach Code */}
          <div className="space-y-2">
            <Label className="text-foreground">Coach Code</Label>

            <Input
              placeholder="DC-KA-2026-001"
              className="h-12 border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
              {...register("coach_code")}
            />

            {errors.coach_code && (
              <p className="text-sm text-destructive">
                {errors.coach_code.message}
              </p>
            )}
          </div>

          {/* Coaching Certificate Proof URL */}
          <div className="space-y-2">
            <Label className="text-foreground">Coaching Certificate Proof URL</Label>

            <Input
              placeholder="https://cdn.example.com/certificates/district-coach.pdf"
              className="h-12 border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
              {...register("coaching_certificate_proof")}
            />

            {errors.coaching_certificate_proof && (
              <p className="text-sm text-destructive">
                {errors.coaching_certificate_proof.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card/40 p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            id="dpdp_consent"
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
            <Label htmlFor="dpdp_consent" className="text-sm leading-6">
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

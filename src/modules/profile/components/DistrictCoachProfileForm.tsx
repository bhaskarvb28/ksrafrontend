import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui/button"

import { Checkbox } from "@/shared/components/ui/checkbox"

import { Label } from "@/shared/components/ui/label"

import { Input } from "@/shared/components/ui/input"

import { Separator } from "@/shared/components/ui/separator"

import { useDisciplines } from "@/modules/disciplines/hooks/useDiscipline"

import {
  districtCoachProfileSchema,
  type DistrictCoachProfileSchema,
} from "../schemas/district-coach-profile.schema"

import { useCompleteDistrictCoachProfile } from "../hooks/useCompleteDistrictCoachProfile"

export function DistrictCoachProfileForm() {
  const mutation = useCompleteDistrictCoachProfile()

  const disciplines = useDisciplines()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DistrictCoachProfileSchema>({
    resolver: zodResolver(districtCoachProfileSchema),

    defaultValues: {
      dpdp_consent: false,

      coach_code: "",

      coaching_certificate_proof: "",

      discipline_ids: [],
    },
  })

  const selectedDisciplines = watch("discipline_ids")

  const dpdpConsent = watch("dpdp_consent")

  function onSubmit(values: DistrictCoachProfileSchema) {
    mutation.mutate(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <Label className="text-foreground">
              Coaching Certificate Proof URL
            </Label>

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

      {/* Disciplines */}

      <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-5 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">Disciplines</h2>

          <p className="text-sm text-muted-foreground">
            Select the disciplines this coach is certified for
          </p>
        </div>

        <Separator className="bg-border" />

        <div className="grid gap-4 sm:grid-cols-2">
          {disciplines.data?.map((discipline) => {
            const checked = selectedDisciplines.includes(discipline.id)

            return (
              <div
                key={discipline.id}
                className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4 transition-colors"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => {
                    if (value) {
                      setValue(
                        "discipline_ids",

                        [...selectedDisciplines, discipline.id],

                        {
                          shouldValidate: true,
                        }
                      )
                    } else {
                      setValue(
                        "discipline_ids",

                        selectedDisciplines.filter(
                          (id) => id !== discipline.id
                        ),

                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  }}
                />

                <div className="space-y-1">
                  <Label className="cursor-pointer text-sm font-medium">
                    {discipline.display_name}
                  </Label>

                  <p className="text-xs text-muted-foreground">
                    {discipline.code}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {errors.discipline_ids && (
          <p className="text-sm text-destructive">
            {errors.discipline_ids.message}
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-border bg-card/40 p-6">
        <div className="flex items-start gap-4">
          <Checkbox
            id="dpdp_consent"
            checked={dpdpConsent}
            onCheckedChange={(checked) =>
              setValue("dpdp_consent", !!checked, {
                shouldValidate: true,
              })
            }
          />

          <div className="space-y-2">
            <Label htmlFor="dpdp_consent" className="text-sm leading-6">
              I consent to the processing and storage of my personal data in
              accordance with the Digital Personal Data Protection (DPDP) Act.
            </Label>

            {errors.dpdp_consent && (
              <p className="text-sm text-destructive">
                {errors.dpdp_consent.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-2xl"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Completing profile..." : "Complete Profile"}
      </Button>
    </form>
  )
}

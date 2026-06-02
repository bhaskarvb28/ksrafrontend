import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui/button"

import { Checkbox } from "@/shared/components/ui/checkbox"

import { Label } from "@/shared/components/ui/label"

import { Input } from "@/shared/components/ui/input"

import { Separator } from "@/shared/components/ui/separator"

import {
  academyAdminProfileSchema,
  type AcademyAdminProfileSchema,
} from "../schemas/academy-admin-profile.schema"

import { useCompleteAcademyAdminProfile }
from "../hooks/useCompleteAcademyAdminProfile"

export function AcademyAdminProfileForm() {
  const mutation =
    useCompleteAcademyAdminProfile()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } =
    useForm<AcademyAdminProfileSchema>({
      resolver: zodResolver(
        academyAdminProfileSchema
      ),

      defaultValues: {
        dpdp_consent: false,

        gstin: "",

        registration_proof: "",
      },
    })

  const dpdpConsent =
    watch("dpdp_consent")

  function onSubmit(
    values: AcademyAdminProfileSchema
  ) {
    mutation.mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-5 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Academy Admin Profile
          </h2>

          <p className="text-sm text-muted-foreground">
            Provide the required details
            to complete your profile setup
          </p>
        </div>

        <Separator className="bg-border" />

        <div className="space-y-4">
          {/* GSTIN */}
          <div className="space-y-2">
            <Label className="text-foreground">
              GSTIN
            </Label>

            <Input
              placeholder="29ABCDE1234F1Z5"
              className="h-12 border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
              {...register("gstin")}
            />

            {errors.gstin && (
              <p className="text-sm text-destructive">
                {errors.gstin.message}
              </p>
            )}
          </div>

          {/* Registration Proof */}
          <div className="space-y-2">
            <Label className="text-foreground">
              Registration Proof URL
            </Label>

            <Input
              placeholder="https://cdn.example.com/documents/academy-registration.pdf"
              className="h-12 border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
              {...register(
                "registration_proof"
              )}
            />

            {errors.registration_proof && (
              <p className="text-sm text-destructive">
                {
                  errors
                    .registration_proof
                    .message
                }
              </p>
            )}
          </div>
        </div>
      </div>

      {/* DPDP Consent */}
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
            <Label
              htmlFor="dpdp_consent"
              className="text-sm leading-6"
            >
              I consent to the
              processing and storage
              of my personal data in
              accordance with the
              Digital Personal Data
              Protection (DPDP) Act.
            </Label>

            {errors.dpdp_consent && (
              <p className="text-sm text-destructive">
                {
                  errors.dpdp_consent
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
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Completing profile..."
          : "Complete Profile"}
      </Button>
    </form>
  )
}
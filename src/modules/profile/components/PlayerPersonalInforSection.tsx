import type { UseFormReturn } from "react-hook-form"

import { Input } from "@/shared/components/ui/input"

import { Label } from "@/shared/components/ui/label"

import { Separator } from "@/shared/components/ui/separator"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

import { Controller } from "react-hook-form"

import type { PlayerProfileSchema } from "../schemas/player-profile.schema"

import { usePincodes } from "@/modules/pincodes/hooks/usePincode"

interface Props {
  form: UseFormReturn<PlayerProfileSchema>
}

export function PlayerPersonalInfoSection({ form }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form

  const pincodes = usePincodes()

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Personal Information</h2>

        <p className="text-sm text-muted-foreground">
          Provide your personal details
        </p>
      </div>

      <Separator />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Date of Birth</Label>

          <Input type="date" {...register("personal_info.date_of_birth")} />

          <p className="text-sm text-destructive">
            {errors.personal_info?.date_of_birth?.message}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>

          <Controller
            control={control}
            name="personal_info.gender"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>

                  <SelectItem value="female">Female</SelectItem>

                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Nationality</Label>

          <Input {...register("personal_info.nationality")} />
        </div>

        <div className="space-y-2">
          <Label>Place of Birth</Label>

          <Input {...register("personal_info.place_of_birth")} />
        </div>

        <div className="space-y-2">
          <Label>City</Label>

          <Input {...register("personal_info.city")} />
        </div>

        <div className="space-y-2">
          <Label>Pincode</Label>

          <Controller
            control={control}
            name="personal_info.pincode_id"
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : undefined}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pincode" />
                </SelectTrigger>

                <SelectContent>
                  {pincodes.data?.map((pincode) => (
                    <SelectItem key={pincode.id} value={String(pincode.id)}>
                      {pincode.code} — {pincode.district_name},{" "}
                      {pincode.state_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Residential Address</Label>

          <Input {...register("personal_info.residential_address")} />
        </div>

        <div className="space-y-2">
          <Label>Education</Label>

          <Input {...register("personal_info.education")} />
        </div>

        <div className="space-y-2">
          <Label>Institution Name</Label>

          <Input {...register("personal_info.institution_name")} />
        </div>

        <div className="space-y-2">
          <Label>Occupation</Label>

          <Input {...register("personal_info.occupation")} />
        </div>

        <div className="space-y-2">
          <Label>Temporary Sport ID</Label>

          <Input {...register("personal_info.temporary_sport_id")} />
        </div>
      </div>
    </div>
  )
}

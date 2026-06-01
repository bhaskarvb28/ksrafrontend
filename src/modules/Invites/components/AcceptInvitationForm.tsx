import { Eye, EyeOff, Lock, Phone, User } from "lucide-react"

import { useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/shared/components/ui/input"

import { Button } from "@/shared/components/ui/button"

import { Label } from "@/shared/components/ui/label"

import { Separator } from "@/shared/components/ui/separator"

import {
  acceptInvitationSchema,
  type AcceptInvitationSchema,
} from "../schemas/accept-invitation.schema"

import { useAcceptInvitation } from "../hooks/useAcceptInvitation"

interface Props {
  token: string
}

export function AcceptInvitationForm({ token }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const mutation = useAcceptInvitation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInvitationSchema>({
    resolver: zodResolver(acceptInvitationSchema),

    defaultValues: {
      first_name: "",
      last_name: "",
      contact_number: "",
      password: "",
      confirm_password: "",
    },
  })

  function onSubmit(values: AcceptInvitationSchema) {
    mutation.mutate({
      token,

      first_name: values.first_name,

      last_name: values.last_name,

      contact_number: `+91${values.contact_number}`,

      password: values.password,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-5 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Personal Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Enter your basic profile details
          </p>
        </div>

        <Separator className="bg-border" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label className="text-foreground">First name</Label>

            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="John"
                className="h-12 border-border bg-background/50 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
                {...register("first_name")}
              />
            </div>

            {errors.first_name && (
              <p className="text-sm text-destructive">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label className="text-foreground">Last name</Label>

            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Doe"
                className="h-12 border-border bg-background/50 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
                {...register("last_name")}
              />
            </div>

            {errors.last_name && (
              <p className="text-sm text-destructive">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <Label className="text-foreground">Contact number</Label>

          <div className="relative">
            <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="+91 9876543210"
              className="h-12 border-border bg-background/50 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
              {...register("contact_number")}
            />
          </div>

          {errors.contact_number && (
            <p className="text-sm text-destructive">
              {errors.contact_number.message}
            </p>
          )}
        </div>
      </div>

      {/* Security */}
      <div className="space-y-5 rounded-3xl border border-border bg-card/40 p-5 backdrop-blur-xl">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Security Setup
          </h2>

          <p className="text-sm text-muted-foreground">
            Protect your academy account
          </p>
        </div>

        <Separator className="bg-border" />

        {/* Password */}
        <div className="space-y-2">
          <Label className="text-foreground">Password</Label>

          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="h-12 border-border bg-background/50 pr-10 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Must contain at least 8 characters
          </p>

          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label className="text-foreground">Confirm password</Label>

          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="h-12 border-border bg-background/50 pr-10 pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1"
              {...register("confirm_password")}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.confirm_password && (
            <p className="text-sm text-destructive">
              {errors.confirm_password.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-2xl"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Completing setup..." : "Complete Setup"}
      </Button>
    </form>
  )
}

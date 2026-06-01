import { useEffect, useMemo, useState } from "react"

import { Controller, useForm, useWatch } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

import { Button } from "@/shared/components/ui/button"

import { Input } from "@/shared/components/ui/input"

import { useDistrictAdminAcademy } from "@/modules/academies/hooks/useDistrictAdminAcademies"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

import {
  createInviteSchema,
  type CreateInviteSchema,
} from "../schemas/createInviteSchema"

import { useCreateInvite } from "../hooks/useCreateInvite"

import { useRoles } from "@/modules/roles/hooks/useRoles"

import { useStates } from "@/modules/states/hooks/useStates"

// import later
import { useDistricts } from "@/modules/districts/hooks/useDistrict"
// import { useAcademies } from "@/modules/academies/hooks/useAcademies"

import { useAuthStore } from "@/shared/store/auth.store"

export function CreateInviteDialog() {
  const [open, setOpen] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutateAsync } = useCreateInvite()

  const { data: roles, isLoading: isRolesLoading } = useRoles()

  const profile = useAuthStore((state) => state.profile)

  const stateID =
    profile && "state_id" in profile ? profile.state_id : undefined
  // alert(user)
  console.log(stateID)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateInviteSchema>({
    resolver: zodResolver(createInviteSchema),

    defaultValues: {
      name: "",
      email: "",
      role: undefined,
      scope_id: undefined,
      scope_type: undefined,
    },
  })

  // ----------------------------------------------------------
  // Watch Selected Role
  // ----------------------------------------------------------

  const selectedRoleCode = useWatch({
    control,
    name: "role",
  })

  // ----------------------------------------------------------
  // Auto Select First Available Role
  // ----------------------------------------------------------

  const defaultRole = useMemo(() => {
    if (!roles?.length) {
      return null
    }

    return roles[0]
  }, [roles])

  useEffect(() => {
    if (defaultRole) {
      setValue("role", defaultRole.code as CreateInviteSchema["role"])
    }
  }, [defaultRole, setValue])

  // ----------------------------------------------------------
  // Current Selected Role
  // ----------------------------------------------------------

  const selectedRole = roles?.find((role) => role.code === selectedRoleCode)

  const scopeType = selectedRole?.scope_type

  // ----------------------------------------------------------
  // Sync Scope Type To Form
  // ----------------------------------------------------------

  useEffect(() => {
    if (scopeType) {
      setValue("scope_type", scopeType)
    }
  }, [scopeType, setValue])

  // ----------------------------------------------------------
  // Conditional Queries
  // ----------------------------------------------------------

  const shouldFetchStates = scopeType === "state"
  const shouldFetchDistricts = scopeType === "district"
  const shouldFetchAcademies = scopeType === "academy"

  // ----------------------------------------------------------
  // States
  // ----------------------------------------------------------

  const { data: dynamicStates } = useStates({
    enabled: shouldFetchStates,
  })

  // ----------------------------------------------------------
  // Districts
  // ----------------------------------------------------------
  const { data: dynamicDistricts } = useDistricts({
    stateID,
    enabled: shouldFetchDistricts,
  })

  // ----------------------------------------------------------
  // Academies
  // ----------------------------------------------------------

  const { data: dynamicAcademies } = useDistrictAdminAcademy({
    limit: "all",

    enabled: shouldFetchAcademies,
  })

  // ----------------------------------------------------------
  // Submit
  // ----------------------------------------------------------

  async function onSubmit(values: CreateInviteSchema) {
    try {
      setIsSubmitting(true)

      await mutateAsync(values)

      reset({
        name: "",

        email: "",

        role: (defaultRole?.code ?? undefined) as CreateInviteSchema["role"],

        scope_id: undefined,

        scope_type: defaultRole?.scope_type,
      })

      setOpen(false)
    } catch {
      // handled by mutation
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) {
          return
        }

        setOpen(nextOpen)
      }}
    >
      <DialogTrigger asChild>
        <Button>Invite Member</Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md [&>button]:hidden"
        onEscapeKeyDown={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
        onPointerDownOutside={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
        onInteractOutside={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader className="space-y-2">
          <DialogTitle>Invite Member</DialogTitle>

          <DialogDescription>
            Send an invitation to a new member.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 pt-3">
          {/* NAME */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
            </div>

            <Input
              placeholder="John Doe"
              disabled={isSubmitting}
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Email Address</label>
            </div>

            <Input
              placeholder="bhaskar@example.com"
              disabled={isSubmitting}
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* ROLE */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Role</label>
            </div>

            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select
                  disabled={isSubmitting}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)

                    setValue("scope_id", "")
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isRolesLoading ? "Loading roles..." : "Select role"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {roles?.map((role) => (
                      <SelectItem key={role.id} value={role.code}>
                        {role.display_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          {/* STATE */}
          {scopeType === "state" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">State</label>
              </div>

              <Controller
                control={control}
                name="scope_id"
                render={({ field }) => (
                  <Select
                    disabled={isSubmitting}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>

                    <SelectContent>
                      {dynamicStates?.map((state) => (
                        <SelectItem key={state.id} value={String(state.id)}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.scope_id && (
                <p className="text-sm text-destructive">
                  {errors.scope_id.message}
                </p>
              )}
            </div>
          )}

          {/* DISTRICT */}
          {scopeType === "district" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">District</label>
              </div>

              <Controller
                control={control}
                name="scope_id"
                render={({ field }) => (
                  <Select
                    disabled={isSubmitting}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>

                    <SelectContent>
                      {dynamicDistricts?.map((district) => (
                        <SelectItem
                          key={district.id}
                          value={String(district.id)}
                        >
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.scope_id && (
                <p className="text-sm text-destructive">
                  {errors.scope_id.message}
                </p>
              )}
            </div>
          )}

          {/* ACADEMY */}

          {scopeType === "academy" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Academy</label>
              </div>

              <Controller
                control={control}
                name="scope_id"
                render={({ field }) => (
                  <Select
                    disabled={isSubmitting}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select academy" />
                    </SelectTrigger>

                    <SelectContent>
                      {dynamicAcademies?.data.items.map((academy) => (
                        <SelectItem key={academy.id} value={academy.id}>
                          {academy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.scope_id && (
                <p className="text-sm text-destructive">
                  {errors.scope_id.message}
                </p>
              )}
            </div>
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isRolesLoading}
          >
            {isSubmitting ? "Sending Invitation..." : "Send Invitation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

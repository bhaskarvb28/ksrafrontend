// CreateAcademyDialog.tsx

import { useState } from "react"

import { useForm } from "react-hook-form"

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

import { useCreateAcademy }
from "../hooks/useCreateAcademy"

export function CreateAcademyDialog() {

  const [open, setOpen] =
    useState(false)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",

      address: "",
    },
  })

  const {
    mutateAsync,
    isPending,
  } = useCreateAcademy()

  // ----------------------------------------------------------
  // Submit
  // ----------------------------------------------------------

  async function onSubmit(
    values: {
      name: string

      address: string
    },
  ) {

    try {

      await mutateAsync(values)

      reset()

      setOpen(false)

    } catch {
      // handled by mutation
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {

        if (isPending) {
          return
        }

        setOpen(nextOpen)
      }}
    >

      <DialogTrigger asChild>
        <Button>
          Create Academy
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md [&>button]:hidden"

        onEscapeKeyDown={(e) => {

          if (isPending) {
            e.preventDefault()
          }
        }}

        onPointerDownOutside={(e) => {

          if (isPending) {
            e.preventDefault()
          }
        }}

        onInteractOutside={(e) => {

          if (isPending) {
            e.preventDefault()
          }
        }}
      >

        <DialogHeader className="space-y-2">

          <DialogTitle>
            Create Academy
          </DialogTitle>

          <DialogDescription>
            Create a new academy in your district.
          </DialogDescription>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 pt-3"
        >

          {/* NAME */}

          <div className="space-y-3">

            <div>
              <label className="block text-sm font-medium">
                Academy Name
              </label>
            </div>

            <Input
              placeholder="Champion Rifle Academy"

              disabled={isPending}

              {...register("name")}
            />
          </div>

          {/* ADDRESS */}

          <div className="space-y-3">

            <div>
              <label className="block text-sm font-medium">
                Address
              </label>
            </div>

            <Input
              placeholder="BTM Layout, Bengaluru"

              disabled={isPending}

              {...register("address")}
            />
          </div>

          {/* SUBMIT */}

          <Button
            type="submit"
            className="w-full"

            disabled={isPending}
          >

            {
              isPending
                ? "Creating Academy..."
                : "Create Academy"
            }

          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
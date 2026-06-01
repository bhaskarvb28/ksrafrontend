import { useSearchParams } from "react-router-dom"

import { ShieldCheck } from "lucide-react"

import { Separator } from "@/shared/components/ui/separator"

import { AcceptInvitationForm } from "../components/AcceptInvitationForm"

import { AcceptInvitationHeader } from "../components/AcceptInvitationHeader"

import { InvitationLoading } from "../components/InvitationLoading"

import { InvitationInvalid } from "../components/InvitationInvalid"

import { useInvite } from "../hooks/useInvite"

export function AcceptInvitationPage() {
  const [searchParams] = useSearchParams()

  const token = searchParams.get("token")

  const { data, isLoading, isError } = useInvite(token)

  if (isLoading) {
    return <InvitationLoading />
  }

  if (isError || !data?.data) {
    return <InvitationInvalid />
  }

  const invitation = data.data

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative overflow-hidden border-b border-border lg:border-r lg:border-b-0">
          {/* Background */}
          <div className="absolute inset-0 bg-[url('/image1.jpg')] bg-cover bg-center" />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/45 to-black/70 dark:from-black/70 dark:via-black/40 dark:to-black/75" />

          {/* Content */}
          <div className="relative sticky top-0 flex h-screen flex-col justify-between p-8 sm:p-12">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-white">
                  KSRA Shooting Academy
                </h1>

                <p className="text-sm text-white">
                  Precision. Discipline. Excellence.
                </p>
              </div>
            </div>
            {/* Hero Content */}
            <div className="max-w-xl space-y-6 py-10">
              <div className="space-y-4">
                <p className="text-sm tracking-[0.3em] text-white uppercase">
                  Invitation Access
                </p>

                <h2 className="text-4xl leading-tight font-bold text-white sm:text-5xl">
                  Welcome to the next level of competitive shooting.
                </h2>

                <p className="max-w-lg text-base leading-7 text-white">
                  Complete your onboarding to access academy training, athlete
                  management, competition systems, and organizational tools.
                </p>
              </div>

              <Separator className="bg-border bg-white" />

              {/* Stats */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-white">12+</p>

                  <p className="text-sm text-white">National Coaches</p>
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold text-white">250+</p>

                  <p className="text-sm text-white">Active Athletes</p>
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold text-white">40+</p>

                  <p className="text-sm text-white">Championship Wins</p>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="text-sm text-white">
              © 2026 KSRA Shooting Academy
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center bg-muted/20 p-6 sm:p-10">
          <div className="w-full max-w-xl">
            <AcceptInvitationHeader
              email={invitation.email}
              role={invitation.role.label}
              organizationName={invitation.organization?.name}
            />

            <AcceptInvitationForm token={token!} />
          </div>
        </div>
      </div>
    </div>
  )
}

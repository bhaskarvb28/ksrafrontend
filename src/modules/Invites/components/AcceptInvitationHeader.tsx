import { Badge } from "@/shared/components/ui/badge"

import { Separator } from "@/shared/components/ui/separator"

interface Props {
  email: string
  role: string
  organizationName?: string
}

export function AcceptInvitationHeader({
  email,
  role,
  organizationName,
}: Props) {
  return (
    <div className="mb-8">
      {/* Heading */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Complete your setup
        </h1>

        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          Your invitation has been verified. Finish setting up your academy
          account to continue.
        </p>
      </div>

      {/* Info Panel */}
      <div className="mt-6 rounded-3xl border border-border bg-card/40 p-5 backdrop-blur-xl">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Email */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Email Address
            </p>

            <p className="break-all text-sm font-medium text-foreground sm:text-base">
              {email}
            </p>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Assigned Role
            </p>

            <div>
              <Badge
                variant="secondary"
                className="rounded-full px-4 py-1 text-xs"
              >
                {role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Organization */}
        {organizationName && (
          <>
            <Separator className="my-5 bg-border" />

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Organization
              </p>

              <p className="text-sm font-medium text-foreground sm:text-base">
                {organizationName}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
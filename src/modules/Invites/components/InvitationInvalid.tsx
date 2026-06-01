import { AlertCircle } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

export function InvitationInvalid() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="mt-5 space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Invalid invitation
            </h1>

            <p className="text-sm text-muted-foreground">
              This invitation link is
              invalid, expired, or has
              already been used.
            </p>
          </div>

          <Button
            className="mt-6 w-full"
            onClick={() =>
              (window.location.href =
                "/login")
            }
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  )
}
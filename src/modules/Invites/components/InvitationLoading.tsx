import { Loader2 } from "lucide-react"

export function InvitationLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-background p-8 shadow-sm">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />

        <div className="space-y-1 text-center">
          <h2 className="font-medium">
            Loading invitation
          </h2>

          <p className="text-sm text-muted-foreground">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  )
}
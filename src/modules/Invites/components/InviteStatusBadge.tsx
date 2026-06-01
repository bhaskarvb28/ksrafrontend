import { Badge } from "@/shared/components/ui/badge"

import type {
  InviteStatus,
} from "../types/invites.types"

interface Props {
  status: InviteStatus
}

export function InviteStatusBadge({
  status,
}: Props) {
  const styles = {
    accepted:
      "bg-green-500/10 text-green-500 border-green-500/20",

    pending:
      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",

    revoked:
      "bg-red-500/10 text-red-500 border-red-500/20",

    expired:
      "bg-muted text-muted-foreground",
  }

  return (
    <Badge
      variant="outline"
      className={styles[status]}
    >
      {status}
    </Badge>
  )
}
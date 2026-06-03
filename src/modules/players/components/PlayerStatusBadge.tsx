import {
  Badge,
} from "@/shared/components/ui/badge"

type Props = {
  status: string
}

export function PlayerStatusBadge({
  status,
}: Props) {

  const normalized =
    status.toLowerCase()

  const styles = {
    active:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",

    pending:
      "bg-amber-500/10 text-amber-600 border-amber-500/20",

    inactive:
      "bg-muted text-muted-foreground",
  }

  return (
    <Badge
      variant="outline"
      className={`
        rounded-full
        border
        capitalize

        ${styles[
          normalized as keyof typeof styles
        ] ?? styles.inactive}
      `}
    >
      {normalized}
    </Badge>
  )
}

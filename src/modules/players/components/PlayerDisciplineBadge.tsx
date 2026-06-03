import {
  Badge,
} from "@/shared/components/ui/badge"

type Props = {
  discipline?: {
    display_name: string
  }
}

export function PlayerDisciplineBadge({
  discipline,
}: Props) {

  if (!discipline) {
    return null
  }

  return (
    <Badge
      variant="secondary"
      className="
        rounded-full
        border-0

        bg-primary/10
        text-primary
      "
    >
      {discipline.display_name}
    </Badge>
  )
}

import {
  Users,
} from "lucide-react"

import {
  Button,
} from "@/shared/components/ui/button"

type Props = {
  onClearFilters?: () => void
}

export function EmptyPlayers({
  onClearFilters,
}: Props) {

  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center

        rounded-2xl
        border
        border-dashed

        bg-muted/20

        px-6
        py-16

        text-center
      "
    >
      <div
        className="
          flex
          size-16
          items-center
          justify-center

          rounded-full
          bg-background
          shadow-sm
        "
      >
        <Users
          className="
            size-8
            text-muted-foreground
          "
        />
      </div>

      <div className="mt-6 space-y-2">

        <h3
          className="
            text-xl
            font-semibold
          "
        >
          No players found
        </h3>

        <p
          className="
            max-w-md
            text-sm
            text-muted-foreground
          "
        >
          No players matched your current
          search or applied filters.
        </p>
      </div>

      {onClearFilters && (
        <Button
          variant="outline"
          className="
            mt-6
            rounded-xl
          "
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      )}
    </div>
  )
}
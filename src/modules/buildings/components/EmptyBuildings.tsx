import {
  Building,
} from "lucide-react"

export function EmptyBuildings() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        py-20
        text-center
      "
    >
      <Building
        className="
          mb-4
          size-10
          text-muted-foreground
        "
      />

      <h3
        className="
          text-lg
          font-semibold
        "
      >
        No buildings found
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-muted-foreground
        "
      >
        Create your first building
        to start managing
        disciplines, events and
        lanes.
      </p>
    </div>
  )
}
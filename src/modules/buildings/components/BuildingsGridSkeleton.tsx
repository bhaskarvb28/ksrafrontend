import {
  Skeleton,
} from "@/shared/components/ui/skeleton"

export function BuildingsGridSkeleton() {
  return (
    <div
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {Array.from({
        length: 6,
      }).map((_, i) => (
        <div
          key={i}
          className="
            rounded-2xl
            border
            p-5
          "
        >
          <Skeleton
            className="
              h-5
              w-40
            "
          />

          <Skeleton
            className="
              mt-4
              h-4
              w-full
            "
          />

          <Skeleton
            className="
              mt-2
              h-4
              w-3/4
            "
          />
        </div>
      ))}
    </div>
  )
}
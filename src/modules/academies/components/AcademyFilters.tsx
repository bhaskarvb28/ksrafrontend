// AcademyFilters.tsx

import { Input }
from "@/shared/components/ui/input"

import type {
  AcademyQueryParams,
} from "../types/academy-query.types"

interface Props {
  filters: AcademyQueryParams

  setFilters: React.Dispatch<
    React.SetStateAction<AcademyQueryParams>
  >
}

export function AcademyFilters({
  filters,
  setFilters,
}: Props) {

  return (
    <div className="flex items-center">

      <Input
        placeholder="Search academies..."
        value={filters.search ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,

            search:
              e.target.value,

            page: 1,
          }))
        }
        className="max-w-sm"
      />
    </div>
  )
}
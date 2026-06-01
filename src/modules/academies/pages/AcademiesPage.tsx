// AcademiesPage.tsx

import { useState }
from "react"

import { AcademiesHeader }
from "../components/AcademiesHeader"

import { AcademyFilters }
from "../components/AcademyFilters"

import { AcademyTable }
from "../components/AcademyTable"

export default function AcademiesPage() {
  const [filters, setFilters] =
    useState({
      page: 1,

      limit: 10,

      search: "",

      state_id: undefined as
        | number
        | undefined,

      district_id:
        undefined as
          | number
          | undefined,

      sort_by: "created_at",

      order: "desc" as
        | "asc"
        | "desc",
    })

  return (
    <div className="space-y-6">
      <AcademiesHeader />

      <AcademyFilters
        filters={filters}
        setFilters={setFilters}
      />

      <AcademyTable
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  )
}
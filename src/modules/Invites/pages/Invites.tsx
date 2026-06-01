import { useState } from "react"

import { InviteFilters } from "../components/InviteFilters"

import { InviteTable } from "../components/InviteTable"

import { InvitesHeader } from "../components/InvitesHeader"

export default function InvitesPage() {
  const [filters, setFilters] =
    useState({
      page: 1,

      limit: 10,

      search: "",

      status: "",

      role: "",

      sort_by: "created_at",

      order: "desc" as
        | "asc"
        | "desc",
    })

  return (
    <div className="space-y-6">
      <InvitesHeader />

      <InviteFilters
        filters={filters}
        setFilters={setFilters}
      />

      <InviteTable
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  )
}
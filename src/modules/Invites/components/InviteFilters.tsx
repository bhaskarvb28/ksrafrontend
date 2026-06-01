import { Input } from "@/shared/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

import type {
  InviteQueryParams,
} from "../types/invite-query.types"

interface Props {
  filters: InviteQueryParams

  setFilters: React.Dispatch<
    React.SetStateAction<InviteQueryParams>
  >
}

export function InviteFilters({
  filters,
  setFilters,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4">

      {/* Search */}

      <Input
        placeholder="Search invites..."
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

      {/* Status Filter */}

      <Select
        value={filters.status}
        onValueChange={(value) =>
          setFilters((prev) => ({
            ...prev,

            status:
              value === "all"
                ? ""
                : value,

            page: 1,
          }))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Statuses
          </SelectItem>

          <SelectItem value="pending">
            Pending
          </SelectItem>

          <SelectItem value="accepted">
            Accepted
          </SelectItem>

          <SelectItem value="revoked">
            Revoked
          </SelectItem>

          <SelectItem value="expired">
            Expired
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Role Filter */}

      <Select
        value={filters.role}
        onValueChange={(value) =>
          setFilters((prev) => ({
            ...prev,

            role:
              value === "all"
                ? ""
                : value,

            page: 1,
          }))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Roles
          </SelectItem>

          <SelectItem value="state_admin">
            State Admin
          </SelectItem>

          <SelectItem value="district_admin">
            District Admin
          </SelectItem>

          <SelectItem value="academy_admin">
            Academy Admin
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By */}

      <Select
        value={filters.sort_by}
        onValueChange={(value) =>
          setFilters((prev) => ({
            ...prev,

            sort_by: value,
          }))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="created_at">
            Created Date
          </SelectItem>

          <SelectItem value="expires_at">
            Expiry Date
          </SelectItem>

          <SelectItem value="email">
            Email
          </SelectItem>

          <SelectItem value="status">
            Status
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Order */}

      <Select
        value={filters.order}
        onValueChange={(
          value: "asc" | "desc"
        ) =>
          setFilters((prev) => ({
            ...prev,

            order: value,
          }))
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="desc">
            Descending
          </SelectItem>

          <SelectItem value="asc">
            Ascending
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"

import { Badge } from "@/shared/components/ui/badge"

import { Button } from "@/shared/components/ui/button"

import { useDebounce } from "@/shared/hooks/useDebounce"

import { useDistrictAdminAcademy } from "../hooks/useDistrictAdminAcademies"

import type { AcademyQueryParams } from "../types/academy-query.types"

import { Delete02Icon } from "@hugeicons/core-free-icons"

import { HugeiconsIcon } from "@hugeicons/react"

interface Props {
  filters: AcademyQueryParams

  setFilters: React.Dispatch<React.SetStateAction<AcademyQueryParams>>
}

export function AcademyTable({ filters, setFilters }: Props) {
  const debouncedSearch = useDebounce(filters.search, 500)

  const queryFilters = {
    ...filters,

    search: debouncedSearch,
  }

  const { data, isLoading, error } = useDistrictAdminAcademy(queryFilters)

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Loading academies...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-destructive">
        Failed to load academies
      </div>
    )
  }

  const academies = data?.data.items ?? []

  const pagination = data?.data

  return (
    <div className="space-y-4 overflow-hidden">
      {/* TABLE */}

      <div className="w-full overflow-hidden rounded-xl border bg-background">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[1100px]">
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="px-6 py-4">Name</TableHead>

                <TableHead className="px-6 py-4">State</TableHead>

                <TableHead className="px-6 py-4">District</TableHead>

                <TableHead className="px-6 py-4">Pincode</TableHead>

                <TableHead className="px-6 py-4">Address</TableHead>

                <TableHead className="px-6 py-4">Status</TableHead>

                <TableHead className="px-6 py-4">Created</TableHead>

                <TableHead className="px-6 py-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {academies.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No academies found
                  </TableCell>
                </TableRow>
              ) : (
                academies.map((academy) => (
                  <TableRow
                    key={academy.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="max-w-[240px] px-6 py-4 font-medium">
                      <div className="truncate">{academy.name}</div>
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {academy.state_name}
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {academy.district_name}
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {academy.pincode}
                    </TableCell>

                    <TableCell className="max-w-[320px] px-6 py-4">
                      <div className="truncate">{academy.address}</div>
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={academy.is_active ? "default" : "secondary"}
                      >
                        {academy.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {new Date(academy.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                          alert(
                            `Delete API not implemented yet for ${academy.name}`
                          )
                        }}
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PAGINATION */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {academies.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {pagination?.total ?? 0}
          </span>{" "}
          academies
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination?.has_previous}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,

                page: (prev.page ?? 1) - 1,
              }))
            }
          >
            Previous
          </Button>

          <div className="text-sm whitespace-nowrap text-muted-foreground">
            Page{" "}
            <span className="font-medium text-foreground">
              {pagination?.page}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {pagination?.total_pages}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={!pagination?.has_next}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,

                page: (prev.page ?? 1) + 1,
              }))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"

import { Button } from "@/shared/components/ui/button"

import { useDebounce } from "@/shared/hooks/useDebounce"

import { InviteStatusBadge } from "./InviteStatusBadge"

import { useInvites } from "../hooks/useInvites"

import type { InviteQueryParams } from "../types/invite-query.types"

import { Trash2 } from "lucide-react"

import { useDeleteInvite } from "../hooks/useDeleteInvite"

interface Props {
  filters: InviteQueryParams

  setFilters: React.Dispatch<React.SetStateAction<InviteQueryParams>>
}

export function InviteTable({ filters, setFilters }: Props) {
  const debouncedSearch = useDebounce(filters.search, 500)

  const queryFilters = {
    ...filters,

    search: debouncedSearch,
  }

  const { data, isLoading, error } = useInvites(queryFilters)

  const deleteInviteMutation = useDeleteInvite()

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Loading invitations...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-destructive">
        Failed to load invitations
      </div>
    )
  }

  const invites = data?.data.items ?? []

  const pagination = data?.data

  return (
    <div className="space-y-4 overflow-hidden">
      {/* TABLE */}

      <div className="w-full overflow-hidden rounded-xl border bg-background">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[950px]">
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="px-6 py-4">Email</TableHead>
                <TableHead className="px-6 py-4">Role</TableHead>
                <TableHead className="px-6 py-4">Level</TableHead>
                <TableHead className="px-6 py-4">Assigned To</TableHead>
                <TableHead className="px-6 py-4">Status</TableHead>
                <TableHead className="px-6 py-4">Invited By</TableHead>
                <TableHead className="px-6 py-4">Created</TableHead>
                <TableHead className="w-[90px] px-3 py-4 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {invites.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No invitations found
                  </TableCell>
                </TableRow>
              ) : (
                invites.map((invite) => (
                  <TableRow
                    key={invite.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="max-w-[260px] px-6 py-4 font-medium">
                      <div className="truncate">{invite.email}</div>
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {invite.role.label}
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap capitalize">
                      {invite.organization?.type ?? "-"}
                    </TableCell>

                    <TableCell className="max-w-[220px] px-6 py-4">
                      <div className="truncate">
                        {invite.organization?.name ?? "-"}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <InviteStatusBadge status={invite.status} />
                    </TableCell>

                    <TableCell className="max-w-[180px] px-6 py-4">
                      <div className="truncate">{invite.created_by.name}</div>
                    </TableCell>

                    <TableCell className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {new Date(invite.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        disabled={deleteInviteMutation.isPending}
                        onClick={() => deleteInviteMutation.mutate(invite.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
          <span className="font-medium text-foreground">{invites.length}</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {pagination?.total ?? 0}
          </span>{" "}
          invitations
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

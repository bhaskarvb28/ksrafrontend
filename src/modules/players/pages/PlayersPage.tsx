import { useEffect, useState } from "react"

import { useSearchParams } from "react-router-dom"

import { RefreshCcw, Search, Users } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

import { Input } from "@/shared/components/ui/input"

import { Card, CardContent } from "@/shared/components/ui/card"

import { useDebounce } from "@/shared/hooks/useDebounce"

import { useAcademyPlayers } from "../hooks/useAcademyPlayers"

import { PlayersGrid } from "../components/PlayersGrid"

import { EmptyPlayers } from "../components/EmptyPlayers"

import { PlayersGridSkeleton } from "../components/PlayersGridSkeleton"

export function PlayersPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get("page") ?? 1)

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  )

  const debouncedSearch = useDebounce(searchInput, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedSearch) {
      params.set("search", debouncedSearch)
    } else {
      params.delete("search")
    }

    params.set("page", "1")

    setSearchParams(params)
  }, [debouncedSearch])

  const { data, isLoading, isError, refetch } = useAcademyPlayers({
    page,
    limit: 12,
    search: debouncedSearch,
  })

  const players = data?.data.items ?? []

  const totalPlayers = data?.data.total ?? 0

  // if (isLoading) {
  //   return (
  //     <div className="space-y-6">
  //       <PageHeader />

  //       <PlayersGridSkeleton />
  //     </div>
  //   )
  // }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader />

        <div className="rounded-2xl border p-10 text-center">
          Failed to load players
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <PageHeader />

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative min-w-[320px]">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="
                Search by name or email...
              "
              className="h-11 rounded-xl pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-xl"
            onClick={() => refetch()}
          >
            <RefreshCcw className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Total Players"
          value={totalPlayers}
          icon={<Users className="size-5" />}
        />
      </div>

      {isLoading ? (
        <PlayersGridSkeleton />
      ) : players.length === 0 ? (
        <EmptyPlayers />
      ) : (
        <PlayersGrid players={players} />
      )}
    </div>
  )
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Players</h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Manage academy players
      </p>
    </div>
  )
}

type StatsCardProps = {
  title: string
  value: number
  icon: React.ReactNode
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="rounded-2xl border-border/50">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-1 text-3xl font-semibold">{value}</h3>
        </div>

        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

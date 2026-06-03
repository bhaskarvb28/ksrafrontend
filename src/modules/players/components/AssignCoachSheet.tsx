import { useState } from "react"

import { Loader2, Search, UserRoundX } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"

import { Button } from "@/shared/components/ui/button"

import { Input } from "@/shared/components/ui/input"

import { Badge } from "@/shared/components/ui/badge"

import type { PlayerProfileResponse } from "../types/player.types"

import { useAcademyCoaches } from "@/modules/academyCoaches/hooks/useAcademyCoaches"

import { CoachCard } from "../components/CoachCard"

import { useRemoveCoach } from "@/modules/academyCoaches/hooks/useRemoveCoach"

type Props = {
  player: PlayerProfileResponse

  playerID: string
}
export function AssignCoachSheet({ player, playerID }: Props) {
  const [search, setSearch] = useState("")

  const currentCoach = player.current_coach

  const primaryDiscipline = player.disciplines.find(
    (discipline) => discipline.is_primary
  )

  const { data, isLoading } = useAcademyCoaches({
    search,
    limit: 20,
  })

  const coaches = data?.data.items ?? []

  const { mutate: removeCoach, isPending: isRemovingCoach } = useRemoveCoach()

  function handleRemoveCoach() {
    removeCoach(playerID)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          {currentCoach ? "Reassign Coach" : "Assign Coach"}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {currentCoach ? "Reassign Coach" : "Assign Coach"}
          </SheetTitle>
        </SheetHeader>

        {/* -------------------------------- */}
        {/* Current Coach */}
        {/* -------------------------------- */}

        {currentCoach && (
          <div className="mt-6 rounded-2xl border bg-muted/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Coach</p>

                <h3 className="mt-1 font-semibold">{currentCoach.full_name}</h3>
              </div>

              <Button
                variant="destructive"
                size="sm"
                disabled={isRemovingCoach}
                onClick={handleRemoveCoach}
              >
                {isRemovingCoach ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <UserRoundX className="mr-2 size-4" />
                    Remove
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* -------------------------------- */}
        {/* Search */}
        {/* -------------------------------- */}

        <div className="relative mt-6">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="
              Search coaches...
            "
            className="pl-10"
          />
        </div>

        {/* -------------------------------- */}
        {/* Discipline */}
        {/* -------------------------------- */}

        {primaryDiscipline && (
          <div className="mt-4">
            <Badge variant="secondary">
              Preferred: {primaryDiscipline.display_name}
            </Badge>
          </div>
        )}

        {/* -------------------------------- */}
        {/* Coaches */}
        {/* -------------------------------- */}

        <div className="mt-6 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-5 animate-spin" />
            </div>
          ) : coaches.length === 0 ? (
            <div className="rounded-2xl border py-10 text-center">
              No coaches found
            </div>
          ) : (
            coaches.map((coach) => (
              <CoachCard
                key={coach.user_id}
                coach={coach}
                playerID={playerID}
                currentCoachID={currentCoach?.user_id}
              />
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

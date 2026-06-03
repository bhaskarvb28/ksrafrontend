import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"

import { Badge } from "@/shared/components/ui/badge"

import { Card, CardContent } from "@/shared/components/ui/card"

import type { PlayerProfileResponse } from "../types/player.types"

import { AssignCoachSheet } from "./AssignCoachSheet"

type Props = {
  player: PlayerProfileResponse

  playerID: string
}

export function PlayerHero({
  player,
  playerID,
}: Props) {

  const primaryDiscipline =
    player.disciplines.find(
      (discipline) =>
        discipline.is_primary
    )

  return (
    <Card className="rounded-3xl">

      <CardContent className="p-8">

        <div
          className="
            flex
            flex-col
            gap-6

            xl:flex-row
            xl:items-start
            xl:justify-between
          "
        >
          <div className="flex gap-5">

            <Avatar className="size-24">
              <AvatarFallback>
                PL
              </AvatarFallback>
            </Avatar>

            <div>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <h1
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Player Profile
                </h1>

                <Badge>
                  {player.status}
                </Badge>
              </div>

              <p
                className="
                  mt-2
                  text-muted-foreground
                "
              >
                {primaryDiscipline
                  ?.display_name ?? "Athlete"}
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >
                <Badge variant="outline">
                  {player.profile_completed
                    ? "Profile Complete"
                    : "Incomplete"}
                </Badge>

                <Badge variant="secondary">
                  {player.academy.state}
                </Badge>

                <Badge variant="secondary">
                  Joined{" "}
                  {new Date(
                    player.joined_at
                  ).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3">

            <AssignCoachSheet
              player={player}
              playerID={playerID}
            />

          </div>
        </div>
      </CardContent>
    </Card>
  )
}

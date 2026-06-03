import { useNavigate } from "react-router-dom"

import { Card, CardContent } from "@/shared/components/ui/card"

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"

import { Badge } from "@/shared/components/ui/badge"

import { ChevronRight } from "lucide-react"

import type { PlayerListItem } from "../types/player.types"

import { PlayerStatusBadge } from "./PlayerStatusBadge"

import { PlayerDisciplineBadge } from "./PlayerDisciplineBadge"

type Props = {
  player: PlayerListItem
}

export function PlayerCard({ player }: Props) {
  const navigate = useNavigate()

  const initials = `${player.first_name[0]}${player.last_name[0]}`

  return (
    <Card
      onClick={() => navigate(`/players/${player.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border-border/50 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-accent/30 hover:shadow-xl"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="size-14 border shadow-sm">
              <AvatarFallback className="text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold">
                {player.first_name} {player.last_name}
              </h3>

              <p className="truncate text-sm text-muted-foreground">
                {player.email}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <PlayerDisciplineBadge discipline={player.primary_discipline} />

                <PlayerStatusBadge status={player.status} />
              </div>
            </div>
          </div>

          <ChevronRight className="size-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
        </div>

        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Coach</p>

            <p className="text-sm font-medium">
              {player.current_coach?.full_name ?? "Unassigned"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Profile</p>

            <Badge
              variant={player.profile_completed ? "outline" : "destructive"}
              className="rounded-full"
            >
              {player.profile_completed ? "Complete" : "Incomplete"}
            </Badge>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          Joined {new Date(player.joined_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}

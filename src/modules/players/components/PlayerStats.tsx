import {
  Card,
  CardContent,
} from "@/shared/components/ui/card"

import type {
  PlayerProfileResponse,
} from "../types/player.types"

type Props = {
  player: PlayerProfileResponse
}

export function PlayerStats({
  player,
}: Props) {

  return (
    <div
      className="
        grid
        gap-4

        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatsCard
        title="Height"
        value={`${player.sports_profile?.height_cm ?? "-"} cm`}
      />

      <StatsCard
        title="Weight"
        value={`${player.sports_profile?.weight_kg ?? "-"} kg`}
      />

      <StatsCard
        title="Dominant Hand"
        value={
          player.sports_profile
            ?.dominant_hand ?? "-"
        }
      />

      <StatsCard
        title="Disciplines"
        value={
          player.disciplines.length.toString()
        }
      />
    </div>
  )
}

type StatsCardProps = {
  title: string

  value: string
}

function StatsCard({
  title,
  value,
}: StatsCardProps) {

  return (
    <Card className="rounded-2xl">

      <CardContent className="p-5">

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          {title}
        </p>

        <h3
          className="
            mt-2
            text-3xl
            font-semibold
          "
        >
          {value}
        </h3>
      </CardContent>
    </Card>
  )
}
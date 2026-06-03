import {
  Badge,
} from "@/shared/components/ui/badge"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

import type {
  PlayerProfileResponse,
} from "../types/player.types"

type Props = {
  player: PlayerProfileResponse
}

export function SportsTab({
  player,
}: Props) {

  const profile =
    player.sports_profile

  return (
    <Card className="rounded-2xl">

      <CardHeader>
        <CardTitle>
          Sports Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="flex flex-wrap gap-2">

          {player.disciplines.map(
            (discipline) => (
              <Badge
                key={discipline.id}
              >
                {
                  discipline.display_name
                }
              </Badge>
            )
          )}
        </div>

        <div
          className="
            grid
            gap-6

            md:grid-cols-2
          "
        >
          <InfoRow
            label="Height"
            value={`${profile.height_cm} cm`}
          />

          <InfoRow
            label="Weight"
            value={`${profile.weight_kg} kg`}
          />

          <InfoRow
            label="Dominant Hand"
            value={
              profile.dominant_hand
            }
          />

          <InfoRow
            label="Tracksuit Size"
            value={
              profile.tracksuit_size
            }
          />

          <InfoRow
            label="Shoe Size"
            value={
              profile.shoe_size
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}

type InfoRowProps = {
  label: string

  value: string
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {

  return (
    <div>
      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {label}
      </p>

      <h4
        className="
          mt-1
          text-lg
          font-semibold
        "
      >
        {value}
      </h4>
    </div>
  )
}
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

export function OverviewTab({
  player,
}: Props) {

  const info =
    player.personal_info

  return (
    <div
      className="
        grid
        gap-6

        xl:grid-cols-2
      "
    >
      <Card className="rounded-2xl">

        <CardHeader>
          <CardTitle>
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <InfoRow
            label="Gender"
            value={info.gender}
          />

          <InfoRow
            label="Nationality"
            value={info.nationality}
          />

          <InfoRow
            label="Date of Birth"
            value={new Date(
              info.date_of_birth
            ).toLocaleDateString()}
          />

          <InfoRow
            label="City"
            value={info.city}
          />
        </CardContent>
      </Card>

      <Card className="rounded-2xl">

        <CardHeader>
          <CardTitle>
            Academy Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <InfoRow
            label="Academy"
            value={
              player.academy.name
            }
          />

          <InfoRow
            label="District"
            value={
              player.academy.district
            }
          />

          <InfoRow
            label="State"
            value={
              player.academy.state
            }
          />

          <InfoRow
            label="Coach"
            value={
              player.current_coach
                ?.full_name ??
              "Unassigned"
            }
          />
        </CardContent>
      </Card>
    </div>
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
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <span
        className="
          text-sm
          text-muted-foreground
        "
      >
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  )
}
import {
  Target,
  Trophy,
  MapPinned,
} from "lucide-react"

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card"

import type {
  BuildingProfileResponse,
} from "../types/building.types"

type Props = {
  building: BuildingProfileResponse
}

export function BuildingStats({
  building,
}: Props) {

  return (
    <div
      className="
        grid
        gap-4
        sm:grid-cols-3
      "
    >
      <StatsCard
        title="Disciplines"
        value={
          building.disciplines.length
        }
        icon={<Target />}
      />

      <StatsCard
        title="Events"
        value={
          building.events.length
        }
        icon={<Trophy />}
      />

      <StatsCard
        title="Lanes"
        value={
          building.lanes.length
        }
        icon={<MapPinned />}
      />
    </div>
  )
}

type StatsCardProps = {
  title: string

  value: number

  icon: React.ReactNode
}

function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent
        className="
          flex
          items-center
          justify-between
          p-5
        "
      >
        <div>
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
              mt-1
              text-3xl
              font-semibold
            "
          >
            {value}
          </h3>
        </div>

        <div
          className="
            flex
            size-12
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
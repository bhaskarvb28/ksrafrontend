import type {
  Building,
} from "../types/building.types"

import {
  BuildingCard,
} from "./BuildingCard"

type Props = {
  buildings: Building[]
}

export function BuildingsGrid({
  buildings,
}: Props) {
  return (
    <div
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {buildings.map(
        building => (
          <BuildingCard
            key={building.id}
            building={building}
          />
        )
      )}
    </div>
  )
}
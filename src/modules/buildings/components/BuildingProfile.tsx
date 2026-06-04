import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"

import type {
  BuildingProfileResponse,
} from "../types/building.types"

import {
  BuildingHero,
} from "./BuildingHero"

import {
  BuildingStats,
} from "./BuildingStats"

import {
  DisciplinesTab,
} from "./DisciplinesTab"

import {
  EventsTab,
} from "./EventsTab"

import {
  LanesTab,
} from "./LanesTab"

type Props = {
  building: BuildingProfileResponse

  buildingID: string
}

export function BuildingProfile({
  building,
  buildingID,
}: Props) {

  return (
    <div className="space-y-8">

      <BuildingHero
        building={building}
        buildingID={buildingID}
      />

      <BuildingStats
        building={building}
      />

      <Tabs
        defaultValue="disciplines"
        className="space-y-6"
      >
        <TabsList
          className="
            h-auto
            rounded-2xl
            p-1
          "
        >
          <TabsTrigger
            value="disciplines"
          >
            Disciplines
          </TabsTrigger>

          <TabsTrigger
            value="events"
          >
            Events
          </TabsTrigger>

          <TabsTrigger
            value="lanes"
          >
            Lanes
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="disciplines"
        >
          <DisciplinesTab
            building={building}
          />
        </TabsContent>

        <TabsContent
          value="events"
        >
          <EventsTab
            building={building}
          />
        </TabsContent>

        <TabsContent
          value="lanes"
        >
          <LanesTab
            building={building}
          />
        </TabsContent>

      </Tabs>
    </div>
  )
}
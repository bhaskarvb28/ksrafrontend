import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"

import type { PlayerProfileResponse } from "../types/player.types"

import { PlayerHero } from "./PlayerHero"

import { PlayerStats } from "./PlayerStats"

import { OverviewTab } from "./OverviewTab"

import { SportsTab } from "./SportsTab"

import { PassportTab } from "./PassportTab"

import { GuardiansTab } from "./GuardiansTab"

type Props = {
  player: PlayerProfileResponse

  playerID: string
}

export function PlayerProfile({
  player,
  playerID,
}: Props) {

  return (
    <div className="space-y-8">

      <PlayerHero
        player={player}
        playerID={playerID}
      />

      <PlayerStats player={player} />

      <Tabs
        defaultValue="overview"
        className="space-y-6"
      >
        <TabsList
          className="
            h-auto
            rounded-2xl
            p-1
          "
        >
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>

          <TabsTrigger value="sports">
            Sports
          </TabsTrigger>

          <TabsTrigger value="passport">
            Passport
          </TabsTrigger>

          <TabsTrigger value="guardians">
            Guardians
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab player={player} />
        </TabsContent>

        <TabsContent value="sports">
          <SportsTab player={player} />
        </TabsContent>

        <TabsContent value="passport">
          <PassportTab player={player} />
        </TabsContent>

        <TabsContent value="guardians">
          <GuardiansTab player={player} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

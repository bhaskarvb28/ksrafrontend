import type {
  PlayerListItem,
} from "../types/player.types"

import {
  PlayerCard,
} from "./PlayerCard"

type Props = {
  players: PlayerListItem[]
}

export function PlayersGrid({
  players,
}: Props) {

  return (
    <div
      className="
        grid
        gap-5

        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
        />
      ))}
    </div>
  )
}
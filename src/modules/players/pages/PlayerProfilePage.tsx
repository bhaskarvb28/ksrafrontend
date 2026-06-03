import {
  useParams,
} from "react-router-dom"

import {
  PlayerProfile,
} from "../components/PlayerProfile"

import {
  useAcademyPlayer,
} from "../hooks/useAcademyPlayer"

import {
  PlayersGridSkeleton,
} from "../components/PlayersGridSkeleton"

export function PlayerProfilePage() {

  const { playerID } = useParams()

  const {
    data,
    isLoading,
    isError,
  } = useAcademyPlayer(playerID)

  if (isLoading) {

    return (
      <PlayersGridSkeleton />
    )
  }

  if (
    isError ||
    !data?.data
  ) {

    return (
      <div
        className="
          rounded-2xl
          border
          p-10
          text-center
        "
      >
        Failed to load player
      </div>
    )
  }

  return (
    <PlayerProfile
      player={data.data}
      playerID={playerID!}
    />
  )
}
import {
  useParams,
} from "react-router-dom"

import {
  BuildingProfile,
} from "../components/BuildingProfile"

import {
  useBuilding,
} from "../hooks/useBuilding"

import {
  BuildingsGridSkeleton,
} from "../components/BuildingsGridSkeleton"

export function BuildingProfilePage() {

  const {
    buildingID,
  } = useParams()

  const {
    data,
    isLoading,
    isError,
  } = useBuilding(
    buildingID
  )

  if (isLoading) {

    return (
      <BuildingsGridSkeleton />
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
        Failed to load building
      </div>
    )
  }

  return (
    <BuildingProfile
      building={data.data}
      buildingID={buildingID!}
    />
  )
}
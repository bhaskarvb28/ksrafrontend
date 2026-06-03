import {
  Loader2,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/shared/components/ui/avatar"

import {
  Badge,
} from "@/shared/components/ui/badge"

import {
  Button,
} from "@/shared/components/ui/button"

import type {
  AcademyCoachListItem,
} from "@/modules/academyCoaches/types/academyCoach.types"

import {
  useAssignCoach,
} from "@/modules/academyCoaches/hooks/useAssignCoach"

type Props = {
  coach: AcademyCoachListItem

  playerID: string

  currentCoachID?: string
}

export function CoachCard({
  coach,
  playerID,
  currentCoachID,
}: Props) {

  const {
    mutate,
    isPending,
  } = useAssignCoach()

  const isCurrentCoach =
    currentCoachID ===
    coach.user_id

  function handleAssign() {

    mutate({
      playerID,
      coachUserID:
        coach.user_id,
    })
  }

  return (
    <div
      className="
        rounded-2xl
        border
        p-4

        transition-colors

        hover:bg-accent/40
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="flex gap-4">

          <Avatar className="size-12">

            <AvatarFallback>
              {
                coach.full_name[0]
              }
            </AvatarFallback>

          </Avatar>

          <div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <h3
                className="
                  font-semibold
                "
              >
                {coach.full_name}
              </h3>

              {isCurrentCoach && (
                <Badge>
                  Current
                </Badge>
              )}
            </div>

            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              {coach.coach_code}
            </p>

            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-2
              "
            >
              {coach.disciplines.map(
                (
                  discipline
                ) => (
                  <Badge
                    key={
                      discipline.id
                    }
                    variant="secondary"
                  >
                    {
                      discipline.display_name
                    }
                  </Badge>
                )
              )}
            </div>

            <p
              className="
                mt-3
                text-xs
                text-muted-foreground
              "
            >
              {
                coach.assigned_players_count
              }
              {" "}
              assigned players
            </p>
          </div>
        </div>

        <Button
          size="sm"
          disabled={
            isPending ||
            isCurrentCoach
          }
          onClick={handleAssign}
        >
          {isPending ? (

            <Loader2
              className="
                size-4
                animate-spin
              "
            />

          ) : isCurrentCoach ? (

            "Assigned"

          ) : currentCoachID ? (

            "Reassign"

          ) : (

            "Assign"
          )}
        </Button>
      </div>
    </div>
  )
}
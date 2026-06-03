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

export function PassportTab({
  player,
}: Props) {

  const passport =
    player.passport

  if (!passport) {

    return (
      <Card className="rounded-2xl">

        <CardContent
          className="
            flex
            items-center
            justify-center
            py-16
          "
        >
          <p className="text-muted-foreground">
            No passport information added
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl">

      <CardHeader>
        <CardTitle>
          Passport Information
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div
          className="
            grid
            gap-6

            md:grid-cols-2
          "
        >
          <InfoRow
            label="Passport Number"
            value={
              passport.passport_number
            }
          />

          <InfoRow
            label="Issuing Authority"
            value={
              passport.passport_issuing_authority
            }
          />

          <InfoRow
            label="Place Of Issue"
            value={
              passport.passport_place_of_issue
            }
          />

          <InfoRow
            label="Issue Date"
            value={new Date(
              passport.passport_issue_date
            ).toLocaleDateString()}
          />

          <InfoRow
            label="Expiry Date"
            value={new Date(
              passport.passport_expiry_date
            ).toLocaleDateString()}
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
          break-words
        "
      >
        {value}
      </h4>
    </div>
  )
}
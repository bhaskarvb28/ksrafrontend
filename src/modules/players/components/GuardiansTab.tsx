import {
  Badge,
} from "@/shared/components/ui/badge"

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card"

import type {
  PlayerProfileResponse,
} from "../types/player.types"

type Props = {
  player: PlayerProfileResponse
}

export function GuardiansTab({
  player,
}: Props) {

  if (
    !player.guardians ||
    player.guardians.length === 0
  ) {

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
            No guardians added
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div
      className="
        grid
        gap-6

        lg:grid-cols-2
      "
    >
      {player.guardians.map(
        (guardian) => (

          <Card
            key={guardian.id}
            className="
              rounded-2xl
            "
          >
            <CardContent className="p-6">

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div>

                  <h3
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    {guardian.full_name}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-muted-foreground
                    "
                  >
                    {
                      guardian.relationship
                    }
                  </p>
                </div>

                {guardian.is_primary && (

                  <Badge>
                    Primary
                  </Badge>
                )}
              </div>

              <div
                className="
                  mt-6
                  space-y-4
                "
              >
                <InfoRow
                  label="Contact Number"
                  value={
                    guardian.contact_number
                  }
                />

                <InfoRow
                  label="Alternative Contact"
                  value={
                    guardian.alternative_contact ||
                    "-"
                  }
                />

                <InfoRow
                  label="Parental Consent"
                  value={
                    guardian.parental_consent
                      ? "Granted"
                      : "Not Granted"
                  }
                />
              </div>
            </CardContent>
          </Card>
        )
      )}
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
        gap-6
      "
    >
      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {label}
      </p>

      <p
        className="
          text-sm
          font-medium
          text-right
        "
      >
        {value}
      </p>
    </div>
  )
}
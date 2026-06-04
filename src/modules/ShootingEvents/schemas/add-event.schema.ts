import {
  z,
} from "zod"

export const addEventSchema =
  z.object({
    shooting_event_id:
      z.coerce
        .number()
        .min(1, {
          message:
            "Event is required",
        }),
  })

export type AddEventSchema =
  z.infer<
    typeof addEventSchema
  >
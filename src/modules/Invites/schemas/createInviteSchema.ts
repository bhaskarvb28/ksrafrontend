import { z } from "zod"

export const createInviteSchema =
  z.object({
    name: z
      .string()
      .min(2, {
        message:
          "Name is required",
      }),

    email: z.email({
      message:
        "Please enter a valid email",
    }),

    role: z.enum([
      "state_admin",
      "district_admin",
      "district_coach",
      "academy_admin",
      "academy_coach",
      "player",
    ]),

    scope_type: z.enum([
      "state",
      "district",
      "academy",
    ]),

    scope_id: z
      .string()
      .min(1, {
        message:
          "Please select scope",
      }),
  })

export type CreateInviteSchema =
  z.infer<
    typeof createInviteSchema
  >
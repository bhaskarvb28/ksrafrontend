import { z } from "zod"

export const stateAdminProfileSchema =
  z.object({
    dpdp_consent:
      z.boolean(),
  }).refine(
    (data) =>
      data.dpdp_consent,
    {
      path: [
        "dpdp_consent",
      ],

      message:
        "You must accept DPDP consent",
    }
  )

export type StateAdminProfileSchema =
  z.infer<
    typeof stateAdminProfileSchema
  >
import { z } from "zod"

export const districtAdminProfileSchema =
  z
    .object({
      dpdp_consent:
        z.boolean(),
    })
    .refine(
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

export type DistrictAdminProfileSchema =
  z.infer<
    typeof districtAdminProfileSchema
  >
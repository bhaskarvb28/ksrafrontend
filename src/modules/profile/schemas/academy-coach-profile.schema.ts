import { z } from "zod"

export const academyCoachProfileSchema =
  z
    .object({
      dpdp_consent:
        z.boolean(),

      coach_code:
        z
          .string()
          .min(
            1,
            "Coach code is required"
          ),

      coaching_certificate_proof:
        z
          .string()
          .url(
            "Must be a valid URL"
          ),

      discipline_ids:
        z.array(z.number()),
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

export type AcademyCoachProfileSchema =
  z.infer<
    typeof academyCoachProfileSchema
  >
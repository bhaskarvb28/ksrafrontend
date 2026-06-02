import { z } from "zod"

export const academyAdminProfileSchema =
  z
    .object({
      dpdp_consent: z.boolean(),

      gstin: z
        .string()
        .min(1, "GSTIN is required"),

      registration_proof: z
        .string()
        .url("Must be a valid URL"),
    })
    .refine(
      (data) => data.dpdp_consent,
      {
        path: ["dpdp_consent"],

        message:
          "You must accept DPDP consent",
      }
    )

export type AcademyAdminProfileSchema =
  z.infer<
    typeof academyAdminProfileSchema
  >
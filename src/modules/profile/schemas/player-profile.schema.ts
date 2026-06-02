import { z } from "zod"

export const playerProfileSchema =
  z
    .object({
      dpdp_consent:
        z.boolean(),

      personal_info:
        z.object({
          date_of_birth:
            z.string(),

          gender: z.enum([
            "male",
            "female",
            "other",
          ]),

          nationality:
            z.string(),

          place_of_birth:
            z.string().optional(),

          city:
            z.string().optional(),

          residential_address:
            z.string().optional(),

          pincode_id:
            z.number(),

          education:
            z.string().optional(),

          institution_name:
            z.string().optional(),

          occupation:
            z.string().optional(),

          temporary_sport_id:
            z.string().optional(),
        }),

      sports_profile:
        z.object({
          unit_of_representation:
            z.string().optional(),

          dominant_hand:
            z.enum([
              "left",
              "right",
              "ambidextrous",
            ]),

          height_cm:
            z.number(),

          weight_kg:
            z.number(),

          shoe_size:
            z.string().optional(),

          tracksuit_size:
            z.string().optional(),
        }),

      disciplines:
        z
          .array(
            z.object({
              discipline_id:
                z.number(),

              is_primary:
                z.boolean(),
            })
          )
          .min(1),

      passport:
        z.object({
          passport_number:
            z.string().optional(),

          passport_issue_date:
            z.string().optional(),

          passport_expiry_date:
            z.string().optional(),

          passport_issuing_authority:
            z.string().optional(),

          passport_place_of_issue:
            z.string().optional(),
        }),

      guardians:
        z
          .array(
            z.object({
              full_name:
                z.string(),

              relationship:
                z.string().optional(),

              contact_number:
                z.string(),

              alternative_contact:
                z.string().optional(),

              parental_consent:
                z.boolean(),

              is_primary:
                z.boolean(),
            })
          )
          .min(1),
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

export type PlayerProfileSchema =
  z.infer<
    typeof playerProfileSchema
  >
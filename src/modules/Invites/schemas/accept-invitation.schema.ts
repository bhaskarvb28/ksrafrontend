import { z } from "zod"

export const acceptInvitationSchema =
  z
    .object({
      first_name: z
        .string()
        .min(1, {
          message:
            "First name is required",
        }),

      last_name: z
        .string()
        .min(1, {
          message:
            "Last name is required",
        }),

      contact_number: z
        .string()
        .min(10, {
          message:
            "Please enter a valid contact number",
        }),

      password: z
        .string()
        .min(8, {
          message:
            "Password must be at least 8 characters",
        }),

      confirm_password:
        z.string(),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirm_password,
      {
        path: [
          "confirm_password",
        ],

        message:
          "Passwords do not match",
      }
    )

export type AcceptInvitationSchema =
  z.infer<
    typeof acceptInvitationSchema
  >
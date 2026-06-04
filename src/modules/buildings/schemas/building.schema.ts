import { z } from "zod"

export const createBuildingSchema =
  z.object({
    building_name: z
      .string()
      .min(2, {
        message:
          "Building name is required",
      })
      .max(100),
  })

export type CreateBuildingSchema =
  z.infer<
    typeof createBuildingSchema
  >

export const updateBuildingSchema =
  z.object({
    building_name: z
      .string()
      .min(2)
      .max(100),

    is_active:
      z.boolean(),
  })

export type UpdateBuildingSchema =
  z.infer<
    typeof updateBuildingSchema
  >
export const ROLE_CODES = {
  SUPER_ADMIN: "super_admin",

  STATE_ADMIN: "state_admin",

  DISTRICT_ADMIN: "district_admin",

  DISTRICT_COACH: "district_coach",

  ACADEMY_ADMIN: "academy_admin",

  ACADEMY_COACH: "academy_coach",

  PLAYER: "player",
} as const

export type RoleCode =
  (typeof ROLE_CODES)[keyof typeof ROLE_CODES]
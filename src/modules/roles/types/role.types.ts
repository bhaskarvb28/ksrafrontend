export type ScopeType =
  | "state"
  | "district"
  | "academy"

export interface Role {
  id: number

  code: string

  display_name: string

  scope_type: ScopeType
}

export interface RolesResponse {
  success: boolean

  message: string

  data: {
    roles: Role[]
  }
}
import type { RoleCode } from "./role.types"

export interface UserRole {
  id: number

  code: RoleCode

  display_name: string
}

export interface User {
  id: string

  first_name: string

  last_name: string

  email: string

  contact_number: string

  role: UserRole
}

export interface LoginPayload {
  email: string

  password: string
}

export interface LoginResponse {
  success: boolean

  message: string

  data: {
    token: string

    user: User
  }
}
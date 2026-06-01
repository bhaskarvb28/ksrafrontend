export type InviteStatus =
  | "pending"
  | "accepted"
  | "expired"
  | "revoked"

export interface InviteRole {
  key: string
  label: string
}

export interface InviteOrganization {
  type: string
  id: string
  name: string
}

export interface InviteCreatedBy {
  id: string
  name: string
}

export interface Invite {
  id: number

  name: string

  email: string

  role: InviteRole

  organization?: InviteOrganization

  status: InviteStatus

  created_by: InviteCreatedBy

  expires_at: string

  created_at: string
}

export interface InvitesResponse {
  success: boolean

  message: string

  data: {
    items: Invite[]

    page: number
    limit: number
    total: number
    total_pages: number

    has_next: boolean
    has_previous: boolean
  }
}

export interface CreateInvitePayload {
  name: string

  email: string

  role: string

  scope_type:
    | "state"
    | "district"
    | "academy"

  scope_id: string
}

export interface CreateInviteResponse {
  success: boolean

  message: string
}
export interface AcceptInvitationResponse {
  success: boolean

  message: string

  data: {
    email: string

    role: {
      key: string
      label: string
    }

    organization?: {
      type: string
      id: string
      name: string
    }
  }
}

export interface AcceptInvitationPayload {
  token: string

  first_name: string

  last_name: string

  password: string

  contact_number: string
}
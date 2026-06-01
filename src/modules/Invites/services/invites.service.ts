import { api } from "@/shared/lib/api"

import type {
  InvitesResponse,
  Invite,
  CreateInvitePayload,
} from "../types/invites.types"

import type { InviteQueryParams } from "../types/invite-query.types"

import type {
  AcceptInvitationPayload,
  AcceptInvitationResponse,
} from "../types/accept-invitation.types"

interface CreateInviteResponse {
  success: boolean

  message: string

  data: Invite
}

export class InviteService {
  // ----------------------------------------------------------
  // Get Invites
  // ----------------------------------------------------------

  static async getInvites(params: InviteQueryParams = {}) {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value))
      }
    })

    return api<InvitesResponse>(`/invitations?${searchParams.toString()}`)
  }

  // ----------------------------------------------------------
  // Get Single Invite
  // ----------------------------------------------------------

  static async getInvite(token: string) {
    return api<AcceptInvitationResponse>(`/invitations/token/${token}`)
  }

  // ----------------------------------------------------------
  // Create Invite
  // ----------------------------------------------------------

  static async createInvite(payload: CreateInvitePayload) {
    return api<CreateInviteResponse>("/invitations/invite", {
      method: "POST",

      body: JSON.stringify(payload),
    })
  }

  // ----------------------------------------------------------
  // Accept Invitation
  // ----------------------------------------------------------

  static async acceptInvitation(payload: AcceptInvitationPayload) {
    return api("/invitations/accept", {
      method: "POST",

      body: JSON.stringify(payload),
    })
  }

  // ----------------------------------------------------------
  // Delete Invite
  // ----------------------------------------------------------

  static async deleteInvite(id: string) {
    return api(`/invitations/${id}`, {
      method: "DELETE",
    })
  }
}

import {CreateInviteDialog} from "../components/CreateInviteDialogue"

export function InvitesHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Invitations</h1>

        <p className="text-muted-foreground">Manage workspace invitations.</p>
      </div>

      <CreateInviteDialog />
    </div>
  )
}

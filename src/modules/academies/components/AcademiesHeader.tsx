// AcademiesHeader.tsx

import { CreateAcademyDialog }
from "./CreateAcademyDialog"

export function AcademiesHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">
          Academies
        </h1>

        <p className="text-muted-foreground">
          Manage academies in your district.
        </p>
      </div>

      <CreateAcademyDialog />
    </div>
  )
}
import {
  Trash2,
} from "lucide-react"

import {
  Button,
} from "@/shared/components/ui/button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"

import {
  useDeleteBuilding,
} from "../hooks/useDeleteBuilding"

type Props = {
  buildingID: string
}

export function DeleteBuildingDialog({
  buildingID,
}: Props) {

  const mutation =
    useDeleteBuilding()

  return (
    <AlertDialog>

      <AlertDialogTrigger
        asChild
      >
        <Button
          size="icon"
          variant="ghost"
        >
          <Trash2
            className="
              size-4
              text-destructive
            "
          />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Building
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
            The building will no longer
            appear in the academy.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              mutation.isPending
            }
            onClick={() =>
              mutation.mutate(
                buildingID,
              )
            }
          >
            {mutation.isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  )
}
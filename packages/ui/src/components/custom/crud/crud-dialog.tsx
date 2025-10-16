import { Button } from "@byte24/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@byte24/ui/components/dialog";
import { CrudForm } from "./crud-form";
import { Field } from "./types";

interface CrudDialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: Field<T>[];
  onSubmit: (data: any) => Promise<void>;
  initialData?: Record<string, any>;
  isLoading?: boolean;
  mode: "add" | "edit" | "delete";
}

export function CrudDialog<T>({
  open,
  onOpenChange,
  title,
  fields,
  onSubmit,
  initialData,
  isLoading,
  mode,
}: CrudDialogProps<T>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit"
              ? `${title} bewerken`
              : mode === "delete"
                ? `Verwijder ${title}`
                : `${title} toevoegen`}
          </DialogTitle>
        </DialogHeader>

        {["add", "edit"]?.includes(mode) ? (
          <CrudForm
            fields={fields}
            onSubmit={onSubmit}
            initialData={initialData}
            isLoading={isLoading}
          />
        ) : (
          <>
            <p>Weet je zeker dat je het geselecteerde item wilt verwijderen?</p>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={onSubmit}
                disabled={isLoading}
                variant={"destructive"}
              >
                {"Verwijder"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

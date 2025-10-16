import { ISuccessResponse } from "@byte24/ui";
import { Button } from "@byte24/ui/components/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CrudDialog } from "./crud-dialog";
import { CrudTable } from "./crud-table";
import { BaseData, Field } from "./types";

interface CrudContainerProps<T> {
  title: string;
  fields: Field<T>[];
  data: T[];
  addRoute?: (values: any) => Promise<ISuccessResponse>;
  editRoute?: (values: any) => Promise<ISuccessResponse>;
  deleteRoute?: (values: { id: number }) => Promise<ISuccessResponse>;
  onRefresh: () => Promise<void>;
}

export function CrudContainer<T extends BaseData>({
  title,
  fields,
  data,
  addRoute,
  editRoute,
  deleteRoute,
  onRefresh,
}: CrudContainerProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "delete">("add");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData?: any) => {
    setIsLoading(true);
    try {
      switch (mode) {
        case "edit":
          await editRoute?.({
            ...formData,
            id: selectedItem?.id,
          });
          break;
        case "delete":
          await deleteRoute?.({ id: selectedItem?.id });
          break;
        default:
          await addRoute?.(formData);
          break;
      }

      await onRefresh();
      setIsDialogOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setMode("edit");
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number | string) => {
    setMode("delete");
    setSelectedItem({ id });
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-bold text-2xl">{title}</h1>
        {addRoute && (
          <Button
            onClick={() => {
              setMode("add");
              setIsDialogOpen(true);
              setSelectedItem(null);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nieuwe toevoegen
          </Button>
        )}
      </div>

      <CrudTable
        data={data}
        fields={fields}
        onEdit={editRoute ? handleEdit : undefined}
        onDelete={deleteRoute ? handleDelete : undefined}
      />

      <CrudDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={title}
        fields={fields}
        onSubmit={handleSubmit}
        initialData={selectedItem}
        isLoading={isLoading}
        mode={mode}
      />
    </>
  );
}

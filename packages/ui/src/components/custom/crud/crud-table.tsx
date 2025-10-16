import { Button } from "@byte24/ui/components/button";
import { Pencil, SquareCheck, Trash2 } from "lucide-react";

import { cn } from "@byte24/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@byte24/ui/components/table";
import { BaseData, Field } from "./types";

interface CrudTableProps<T extends BaseData> {
  data: T[];
  fields: Field<T>[];
  onEdit?: (item: any) => void;
  onDelete?: (id: string | number) => void;
}

export function CrudTable<T extends BaseData>({
  data,
  fields,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table className="w-full bg-card">
          <TableHeader className="bg-slate-600">
            <TableRow className="border-b bg-secondary">
              {fields.map((field) => (
                <TableHead
                  key={field.key}
                  className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  {field.label}
                </TableHead>
              ))}
              <TableHead className="h-10 w-40 px-4 text-left align-middle font-medium text-muted-foreground">
                Acties
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.id || index}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {fields.map((field) => (
                  <TableCell key={field.key} className="p-4 align-middle">
                    {field.type === "color" ? (
                      <div
                        className="h-6 w-6 rounded-md border border-gray-300"
                        style={{
                          backgroundColor: item[field.key] || undefined,
                        }}
                      />
                    ) : field.type === "select" ? (
                      field.options?.find(
                        (option) =>
                          option.value.toString() ===
                          item[field.key]?.toString()
                      )?.label || item[field.key]
                    ) : field.accessorFn ? (
                      field.accessorFn(item)
                    ) : (
                      item[field.key]
                    )}
                    {field.type === "checkbox" &&
                      (item[field.key] ? (
                        <SquareCheck className="text-green-500" />
                      ) : null)}
                    {field.type !== "select" &&
                      field.type !== "color" &&
                      field.type !== "checkbox" &&
                      item?.isSystemRequired && (
                        <span className="ml-2 text-xs opacity-50">
                          (Systeem vereist)
                        </span>
                      )}
                  </TableCell>
                ))}
                <TableCell className="p-4 text-left align-middle">
                  {onEdit && (
                    <Button
                      disabled={item?.isSystemRequired}
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="mr-2"
                    >
                      <Pencil
                        className={cn(
                          "h-4 w-4",
                          item?.isSystemRequired &&
                            "cursor-not-allowed opacity-30"
                        )}
                      />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      disabled={item?.isSystemRequired}
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash2
                        className={cn(
                          "h-4 w-4",
                          item?.isSystemRequired &&
                            "cursor-not-allowed opacity-30"
                        )}
                      />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

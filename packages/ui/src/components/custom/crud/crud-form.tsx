import { zodResolver } from "@hookform/resolvers/zod";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Checkbox, FormDescription } from "@byte24/ui";
import { Button } from "@byte24/ui/components/button";
import { Input } from "@byte24/ui/components/input";
import { Label } from "@byte24/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@byte24/ui/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@byte24/ui/components/select";
import { Field } from "./types";

interface CrudFormProps<T> {
  fields: Field<T>[];
  onSubmit: (data: any) => Promise<void>;
  initialData?: Record<string, any>;
  isLoading?: boolean;
}

export function CrudForm<T>({
  fields,
  onSubmit,
  initialData,
  isLoading,
}: CrudFormProps<T>) {
  // Dynamically create Zod schema based on fields
  const schema = z.object(
    fields.reduce((acc, field) => {
      if (field.type === "checkbox") {
        return { ...acc, [field.key]: z.boolean().optional() };
      }

      let fieldSchema = z.string();
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.label} is verplicht`);
      } else {
        //@ts-ignore
        fieldSchema = fieldSchema.optional();
      }
      return { ...acc, [field.key]: fieldSchema };
    }, {})
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <div>
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">
                {field.description}
              </p>
            )}
          </div>
          {field.type === "color" ? (
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  style={{
                    backgroundColor: form.watch(field.key) || undefined,
                    width: "30px",
                    height: "30px",
                  }}
                  className="!flex border border-gray-500"
                ></Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit space-y-4">
                <HexColorPicker
                  color={form.watch(field.key) || undefined}
                  onChange={(color: string) => form.setValue(field.key, color)}
                />
                <Input
                  className="w-[200px]"
                  value={form.watch(field.key) || ""}
                  onChange={(e) => form.setValue(field.key, e.target.value)}
                  disabled={field?.disabled}
                />
              </PopoverContent>
            </Popover>
          ) : field.type === "select" ? (
            <Select
              value={form.watch(field.key)}
              onValueChange={(value) => form.setValue(field.key, value)}
              disabled={field?.disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem
                    key={option.value.toString()}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === "checkbox" ? (
            <>
              <Checkbox
                id={field.key}
                className="block"
                checked={form.watch(field.key)}
                onCheckedChange={(checked) => form.setValue(field.key, checked)}
              />
            </>
          ) : (
            //@ts-ignore
            <Input
              id={field.key}
              type={field.type}
              step={field.type === "number" ? (field?.step ?? 0) : undefined}
              {...form.register(field.key)}
              value={form.watch(field.key)}
              onChange={(e) => form.setValue(field.key, e.target.value)}
              placeholder={`${field.label}...`}
              disabled={field?.disabled}
            />
          )}
          {form.formState.errors[field.key] && (
            <p className="text-red-500 text-sm">
              {form.formState.errors[field.key]?.message as string}
            </p>
          )}
        </div>
      ))}
      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Besparing..." : initialData ? "Bewerken" : "Toevoegen"}
        </Button>
      </div>
    </form>
  );
}

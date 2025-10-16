"use client";

import { Button } from "@byte24/ui/components/button";
import { DatePicker } from "@byte24/ui/components/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@byte24/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@byte24/ui/components/form";
import { Input } from "@byte24/ui/components/input";
import { baseFileSystemItemSchema } from "@dashboard/components/file-system/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, XCircle } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateCompanyContract } from "../hooks";
import { baseCompanyContractSchema } from "../schemas";
import { FullCompanyContract } from "../types";

interface UpdateCompanyContractModalProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  item: FullCompanyContract;
}

const formSchema = baseFileSystemItemSchema.merge(baseCompanyContractSchema);

type FormValues = z.infer<typeof formSchema>;

export const UpdateCompanyContractModal = ({
  open,
  onOpenChange,
  item,
}: UpdateCompanyContractModalProps) => {
  const { mutateAsync: updateCompanyContract } = useUpdateCompanyContract(
    item?.companyId,
    item?.id
  );

  const defaultValues = useMemo(() => {
    return {
      expireDate: item.expireDate ? new Date(item.expireDate) : new Date(),
      name: item?.fileSystemItem?.name,
    };
  }, [item]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateCompanyContract(
        {
          ...values,
        },
        {
          onSuccess: ({ data }) => {
            onOpenChange(false);
          },
        }
      );
    } catch (error) {}
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] max-w-4xl overflow-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Contract wijzigen</DialogTitle>
          <DialogDescription>Wijzig het contract.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 lg:grid-cols-1"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel required>Naam</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Naam..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expireDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel required>Verloopdatum</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                      placeholder="Verloopdatum..."
                      className="w-full"
                      disablePastDates={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-10 flex flex-col items-center justify-end gap-4 lg:flex-row">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  size={"sm"}
                  disabled={form.formState.isSubmitting}
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Sluiten
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size={"sm"}
                disabled={form.formState.isSubmitting}
              >
                Wijzigen <Edit className="ml-2 h-5 w-5" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

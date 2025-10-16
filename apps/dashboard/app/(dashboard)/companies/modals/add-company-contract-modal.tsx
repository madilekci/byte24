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
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "@repo/ui/components/file-dropzone";
import { Edit, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUploadCompanyContract } from "../hooks";
import { baseCompanyContractSchema } from "../schemas";

interface AddCompanyContractModalProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  companyId: number;
}

const formSchema = baseCompanyContractSchema;

type FormValues = z.infer<typeof formSchema>;

export const AddCompanyContractModal = ({
  open,
  onOpenChange,
  companyId,
}: AddCompanyContractModalProps) => {
  const { mutateAsync: addCompanyContract, isPending } =
    useUploadCompanyContract(companyId);

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addCompanyContract(
        {
          file: files?.[0],
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
          <DialogTitle>Contract toevoegen</DialogTitle>
          <DialogDescription>Voeg een contract toe.</DialogDescription>
        </DialogHeader>
        <Dropzone
          files={files}
          setFiles={setFiles}
          multiple={false}
          maxFiles={1}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 lg:grid-cols-1"
          >
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
                Toevoegen <Edit className="ml-2 h-5 w-5" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

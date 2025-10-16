"use client";

import { Button } from "@byte24/ui/components/button";
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
import { Icons } from "@byte24/ui/components/icons";
import { Input } from "@byte24/ui/components/input";
import { Switch } from "@byte24/ui/components/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactPersonSchema } from "@ui/src/utility/form-schemas";
import { PlusCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddContactPerson } from "../hooks";

interface AddContactPersonModalProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  companyId: number;
}

const formSchema = contactPersonSchema;

type FormValues = z.infer<typeof formSchema>;

const AddContactPersonModal = ({
  open,
  onOpenChange,
  companyId,
}: AddContactPersonModalProps) => {
  const { mutateAsync: addContactPerson } = useAddContactPerson(onOpenChange);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      isMainContactPerson: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addContactPerson(
        { ...values, companyId },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } catch (error) {}
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Contactpersoon toevoegen</DialogTitle>
          <DialogDescription>
            Voeg een nieuw contactpersoon toe aan het systeem.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 lg:grid-cols-1"
          >
            <FormField
              control={form.control}
              name="isMainContactPerson"
              render={({ field }) => (
                <FormItem className="flex items-center justify-start">
                  <FormLabel className="mr-2 pt-2">
                    Hoofdcontactpersoon
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`initials`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2 pt-2">Voorletters *</FormLabel>
                  <FormControl>
                    <Input placeholder="Voorletters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`preferredName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2 pt-2">Roepnaam</FormLabel>
                  <FormControl>
                    <Input placeholder="Roepnaam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`infix`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2 pt-2">Tussenvoegsel</FormLabel>
                  <FormControl>
                    <Input placeholder="Tussenvoegsel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`lastName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2 pt-2">Achternaam *</FormLabel>
                  <FormControl>
                    <Input placeholder="Achternaam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Functie *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Vul functie in"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Vul email adres in"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Telefoonnummer</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Vul telefoonnummer in"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-10 flex flex-col items-center justify-end gap-4 lg:flex-row">
              <DialogClose asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="button"
                  variant="secondary"
                  size={"sm"}
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Sluiten
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                size="sm"
              >
                Toevoegen{" "}
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircle className="ml-2 h-5 w-5" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactPersonModal;

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
import { Input } from "@byte24/ui/components/input";
import { Switch } from "@byte24/ui/components/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactPersonSchema } from "@ui/src/utility/form-schemas";
import { Edit, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetContactPerson, useUpdateContactPerson } from "../hooks";

interface UpdateContactPersonModalProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  id: number;
}

const formSchema = contactPersonSchema;
type FormValues = z.infer<typeof formSchema>;

const UpdateContactPersonModal = ({
  open,
  onOpenChange,
  id,
}: UpdateContactPersonModalProps) => {
  const { data } = useGetContactPerson(id);
  const { mutateAsync: updateContactPerson } = useUpdateContactPerson(
    id,
    onOpenChange
  );
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (data) {
      const formData = {
        ...data,
        email: data.email ?? "",
        phone: data.phone ?? "",
      };
      form.reset(formData as z.infer<typeof formSchema>);
    }
  }, [form, data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateContactPerson(
        { ...values },
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
          <DialogTitle>Contactpersoon bewerken</DialogTitle>
          <DialogDescription>
            Wijzig de gegevens van de contactpersoon in het systeem.
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
                  <FormLabel className="mr-2 pt-2">Voorletters</FormLabel>
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

            {/* Phone */}
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
                Bewerken <Edit className="ml-2 h-5 w-5" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContactPersonModal;

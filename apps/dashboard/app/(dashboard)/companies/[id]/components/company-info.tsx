import { Checkbox, IOption } from "@byte24/ui";
import { Button } from "@byte24/ui/components/button";
import { Combobox } from "@byte24/ui/components/combobox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@byte24/ui/components/select";
import { Separator } from "@byte24/ui/components/separator";
import { WarningDialog } from "@byte24/ui/components/warning-dialog";

import { useListVatCodes } from "@dashboard/app/(dashboard)/hooks";
import { authClient } from "@dashboard/common/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationRole } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useApproveInsuranceCompany,
  useApproveSolvencyCompany,
  useDeleteCompany,
  useDisappproveInsuranceCompany,
  useDisapproveSolvencyCompany,
  useGetAllCountries,
  useUpdateCompany,
} from "../../hooks";
import { companySchemaUpdate } from "../../schemas";
import { FullCompany } from "../../types";

const { useSession } = authClient;

// Define the form schema with proper types
const formSchema = companySchemaUpdate.extend({
  typeId: z.number().nullable(),
  statusId: z.number().nullable(),
  vatCodeId: z.number().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface CompanyInfoProps {
  company: FullCompany;
}
function CompanyInfo({ company }: CompanyInfoProps) {
  const { data: currentUser } = useSession();
  // hooks
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: countries, isLoading: loadingCountries } = useGetAllCountries();
  const { mutateAsync: updateCompany } = useUpdateCompany(company?.id);
  const { mutateAsync: deleteCompany } = useDeleteCompany(company?.id);
  const { mutateAsync: approveSolvency } = useApproveSolvencyCompany(
    company?.id
  );
  const { mutateAsync: disapproveSolvency } = useDisapproveSolvencyCompany(
    company?.id
  );
  const { mutateAsync: approveInsurance } = useApproveInsuranceCompany(
    company?.id
  );
  const { mutateAsync: disapproveInsurance } = useDisappproveInsuranceCompany(
    company?.id
  );
  const { data: vatCodes } = useListVatCodes();

  // states
  const [selectsDisabled, setSelectsDisabled] = useState(false);
  const [solvencyCheckRequired, setSolvencyCheckRequired] = useState(false);
  const [insuranceCheckRequired, setInsuranceCheckRequired] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  // default form values
  const defaultValues = useMemo(() => {
    // display correct warnings if required
    // if (
    //   company?.typeId === COMPANY_TYPES.BUYER.id &&
    //   company?.statusId !== COMPANY_STATUSSES.DISAPPROVED.id &&
    //   (company?.solvencyApproved === false ||
    //     company?.insuranceApproved === false)
    // )
    //   displayRequiredWarnings();
    // else resetRequiredWarnings();

    return {
      typeId: company.typeId ?? null,
      statusId: company.currentStatus?.statusId ?? null,
      countryId: company.countryId ?? 1,
      name: company.name ?? "",
      email: company.email ?? "",
      phone: company.phone ?? "",
      website: company.website ?? "",
      street: company.street ?? "",
      houseNumber: company.houseNumber ?? "",
      zipCode: company.zipCode ?? "",
      city: company.city ?? "",
      vatNumber: company.vatNumber ?? "",
      cocNumber: company.cocNumber ?? "",
      iban: company.iban ?? "",
      paymentDays: company.paymentDays ?? 30, // Default payment term of 30 days
      invoiceEmail: company.invoiceEmail ?? "",
      invoiceStreet: company.invoiceStreet ?? "",
      invoiceHouseNumber: company.invoiceHouseNumber ?? "",
      invoiceZipCode: company.invoiceZipCode ?? "",
      invoiceCity: company.invoiceCity ?? "",
      invoiceCountryId: company.invoiceCountryId ?? 1, // Default to Netherlands
      contactPersons: undefined,
      environmentalCharge: company.environmentalCharge ?? false,
      vatCodeId: company.vatCodeId ?? null,
    };
  }, [company]);

  // form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    // reset form data
    form.reset(defaultValues);
  }, [company, form, defaultValues]);

  // submit form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        name: values.name,
        countryId: Number(values.countryId),
        statusId: Number(values.statusId),
        typeId: Number(values.typeId),
        email: values.email,
        phone: values.phone,
        website: values.website,
        remarks: values.remarks,
        street: values.street,
        houseNumber: values.houseNumber,
        zipCode: values.zipCode,
        city: values.city,
        vatNumber: values.vatNumber,
        cocNumber: values.cocNumber,
        iban: values.iban,
        paymentDays: values.paymentDays,
        invoiceEmail: values.invoiceEmail,
        invoiceStreet: values.invoiceStreet,
        invoiceHouseNumber: values.invoiceHouseNumber,
        invoiceZipCode: values.invoiceZipCode,
        invoiceCity: values.invoiceCity,
        invoiceCountryId: Number(values.invoiceCountryId),
        contactPersons: [],
        environmentalCharge: values.environmentalCharge,
        pricelistId: values.pricelistId,
        vatCodeId: values.vatCodeId,
      };

      // // if company is buyer, and the solvencyApproved/solvencyApproved is false, set status to SOLVENCY_CHECK or INSURANCE_REQUEST
      // if (data.typeId === COMPANY_TYPES.BUYER.id) {
      //   if (company?.solvencyApproved === false)
      //     data.statusId = COMPANY_STATUSSES.SOLVENCY_CHECK.id;
      //   else if (
      //     company?.solvencyApproved &&
      //     company?.insuranceApproved === false
      //   )
      //     data.statusId = COMPANY_STATUSSES.INSURANCE_REQUEST.id;
      // }
      // // make sure to set the status to inactive if we are changing company type from BUYER
      // else if (
      //   company?.typeId === COMPANY_TYPES.BUYER.id &&
      //   (data?.statusId === COMPANY_STATUSSES.ACTIVE.id ||
      //     data?.statusId === COMPANY_STATUSSES.SOLVENCY_CHECK.id ||
      //     data?.statusId === COMPANY_STATUSSES.INSURANCE_REQUEST.id ||
      //     company?.statusId === COMPANY_STATUSSES.SOLVENCY_CHECK.id ||
      //     company?.statusId === COMPANY_STATUSSES.INSURANCE_REQUEST.id)
      // ) {
      //   console.log(
      //     "company type changed from buyer to supplier | updated status to inactive"
      //   );
      //   data.statusId = COMPANY_STATUSSES.INACTIVE.id;
      //   form.setValue("statusId", COMPANY_STATUSSES.INACTIVE.id);
      // }

      await updateCompany(data, {
        onSuccess: () => {
          // if (data.typeId === COMPANY_TYPES.BUYER.id) {
          //   displayRequiredWarnings();
          // } else {
          //   resetRequiredWarnings();
          // }
        },
      });
    } catch (error) {}
  }

  function resetRequiredWarnings() {
    setSelectsDisabled(false);
    setSolvencyCheckRequired(false);
    setInsuranceCheckRequired(false);
  }

  return (
    <div className="space-y-8 rounded-lg p-2">
      {/* SOLVENCY_CHECK */}
      {/* {solvencyCheckRequired && (
        <div>
          <Alert variant="destructive" className="mb-4">
            <CircleAlert size={35} className="mr-5 text-red-600" />
            <AlertTitle className="ml-5 text-lg font-bold">
              Kredietverzekeringsaanvraag vereist
            </AlertTitle>
            <AlertDescription className="ml-5">
              U moet de kredietwaardigheid van het bedrijf controleren om dit
              bedrijf te activeren.
            </AlertDescription>
            <AlertDialogFooter>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="hover:bg-red-800"
                  onClick={() => handleSolvencyCheck(false)}
                >
                  Aanvraag tot levering/verkoop afwijzen
                </Button>
                <Button
                  variant="outline"
                  className="text-black"
                  onClick={() => handleSolvencyCheck(true)}
                >
                  Goedkeuren
                </Button>
              </div>
            </AlertDialogFooter>
          </Alert>
        </div>
      )} */}

      <div className="flex gap-x-10">
        <div className="w-full space-y-6">
          {/* form wrapper */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => await onSubmit(data))}
              className="w-full space-y-6"
            >
              {/* form wrapper items */}
              <div className="grid grid-cols-2 gap-4 p-2">
                <div className="col-span-2">
                  <p className="font-bold text-lg">Algemene Informatie</p>
                </div>
                {/* Company name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel required>Bedrijfsnaam</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bedrijfsnaam"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company phone number field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefoonnummer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Telefoonnummer"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company website field */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="col-span-2" />
                <div className="col-span-2">
                  <p className="font-bold text-lg">Bedrijfsadres</p>
                </div>
                {/* Company street address field */}
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Straat</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Straat"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company house number field */}
                <FormField
                  control={form.control}
                  name="houseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Huisnummer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Huisnummer"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company zip code field */}
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Zipcode"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company city field */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stad</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Stad"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Company country field */}
                <FormField
                  control={form.control}
                  name="countryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Land</FormLabel>
                      <Combobox
                        modal
                        width="w-full text-sm"
                        options={(countries as IOption[]) || []}
                        selectText="Selecteer land..."
                        searchText="Zoek land..."
                        emptyText="Geen land gevonden."
                        value={field.value?.toString()}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="col-span-2" />

                <div className="col-span-2">
                  <p className="font-bold text-lg">Overige gegevens</p>
                </div>
                {/* Company VAT number field */}
                <FormField
                  control={form.control}
                  name="vatNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BTW Nummer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="BTW Nummer"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Chamber of Commerce (KvK) number field */}
                <FormField
                  control={form.control}
                  name="cocNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KvK Nummer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="KvK Nummer"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company IBAN field */}
                <FormField
                  control={form.control}
                  name="iban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IBAN</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="IBAN"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company payment term field */}
                <FormField
                  control={form.control}
                  name="paymentDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Betaaltermijn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Betaaltermijn"
                          type="number"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(
                              e?.target?.value ? Number(e.target.value) : e
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vatCodeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BTW type</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e ? Number(e) : e);
                        }}
                        defaultValue={`${field.value}`}
                        value={`${field.value}`}
                        disabled={
                          currentUser?.user?.applicationRole ===
                          ApplicationRole.USER
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer BTW type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vatCodes?.map((vatCode, index) => (
                            <SelectItem value={`${vatCode.id}`} key={index}>
                              {vatCode?.meta?.percentage}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="environmentalCharge"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mt-4">Milieutoeslag</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="col-span-2" />
                <div className="col-span-2">
                  <p className="font-bold text-lg">Factuuradres</p>
                </div>
                {/* Company invoice email field */}
                <FormField
                  control={form.control}
                  name="invoiceEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Factuur email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company invoice street address field */}
                <FormField
                  control={form.control}
                  name="invoiceStreet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Straat</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Straat"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company invoice house number field */}
                <FormField
                  control={form.control}
                  name="invoiceHouseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Huisnummer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Huisnummer"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company invoice zip code field */}
                <FormField
                  control={form.control}
                  name="invoiceZipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Postcode"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company invoice city field */}
                <FormField
                  control={form.control}
                  name="invoiceCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stad</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Stad"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company invoice country field */}
                <FormField
                  control={form.control}
                  name="invoiceCountryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land</FormLabel>
                      <Combobox
                        modal
                        width="w-full text-sm"
                        options={(countries as IOption[]) || []}
                        selectText="Selecteer land..."
                        searchText="Zoek land..."
                        emptyText="Geen land gevonden."
                        value={field.value?.toString()}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* submit button wrapper */}
              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  size="sm"
                  className="flex items-center"
                >
                  {form.formState.isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Opslaan
                  <Edit className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <Separator className="!mt-20 mb-4" />

      {/* delete wrapper */}
      <div className="flex w-full items-start justify-between">
        <div>
          <div className="flex items-start gap-3">
            <TriangleAlert className="mt-1 h-5 w-5 text-destructive" />
            <div>
              <h2 className="font-semibold text-destructive text-lg">
                Bedrijf verwijderen
              </h2>
              {/* It is only possible to delete a company if this company does not contain any deals, quotes and projects yet. */}
              {/* Note: This will delete all notes, actions, people, documents, tags and any events associated with the company. */}
              <p className="text-muted-foreground text-sm">
                Het is alleen mogelijk om een bedrijf te verwijderen als dit
                bedrijf nog geen deals, offertes en projecten bevat.
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-bold">Let op:</span> Dit zal alle
                notities, acties, personen, documenten, tags en evenementen die
                bij het bedrijf horen verwijderen.
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={() => {
            setDeleteModal(true);
          }}
        >
          Verwijderen
        </Button>
      </div>

      {/* delete warning modal */}
      <WarningDialog
        title="Bedrijf verwijderen"
        description="Het is alleen mogelijk om een bedrijf te verwijderen als dit bedrijf nog geen deals, offertes en projecten bevat."
        open={deleteModal}
        onOpenChange={setDeleteModal}
        onDelete={() =>
          deleteCompany(
            {},
            {
              onSuccess: () => {
                setDeleteModal(false);
                router.push("/companies");
              },
            }
          )
        }
        isPending={false}
        actionText="Verwijder"
      />
    </div>
  );
}

export default CompanyInfo;

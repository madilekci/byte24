import { Separator } from "@byte24/ui";
import { Checkbox } from "@byte24/ui/components/checkbox";
import { Combobox } from "@byte24/ui/components/combobox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@byte24/ui/components/form";
import { Input } from "@byte24/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@byte24/ui/components/select";
import { IOption } from "@byte24/ui/interfaces";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useGetAllCountries } from "../../hooks";
import { CompanyFormValues } from "../../types";
import { useListVatCodes } from "@dashboard/app/(dashboard)/hooks";
import { authClient } from "@dashboard/common/auth-client";
import { ApplicationRole } from "@prisma/client";

const { useSession } = authClient;

const CompanyInfo = ({
  hiddenFields,
  testMode = false,
}: {
  hiddenFields?: { [key: string]: boolean };
  testMode?: boolean;
}) => {
  const { data: currentUser } = useSession();
  const { data: countries, isLoading: loadingCountries } = useGetAllCountries();
  const { data: vatCodes } = useListVatCodes();

  const {
    control,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useFormContext<CompanyFormValues>();

  const [isSameAddress, setIsSameAddress] = useState(true);

  const street = watch("street");
  const houseNumber = watch("houseNumber");
  const zipCode = watch("zipCode");
  const city = watch("city");
  const countryId = watch("countryId");
  const email = watch("email");

  useEffect(() => {
    if (testMode) {
      // Fill in required fields with test data
      setValue("name", "Test Company B.V.");
      setValue("typeId", 1); // Assuming 1 is a valid type ID
      setValue("statusId", 2); // Active status
      setValue("countryId", 1); // Assuming 1 is a valid country ID
      setValue("email", "test@example.com");
      setValue("phone", "+31612345678");
      setValue("website", "https://testcompany.com");
    }
  }, [testMode, setValue]);

  useEffect(() => {
    if (isSameAddress) {
      setValue("invoiceEmail", email || "");
      setValue("invoiceStreet", street || "");
      setValue("invoiceHouseNumber", houseNumber || "");
      setValue("invoiceZipCode", zipCode || "");
      setValue("invoiceCity", city || "");
      setValue("invoiceCountryId", countryId || 157);
    } else {
      setValue("invoiceEmail", "");
      setValue("invoiceStreet", "");
      setValue("invoiceHouseNumber", "");
      setValue("invoiceZipCode", "");
      setValue("invoiceCity", "");
      setValue("invoiceCountryId", 157);
    }
  }, [
    isSameAddress,
    email,
    street,
    houseNumber,
    zipCode,
    city,
    countryId,
    setValue,
  ]);

  return (
    <div>
      <h4 className="stepper_step_heading">Bedrijfgegevens</h4>
      <div className="stepper_step_container">
        <div className="grid grid-cols-2 gap-4 p-2">
          {/* Company name field */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
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
            control={control}
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
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Telefoonnummer</FormLabel>
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
            control={control}
            name="website"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>Website</FormLabel>
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

          {/* Credit Limit field */}

          <div className="col-span-2">
            <p className="font-bold text-lg">Adres</p>
          </div>
          {/* Company street address field */}
          <FormField
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
                      field.onChange(e ? Number(e.target.value) : e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
                    currentUser?.user?.applicationRole === ApplicationRole.USER
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
            control={control}
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
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="same-address"
                checked={isSameAddress}
                onCheckedChange={(checked) => setIsSameAddress(!!checked)}
              />
              <label
                htmlFor="same-address"
                className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Factuuradres is hetzelfde als het bedrijfsadres
              </label>
            </div>
          </div>

          {/* Invoice email field */}
          <FormField
            control={control}
            name="invoiceEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Factuur email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    disabled={isSameAddress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invoice street field */}
          <FormField
            control={control}
            name="invoiceStreet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Straat</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Straat"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    disabled={isSameAddress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invoice house number field */}
          <FormField
            control={control}
            name="invoiceHouseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Huisnummer</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Huisnummer"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    disabled={isSameAddress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invoice zip code field */}
          <FormField
            control={control}
            name="invoiceZipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zipcode</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Zipcode"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    disabled={isSameAddress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invoice city field */}
          <FormField
            control={control}
            name="invoiceCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stad</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Stad"
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    disabled={isSameAddress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invoice country field */}
          <FormField
            control={control}
            name="invoiceCountryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land</FormLabel>
                <div
                  className={
                    isSameAddress ? "pointer-events-none opacity-50" : ""
                  }
                >
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
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="col-span-2" />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;

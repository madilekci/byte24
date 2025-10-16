"use client";

import { Button } from "@byte24/ui/components/button";
import { StepperIndicator } from "@byte24/ui/components/stepper-indicator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useAddCompany } from "../../hooks";
import CompanyInfo from "./company-info";
import ContactPersonsInfo from "./contact-persons-info";

import {
  baseAddCompanySchema,
  contactPersonSchema,
} from "@ui/src/utility/form-schemas";

const formSchema = (step: number) => {
  const baseSchema = baseAddCompanySchema.extend({
    tags: z.array(z.object({ tagId: z.number() })).default([]),
  });

  if (step === 2) {
    return baseSchema.extend({
      contactPersons: z.array(contactPersonSchema).default([]),
    });
  }
  return baseSchema;
};

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <CompanyInfo testMode={true} />;
    case 2:
      return <ContactPersonsInfo />;
    default:
      return "Unknown step";
  }
}

const CompanyMultiStepForm = ({
  onOpenChange,
}: {
  onOpenChange: (state: boolean) => void;
}) => {
  const { mutate: addCompany, isPending } = useAddCompany(onOpenChange);

  const [activeStep, setActiveStep] = useState(1);
  const [erroredInputName, setErroredInputName] = useState("");

  const methods = useForm<z.infer<ReturnType<typeof formSchema>>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema(activeStep)),
    defaultValues: {
      // Required fields
      name: "",
      countryId: 157, // Default to Netherlands
      email: "",
      phone: "",
      website: "",

      // Optional fields
      remarks: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      city: "",
      vatNumber: "",
      cocNumber: "",
      iban: "",
      kvkNumber: 0,
      branchNumber: 0,
      paymentDays: 30, // Default payment term of 30 days
      invoiceEmail: "",
      invoiceStreet: "",
      invoiceHouseNumber: "",
      invoiceZipCode: "",
      invoiceCity: "",
      invoiceCountryId: 157, // Default to Netherlands
      contactPersons: [],
      tags: [],
      environmentalCharge: false,
    },
  });

  const {
    trigger,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data: z.infer<ReturnType<typeof formSchema>>) => {
    addCompany({
      name: data.name,
      countryId: Number(data.countryId),
      typeId: Number(data.typeId),
      statusId: Number(data.statusId),
      email: data.email,
      phone: data.phone,
      contactPersons: data.contactPersons || [],
      invoiceCountryId: Number(data.invoiceCountryId),
      website: data.website,
      street: data.street,
      houseNumber: data.houseNumber,
      zipCode: data.zipCode,
      city: data.city,
      vatNumber: data.vatNumber,
      cocNumber: data.cocNumber,
      iban: data.iban,
      paymentDays: Number(data.paymentDays),
      invoiceEmail: data.invoiceEmail,
      invoiceStreet: data.invoiceStreet,
      invoiceHouseNumber: data.invoiceHouseNumber,
      invoiceZipCode: data.invoiceZipCode,
      invoiceCity: data.invoiceCity,
      environmentalCharge: data.environmentalCharge,
      pricelistId: data.pricelistId,
      vatCodeId: data.vatCodeId,
    });
  };

  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName]);

  useEffect(() => {
    console.log("Errors", errors);
  }, [errors]);

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, {
      shouldFocus: true,
    });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="">
      <StepperIndicator activeStep={activeStep} stepLength={2} />

      <FormProvider {...methods}>
        <form
          noValidate
          className="flex max-h-full flex-col justify-between overflow-y-auto"
        >
          <div>{getStepContent(activeStep)}</div>
          <div className="mt-10 flex justify-center space-x-[20px]">
            <Button
              type="button"
              className="min-w-[140px]"
              variant="secondary"
              onClick={handleBack}
              disabled={activeStep === 1}
              size={"sm"}
            >
              <ChevronLeftIcon className="mr-2 h-4 w-4" /> Terug
            </Button>
            {activeStep === 2 ? (
              <Button
                className="min-w-[140px]"
                type="button"
                onClick={handleSubmit((data) => onSubmit(data))}
                disabled={isPending}
                size={"sm"}
              >
                <span>Toevoegen</span>
                <PlusCircleIcon className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                size={"sm"}
                type="button"
                className="min-w-[140px]"
                onClick={handleNext}
              >
                Volgende <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CompanyMultiStepForm;

import { validationMsg } from '@ui/src/utility/validation-messages';
import { z } from 'zod';

export const baseCompanySchema = z.object({
  name: z.string({ message: validationMsg.name.required }),
  countryId: z.number({
    message: validationMsg.country.required,
  }),
});

export const companySchemaUpdate = z.object({
  name: z.string().min(1, {
    message: validationMsg.companyName.required,
  }),
  typeId: z.number(),
  statusId: z.number(),
  phone: z.string(),
  email: z.string().email({
    message: validationMsg.email.invalid,
  }),
  website: z.string(),
  countryId: z.number(),
  // Optional fields
  remarks: z.string().optional(),
  street: z.string().optional(),
  houseNumber: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  vatNumber: z.string().optional(),
  cocNumber: z.string().optional(),
  iban: z.string().optional(),
  paymentDays: z.number().optional(),
  invoiceEmail: z.string().optional(),
  invoiceStreet: z.string().optional(),
  invoiceHouseNumber: z.string().optional(),
  invoiceZipCode: z.string().optional(),
  invoiceCity: z.string().optional(),
  invoiceCountryId: z.number().optional(),
  contactPersons: z
    .array(
      z.object({
        isMainContactPerson: z.boolean(),
        infix: z.string(),
        initials: z.string(),
        lastName: z.string(),
        preferredName: z.string(),
        phone: z.string(),
        title: z.string(),
        email: z.string(),
      })
    )
    .optional(),
  environmentalCharge: z.boolean().optional(),
  pricelistId: z.number().optional().nullable(),
});

export const baseCompanyNoteSchema = z.object({
  content: z.string({ message: 'Vergeet niet een inhoud toe te voegen' }),
});

export const baseCompanyPersonSchema = z.object({
  firstname: z.string({
    message: validationMsg.firstName.required,
  }),
  lastname: z.string({
    message: validationMsg.lastName.required,
  }),
  email: z.string({
    message: validationMsg.email.required,
  }),
  phoneNumber: z.string({
    message: validationMsg.phoneNumber.required,
  }),
  type: z.string({ message: 'Type is verplicht' }),
});

export const baseCompanyDocumentSchema = z.object({});
export const baseUpdateCompanyDocumentSchema = z.object({
  name: z.string({ message: validationMsg.name.required }),
});

export const baseCompanyContractSchema = z.object({
  expireDate: z.date({ message: validationMsg.expireDate.required }),
});

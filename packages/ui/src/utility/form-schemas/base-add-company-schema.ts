import { validationMsg } from '@repo/ui/utility/validation-messages';
import { z } from 'zod';

export const baseAddCompanySchema = z.object({
  name: z.string().min(1, {
    message: validationMsg.companyName.required,
  }),
  typeId: z.number({
    message: validationMsg.companyType.required,
  }),
  statusId: z.number({
    message: 'Status is verplicht',
  }),
  phone: z.string().min(1, {
    message: validationMsg.phoneNumber.required,
  }),
  email: z
    .string()
    .min(1, {
      message: validationMsg.email.required,
    })
    .email({
      message: validationMsg.email.invalid,
    }),
  website: z.string().min(1, {
    message: 'Website is verplicht',
  }),
  countryId: z.number({
    message: validationMsg.country.required,
  }),
  // Optional fields
  remarks: z.string().optional(),
  street: z.string().optional(),
  houseNumber: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  vatNumber: z.string().optional(),
  cocNumber: z.string().optional(),
  iban: z.string().optional(),
  kvkNumber: z.number().optional(),
  branchNumber: z.number().optional(),
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
  vatCodeId: z.number().optional().nullable(),
});

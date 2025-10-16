import { validationMsg } from '@repo/ui/utility/validation-messages';
import { z } from 'zod';

export const contactPersonSchema = z.object({
  initials: z.string().min(1, {
    message: validationMsg.initials.required,
  }),
  infix: z.string().optional().default(''),
  lastName: z.string().min(1, {
    message: validationMsg.lastName.required,
  }),
  preferredName: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  title: z.string({ message: validationMsg.function.required }).min(1, {
    message: validationMsg.function.required,
  }),
  email: z
    .string({ message: validationMsg.email.required })
    .optional()
    .default('')
    .or(z.string().email({ message: validationMsg.email.invalid })),
  isMainContactPerson: z.boolean().default(false),
});

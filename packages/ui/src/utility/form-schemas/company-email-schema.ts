import { validationMsg } from '@repo/ui/utility/validation-messages';
import { z } from 'zod';

export const companyEmailSchema = z.object({
  name: z.string().optional().default(''),
  email: z.string({ message: validationMsg.email.required }).email({
    message: validationMsg.email.invalid,
  }),
  isMainEmail: z.boolean().default(false),
});

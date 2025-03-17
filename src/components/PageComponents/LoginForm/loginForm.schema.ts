import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Merci de renseigner un email valide'),
  password: z.string(),
});

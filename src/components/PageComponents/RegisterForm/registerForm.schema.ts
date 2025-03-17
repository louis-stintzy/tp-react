import { z } from 'zod';

export const registerFormSchema = z.object({
  nickname: z
    .string()
    .min(3, 'Le pseudo doit contenir au moins 3 caractères')
    .max(50, 'Le pseudo doit contenir au plus 50 caractères'),
  email: z.string().email('Adresse email invalide'),
  password: z
    .string()
    .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
    .max(100, 'Le mot de passe doit contenir au plus 100 caractères')
    .regex(
      /[A-Z]/,
      'Le mot de passe doit contenir au moins une lettre majuscule'
    )
    .regex(
      /[a-z]/,
      'Le mot de passe doit contenir au moins une lettre minuscule'
    )
    .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(
      /[@$!%*?&]/,
      'Le mot de passe doit contenir au moins un caractère spécial'
    ),
});

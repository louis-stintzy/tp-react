import { z } from 'zod';

export const addMovieFormSchema = z.object({
  title: z.string().min(1, 'Le titre ne peut pas être vide'),
  description: z.string().min(1, 'La description ne peut pas être vide'),
  imageUrl: z.string().url('URL invalide'),
  releaseDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide (format: YYYY-MM-DD)'),
});

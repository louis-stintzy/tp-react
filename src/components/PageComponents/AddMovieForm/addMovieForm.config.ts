import { FormConfig } from '../../../@types/form';
import { MovieCredentials } from '../../../@types/movie';

export const addMovieFormConfig: FormConfig<MovieCredentials> = {
  title: 'Ajouter un film',
  fields: [
    {
      label: 'Titre',
      id: 'title',
      type: 'text',
    },
    {
      label: 'Description',
      id: 'description',
      type: 'textarea',
    },
    {
      label: 'Date de sortie',
      id: 'releaseDate',
      type: 'date',
    },
    {
      label: "URL de l'image",
      id: 'imageUrl',
      type: 'url',
    },
  ],
  submitButton: {
    loading: {
      type: 'image',
      content: 'loader',
    },
    default: {
      type: 'text',
      content: 'Ajouter',
    },
  },
};

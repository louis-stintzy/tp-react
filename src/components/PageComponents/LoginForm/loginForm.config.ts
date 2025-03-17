import { LoginCredentials } from '../../../@types/auth';
import { FormConfig } from '../../../@types/form';

import loader from '../../../assets/loader-circle.svg';

export const loginFormConfig: FormConfig<LoginCredentials> = {
  title: 'Connexion',
  fields: [
    {
      label: 'Email',
      id: 'email',
      type: 'email',
      autoComplete: 'email',
      //   required: true,
    },
    {
      label: 'Mot de passe',
      id: 'password',
      type: 'password',
      autoComplete: 'current-password',
      //   required: true,
    },
  ],
  submitButton: {
    loading: {
      type: 'image',
      content: loader,
    },
    default: {
      type: 'text',
      content: 'Se connecter',
    },
  },
};

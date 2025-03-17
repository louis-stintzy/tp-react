import { RegisterCredentials } from '../../../@types/auth';
import { FormConfig } from '../../../@types/form';
import loader from '../../../assets/loader-circle.svg';

export const registerFormConfig: FormConfig<RegisterCredentials> = {
  title: 'Inscription',
  fields: [
    {
      label: 'Pseudo',
      id: 'nickname',
      type: 'text',
      autoComplete: 'nickname',
      //   required: true,
    },
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
      autoComplete: 'new-password',
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
      content: "S'inscrire",
    },
  },
};

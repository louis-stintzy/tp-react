import { RegisterCredentials } from '../../../@types/auth';
import ReusableForm from '../../Common/ReusableForm/ReusableForm';
import { registerFormConfig } from './registerForm.config';
import { registerFormSchema } from './registerForm.schema';

import './RegisterForm.style.css';

function RegisterForm() {
  const isLoading = false;
  const register = (data: RegisterCredentials) => {
    console.log(data);
  };
  return (
    <ReusableForm<RegisterCredentials>
      isLoading={isLoading}
      formConfig={registerFormConfig}
      formSchema={registerFormSchema}
      action={register}
      //   footerMessage={message ?? undefined}
    />
  );
}

export default RegisterForm;

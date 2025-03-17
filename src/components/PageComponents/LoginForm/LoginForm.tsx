import { LoginCredentials } from '../../../@types/auth';
import ReusableForm from '../../Common/ReusableForm/ReusableForm';
import { loginFormConfig } from './loginForm.config';
import { loginFormSchema } from './loginForm.schema';

import './LoginForm.style.css';

function LoginForm() {
  // const { isLoading, login } = useAuth();
  const isLoading = false;
  const login = (data: LoginCredentials) => {
    console.log(data);
  };
  return (
    <ReusableForm<LoginCredentials>
      isLoading={isLoading}
      formConfig={loginFormConfig}
      formSchema={loginFormSchema}
      action={login}
      //   footerMessage={message ?? undefined}
    />
  );
}

export default LoginForm;
